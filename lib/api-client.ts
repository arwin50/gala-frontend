import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient, initApiClient } from './api';

// Types
interface AuthTokens {
    access: string;
    refresh: string;
}

// Constants
const TOKEN_KEYS = {
    ACCESS: '@auth_access_token',
    REFRESH: '@auth_refresh_token',
} as const;

const PUBLIC_ENDPOINTS = [
    '/user/registration/',
    '/user/login/',
    '/user/token/refresh/',
    '/user/token/verify/',
    '/user/logout/',
] as const;

const REQUEST_TIMEOUT = 30000; // 30 seconds

// Optional: Navigation callback for logout
let onLogoutCallback: (() => void) | null = null;
export const setOnLogout = (cb: () => void) => { onLogoutCallback = cb; };

// Check if the URL matches a public endpoint that doesn't need authentication
const isPublicEndpoint = (url?: string): boolean => {
    if (!url) return false;
    return PUBLIC_ENDPOINTS.some((endpoint) => url.endsWith(endpoint));
};

// Token refresh state management
let isRefreshing = false;
let requestQueue: {
    resolve: (token: string) => void;
    reject: (err: Error) => void;
    originalRequest: Request;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    requestQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    requestQueue = [];
};

// Token management functions
export const getAccessToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEYS.ACCESS);
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

export const getRefreshToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEYS.REFRESH);
    } catch (error) {
        console.error('Error getting refresh token:', error);
        return null;
    }
};

export const saveTokens = async (tokens: AuthTokens): Promise<void> => {
    try {
        await AsyncStorage.multiSet([
            [TOKEN_KEYS.ACCESS, tokens.access],
            [TOKEN_KEYS.REFRESH, tokens.refresh],
        ]);
    } catch (error) {
        console.error('Error saving tokens:', error);
        throw new Error('Failed to save authentication tokens');
    }
};

export const clearTokens = async (): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([TOKEN_KEYS.ACCESS, TOKEN_KEYS.REFRESH]);
    } catch (error) {
        console.error('Error clearing tokens:', error);
        throw new Error('Failed to clear authentication tokens');
    }
};

// Handle logout
const handleLogout = async (): Promise<void> => {
    try {
        await apiClient.post('/user/logout/');
    } catch (error) {
        console.error('Failed to logout on server', error);
    }
    await clearTokens();
    if (onLogoutCallback) onLogoutCallback();
};

// Request interceptor
const requestInterceptor = async (request: Request): Promise<Request> => {
    if (isPublicEndpoint(request.url)) {
        return request;
    }
    const accessToken = await getAccessToken();
    if (accessToken) {
        const newHeaders = new Headers(request.headers);
        newHeaders.set('Authorization', `Bearer ${accessToken}`);
        return new Request(request, { headers: newHeaders });
    }
    return request;
};

// Response interceptor with token refresh
const responseInterceptor = async (response: Response, originalRequest?: Request): Promise<Response> => {
    if (response.status !== 401 || isPublicEndpoint(response.url)) {
        return response;
    }
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            requestQueue.push({
                resolve: async (token: string) => {
                    // Clone the original request and set the new token
                    const newHeaders = new Headers(originalRequest?.headers || response.headers);
                    newHeaders.set('Authorization', `Bearer ${token}`);
                    const retryRequest = new Request(originalRequest || response.url, { ...originalRequest, headers: newHeaders });
                    resolve(await fetch(retryRequest));
                },
                reject: (err: Error) => {
                    reject(err);
                },
                originalRequest: originalRequest || new Request(response.url),
            });
        });
    }
    isRefreshing = true;
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
        await handleLogout();
        isRefreshing = false;
        processQueue(new Error('Logout due to missing refresh token'), null);
        throw new Error('Authentication required');
    }
    try {
        const refreshResponse = await fetch(`${apiClient.baseURL}/user/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });
        if (!refreshResponse.ok) {
            throw new Error('Failed to refresh token');
        }
        const tokens: AuthTokens = await refreshResponse.json();
        await saveTokens(tokens);
        const newHeaders = new Headers((originalRequest || response).headers);
        newHeaders.set('Authorization', `Bearer ${tokens.access}`);
        const retryRequest = new Request(originalRequest || response.url, { ...originalRequest, headers: newHeaders });
        processQueue(null, tokens.access);
        return fetch(retryRequest);
    } catch (error: any) {
        const apiError = error instanceof Error ? error : new Error(String(error));
        processQueue(apiError, null);
        await handleLogout();
        throw apiError;
    } finally {
        isRefreshing = false;
    }
};

// Initialize API with auth
export const initApiWithAuth = (baseURL: string): void => {
    initApiClient({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
        requestInterceptor,
        // Wrap responseInterceptor to pass originalRequest if available
        responseInterceptor: async (response: Response) => {
            // @ts-ignore
            return responseInterceptor(response, response.request || undefined);
        },
        timeout: REQUEST_TIMEOUT,
    });
};

// Export auth-related utilities
export { isPublicEndpoint };

// Re-export api client for convenience
    export { apiClient };

