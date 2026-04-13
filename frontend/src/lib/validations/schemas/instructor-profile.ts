import { z } from 'zod';

export const instructorProfileSchema = z.object({
  bio: z.string().max(1000).optional(),
  tagline: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  location: z.string().max(500).optional(),
  hourlyRate: z.number().min(0).optional().nullable(),
  photoUrl: z.string().url().optional().or(z.literal('')),
  gallery: z.union([z.array(z.string().url()), z.string()]).optional(),
  languages: z.union([z.array(z.string()), z.string()]).optional(),
  yearsExperience: z.number().min(0).max(100).optional().nullable(),
  customTags: z.string().optional(), // Will be split into array
});

export type InstructorProfileFormData = z.infer<typeof instructorProfileSchema>;
