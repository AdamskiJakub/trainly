'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export function usePublishInstructorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      const response = await apiClient.patch(`/instructor-profiles/${profileId}/publish`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-profile', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      toast.success('Profile published successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to publish profile';
      toast.error(message);
    },
  });
}
