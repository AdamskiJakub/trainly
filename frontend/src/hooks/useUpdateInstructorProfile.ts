'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export interface UpdateInstructorProfileData {
  bio?: string;
  tagline?: string;
  specializations?: string[];
  tags?: string[];
  goals?: string[];
  location?: string;
  city?: string;
  hourlyRate?: number;
  photoUrl?: string;
  gallery?: string[];
  yearsExperience?: number;
  availability?: string;
  languages?: string[];
}

export function useUpdateInstructorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profileId, data }: { profileId: string; data: UpdateInstructorProfileData }) => {
      const response = await apiClient.patch(`/instructor-profiles/${profileId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-profile', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    },
  });
}