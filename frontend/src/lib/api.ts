import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : undefined);

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export const apiClient = axios.create({
  baseURL,
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle 401 errors (logout on invalid token)
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
