import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { tokenStorage } from './utils/tokenStorage';

/**
 * Adds the Authorization header to the request configuration
 */
const addAuthHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = tokenStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// Create the API for movies with specific configuration
export const api: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL_API,
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
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth header to auth API requests
authApi.interceptors.request.use(addAuthHeader, (error) => {
  return Promise.reject(error);
});
