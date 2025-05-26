import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { User } from '../interfaces/user';
import { apiClient } from '../lib/api';

// STORAGE_KEYS for token management
const STORAGE_KEYS = {
    TOKENS: 'auth_tokens',
};

// Authentication tokens interface
export interface AuthTokens {
    access: string;
    refresh: string;
    access_expiration?: string;
    refresh_expiration?: string;
}

// Auth state interface for the store
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: Error | null;
    isAuthChecked: boolean;
    // Auth actions
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<{ access: string; refresh: string; user: User }>;
    logout: () => Promise<void>;
    verifyToken: (token?: string) => Promise<boolean>;
    refreshToken: () => Promise<boolean>;
    loadUserFromStorage: () => Promise<void>;
    getProfile: () => Promise<void>;
    setIsAuthChecked: (checked: boolean) => void;
}

// Registration data interface
export interface RegisterData {
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    last_name: string;
    is_host?: boolean;
    avatar_url?: string;
}

// Get access token from AsyncStorage
export const getAccessToken = async (): Promise<string | null> => {
    try {
        const tokens = await AsyncStorage.getItem(STORAGE_KEYS.TOKENS);
        if (tokens) {
            const parsedTokens = JSON.parse(tokens);
            return parsedTokens.access || null;
        }
        return null;
    } catch (e) {
        console.error('Failed to get access token', e);
        return null;
    }
};

// Get refresh token from AsyncStorage
export const getRefreshToken = async (): Promise<string | null> => {
    try {
        const tokens = await AsyncStorage.getItem(STORAGE_KEYS.TOKENS);
        if (tokens) {
            const parsedTokens = JSON.parse(tokens);
            return parsedTokens.refresh || null;
        }
        return null;
    } catch (e) {
        console.error('Failed to get refresh token', e);
        return null;
    }
};

// Save tokens to AsyncStorage
export const saveTokens = async (tokens: AuthTokens): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));
    } catch (e) {
        console.error('Failed to save tokens', e);
    }
};

// Clear tokens from AsyncStorage
export const clearTokens = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.TOKENS);
    } catch (e) {
        console.error('Failed to clear tokens', e);
    }
};

// Auth store using Zustand
export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isAuthChecked: false,

    setIsAuthChecked: (checked: boolean) => set({ isAuthChecked: checked }),

    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.post(
                '/user/login/',
                { email, password }
            );

            await saveTokens({
                access: response.access,
                refresh: response.refresh,
            });

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error instanceof Error ? error : new Error(String(error)),
                isLoading: false,
                isAuthenticated: false,
            });
            throw error;
        }
    },

    register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.post(
                '/user/registration/',
                data
            );
            console.log("Raw registration response:", response);

            if (!response || !response.access || !response.refresh) {
                throw new Error("Registration response missing tokens. Response: " + JSON.stringify(response));
            }

            await saveTokens({
                access: response.access,
                refresh: response.refresh,
            });

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });
            return response;
        } catch (error: any) {
            set({
                error: error instanceof Error ? error : new Error(String(error)),
                isLoading: false,
            });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        const refreshToken = await getRefreshToken();
        try {
            if (refreshToken) {
                await apiClient.post('/user/logout/', {
                    refresh: refreshToken,
                });
            }
        } catch (error) {
            console.error('Failed to logout on server', error);
        }

        // Always clear local state
        await clearTokens();
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    },

    verifyToken: async (token?: string) => {
        const tokenToVerify = token || await getAccessToken();
        if (!tokenToVerify) return false;

        try {
            await apiClient.post('/user/token/verify/', { token: tokenToVerify });
            return true;
        } catch (error) {
            console.error("AuthStore: Failed to verify token", error);
            return false;
        }
    },

    refreshToken: async () => {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) return false;

        try {
            const response = await apiClient.post(
                '/user/token/refresh/',
                { refresh: refreshToken }
            );

            await saveTokens({
                access: response.access,
                refresh: response.refresh,
            });

            return true;
        } catch (error) {
            console.error("AuthStore: Failed to refresh token", error);
            return false;
        }
    },

    getProfile: async () => {
        try {
            const response = await apiClient.get('/user/profile/');
            set({ user: response });
        } catch (error) {
            console.error("AuthStore: Failed to get profile", error);
            throw error;
        }
    },

    loadUserFromStorage: async () => {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            set({ isAuthChecked: true });
            return;
        }

        set({ isLoading: true });
        try {
            // First verify the token is valid
            const isValid = await get().verifyToken(accessToken);

            if (!isValid) {
                // Try to refresh the token if not valid
                const refreshed = await get().refreshToken();
                if (!refreshed) {
                    set({ isAuthenticated: false, isLoading: false, isAuthChecked: true });
                    return;
                }
            }

            // Get user profile
            await get().getProfile();
            set({ isAuthenticated: true, isLoading: false, isAuthChecked: true });
        } catch (error) {
            console.error("AuthStore: Failed to load user from storage", error);
            set({
                isAuthenticated: false,
                isLoading: false,
                isAuthChecked: true,
            });
        }
    },
}));

// Initialize auth store
export const initializeAuth = async (): Promise<void> => {
    await useAuthStore.getState().loadUserFromStorage();
};
