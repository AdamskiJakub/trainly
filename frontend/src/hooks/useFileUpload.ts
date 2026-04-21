'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export function useUploadProfilePhoto() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      // Let browser set Content-Type with boundary automatically
      const response = await apiClient.post('/upload/profile-photo', formData);
      
      return response.data.url as string;
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to upload photo';
      toast.error(message);
    },
  });
}

export function useUploadGalleryPhotos() {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      
      // Let browser set Content-Type with boundary automatically
      const response = await apiClient.post('/upload/gallery', formData);
      
      return response.data.urls as string[];
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to upload photos';
      toast.error(message);
    },
  });
}
