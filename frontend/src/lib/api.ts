import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import { API_BASE_URL } from './utils/api-url';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send cookies with requests
});

// Request interceptor to set Content-Type only for non-FormData requests
apiClient.interceptors.request.use((config) => {
  if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Handle 401 errors (logout when the authenticated session is no longer valid)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();

      if (typeof window !== 'undefined') {
        setTimeout(() => {
          if (!useAuthStore.getState().isAuthenticated) {
            const segments = window.location.pathname.split('/').filter(Boolean);
            const locale = segments[0] || 'pl';
            window.location.href = `/${locale}/login`;
          }
        }, 100);
      }
    }
    return Promise.reject(error);
  }
);
