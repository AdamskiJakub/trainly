import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { createRegisterClientSchema, type RegisterClientFormData } from '@/lib/validations/register-client-form';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import { normalizeApiError } from '@/lib/utils/error-handlers';

export function useRegisterClientForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterClientFormData>({
    resolver: zodResolver(createRegisterClientSchema(t)),
  });

  const onSubmit = async (data: RegisterClientFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...registerData } = data;
      
      const response = await apiClient.post('/auth/register', registerData);
      const { user, access_token } = response.data;
      
      setAuth(user, access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(normalizeApiError(err, t('registrationFailed')));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    error,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
