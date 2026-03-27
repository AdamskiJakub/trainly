import axios from 'axios';
import { routing } from '@/i18n/routing';

// Validate API URL at module init
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local file.'
  );
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding JWT token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Extract current locale from pathname and validate against routing.locales
        const currentLocale = window.location.pathname.split('/')[1];
        const locale = routing.locales.includes(currentLocale as any) 
          ? currentLocale 
          : routing.defaultLocale;
        window.location.href = `/${locale}/login`;
      }
    }
    return Promise.reject(error);
  }
);
