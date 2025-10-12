import axios from 'axios';

// Create an axios instance configured to hit our API. During development
// Vite's proxy (see vite.config.ts) will forward `/api` calls to the PHP
// backend. In production you may configure baseURL via environment variables.
const api = axios.create({
  baseURL: '/api',
});

// Automatically attach JWT token to all requests if present.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;