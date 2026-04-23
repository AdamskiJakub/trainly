import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from '@/i18n/routing';

export function useDeleteAccount() {
  const { logout } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete('/users/me');
      return response.data;
    },
    onSuccess: () => {
      // Logout and redirect to home
      logout();
      router.push('/');
    },
  });
}
