// utils/apiClient.ts

// Define the configuration type for initApiClient
interface ApiClientConfig {
    baseURL: string;
    headers?: Record<string, string>;
    timeout?: number;
    requestInterceptor?: (request: Request) => Promise<Request>;
    responseInterceptor?: (response: Response) => Promise<Response>;
}

// Global configuration
let baseURL: string = '';
let defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
};
let requestInterceptor: ((request: Request) => Promise<Request>) | undefined;
let responseInterceptor: ((response: Response) => Promise<Response>) | undefined;
let timeout: number = 30000; // Default 30 seconds

// Function to initialize the API client
export const initApiClient = (config: ApiClientConfig): void => {
    baseURL = config.baseURL;
    defaultHeaders = {
        ...defaultHeaders,
        ...config.headers,
    };
    requestInterceptor = config.requestInterceptor;
    responseInterceptor = config.responseInterceptor;
    timeout = config.timeout || timeout;
};

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || 'An error occurred');
        (error as any).status = response.status;
        (error as any).data = errorData;
        throw error;
    }
    return response.json();
};

// Request timeout handler
const timeoutPromise = (ms: number): Promise<never> => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Request timeout after ${ms}ms`));
        }, ms);
    });
};

// Generic request function
const request = async <T = any>(
    method: string,
    url: string,
    dataOrParams?: any
): Promise<T> => {
    if (!baseURL) {
        throw new Error('API client not initialized. Call initApiClient(config) first.');
    }

    const fullUrl = `${baseURL}${url}`;
    const headers = { ...defaultHeaders };

    let body: string | undefined;
    let queryParams = '';

    if (method === 'GET' || method === 'DELETE') {
        if (dataOrParams) {
            queryParams = '?' + new URLSearchParams(dataOrParams).toString();
        }
    } else {
        body = JSON.stringify(dataOrParams);
    }

    try {
        let request = new Request(`${fullUrl}${queryParams}`, {
            method,
            headers,
            body,
            // credentials: 'include', // Not supported in React Native fetch
        });

        // Apply request interceptor if exists
        if (requestInterceptor) {
            request = await requestInterceptor(request);
        }

        // Create a promise that will be rejected after the timeout
        const timeoutController = new AbortController();
        const timeoutId = setTimeout(() => timeoutController.abort(), timeout);

        // Make the request with timeout
        const response = await Promise.race([
            fetch(request, { signal: timeoutController.signal }),
            timeoutPromise(timeout),
        ]);

        clearTimeout(timeoutId);

        // Apply response interceptor if exists
        const interceptedResponse = responseInterceptor
            ? await responseInterceptor(response as Response)
            : response;

        return handleResponse<T>(interceptedResponse as Response);
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeout}ms`);
        }
        console.error('API Error:', error);
        throw error;
    }
};

// Define the structure of the apiClient object
interface ApiClient {
    get: <T = any>(url: string, params?: Record<string, any>) => Promise<T>;
    post: <T = any>(url: string, data?: any) => Promise<T>;
    put: <T = any>(url: string, data?: any) => Promise<T>;
    delete: <T = any>(url: string, params?: Record<string, any>) => Promise<T>;
    postFile: <T = any>(url: string, formData: FormData) => Promise<T>;
    baseURL: string;
}

export const apiClient: ApiClient = {
    get: <T = any>(url: string, params: Record<string, any> = {}) =>
        request<T>('GET', url, params),
    post: <T = any>(url: string, data: any = {}) =>
        request<T>('POST', url, data),
    put: <T = any>(url: string, data: any = {}) =>
        request<T>('PUT', url, data),
    delete: <T = any>(url: string, params: Record<string, any> = {}) =>
        request<T>('DELETE', url, params),

    postFile: async <T = any>(url: string, formData: FormData): Promise<T> => {
        if (!baseURL) {
            throw new Error('API client not initialized. Call initApiClient(config) first.');
        }
        const fullUrl = `${baseURL}${url}`;
        // Do NOT set Content-Type for FormData; fetch will set it automatically with the correct boundary
        const headers = { ...defaultHeaders };
        delete headers['Content-Type'];
        try {
            let request = new Request(fullUrl, {
                method: 'POST',
                headers,
                body: formData,
                // credentials: 'include', // Not supported in React Native fetch
            });
            if (requestInterceptor) {
                request = await requestInterceptor(request);
            }
            const timeoutController = new AbortController();
            const timeoutId = setTimeout(() => timeoutController.abort(), timeout);
            const response = await Promise.race([
                fetch(request, { signal: timeoutController.signal }),
                timeoutPromise(timeout),
            ]);
            clearTimeout(timeoutId);
            const interceptedResponse = responseInterceptor
                ? await responseInterceptor(response as Response)
                : response;
            return handleResponse<T>(interceptedResponse as Response);
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error(`Request timeout after ${timeout}ms`);
            }
            console.error('File Upload Error:', error);
            throw error;
        }
    },

    get baseURL() {
        return baseURL;
    },
};
