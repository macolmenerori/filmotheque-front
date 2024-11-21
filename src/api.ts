import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL_API,
  withCredentials: true // Ensures cookies are included in requests
});

export const authApi: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL_AUTH,
  withCredentials: true // Ensures cookies are included in requests
});
