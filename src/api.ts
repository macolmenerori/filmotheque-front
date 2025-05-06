import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/**
 * getAuthToken - Retrieves the authentication token from localStorage
 *
 * @returns {string|null} The authentication token or null if not found
 */
const getAuthToken = (): string | null => {
  // Check localStorage for token
  const localStorageToken = localStorage.getItem('authToken');

  if (localStorageToken) {
    return localStorageToken;
  }

  // As a fallback, try common cookie names
  try {
    const cookies = document.cookie.split(';');
    const possibleNames = [
      'jwt',
      'token',
      'auth',
      'authorization',
      'accessToken',
      'access_token',
      'authToken',
      'auth_token'
    ];

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (possibleNames.includes(name.toLowerCase())) {
        return value;
      }
    }
  } catch (e) {
    // Silently fail and return null
  }

  return null;
};

/**
 * Adds the Authorization header to the request configuration
 */
const addAuthHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getAuthToken();

  if (token) {
    // Set the Authorization header directly
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// Create the API for movies with specific configuration
export const api: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL_API,
  withCredentials: true, // Still include cookies in case they're used
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth header to every request
api.interceptors.request.use(addAuthHeader, (error) => {
  return Promise.reject(error);
});

// Add basic error handling for the movies API
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API instance
export const authApi: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL_AUTH,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor to extract and save token from auth API responses
authApi.interceptors.response.use(
  (response) => {
    try {
      // Try response.data.data.token format
      if (response.data?.data?.token) {
        const token = response.data.data.token;
        localStorage.setItem('authToken', token);
      }
      // Try response.data.token format
      else if (response.data?.token) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
      }
      // Check headers for token
      else if (response.headers.authorization || response.headers.Authorization) {
        const authHeader = response.headers.authorization || response.headers.Authorization;
        if (typeof authHeader === 'string') {
          const token = authHeader.replace('Bearer ', '');
          localStorage.setItem('authToken', token);
        }
      }
    } catch (e) {
      // Silently fail
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
