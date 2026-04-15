'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export interface UpdateInstructorProfileData {
  bio?: string | null;
  tagline?: string | null;
  specializations?: string[];
  tags?: string[];
  goals?: string[];
  location?: string | null;
  city?: string | null;
  hourlyRate?: number | null;
  packageDealsEnabled?: boolean | null;
  packageDealsDescription?: string | null;
  photoUrl?: string | null;
  gallery?: string[];
  yearsExperience?: number | null;
  availability?: string | null;
  languages?: string[];
  isDraft?: boolean;
}

interface UseUpdateInstructorProfileOptions {
  showToast?: boolean; // Allow callers to disable toast notifications
}

export function useUpdateInstructorProfile(options: UseUpdateInstructorProfileOptions = { showToast: false }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profileId, data }: { profileId: string; data: UpdateInstructorProfileData }) => {
      const response = await apiClient.patch(`/instructor-profiles/${profileId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-profile', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      if (options.showToast) {
        toast.success('Profile updated successfully!');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update profile';
      if (options.showToast) {
        toast.error(message);
      }
    },
  });
}