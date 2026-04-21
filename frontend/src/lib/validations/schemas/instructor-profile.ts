import { z } from 'zod';

// Helper to validate comma-separated languages
const commaSeparatedStrings = z.string().refine(
  (val) => {
    if (!val || val.trim() === '') return true;
    return val.split(',').every(s => s.trim().length > 0);
  },
  { message: 'Invalid format' }
);

export const instructorProfileSchema = z.object({
  bio: z.string().max(1000).optional(),
  tagline: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  hourlyRate: z.number().min(0).optional().nullable(),
  hourlyRateHidden: z.boolean().optional(),
  packageDealsEnabled: z.boolean().optional(),
  packageDealsDescription: z.string().max(500).optional(),
  photoUrl: z.string().nullable().optional(),
  gallery: z.array(z.string()).optional(),
  languages: commaSeparatedStrings.optional(),
  yearsExperience: z.number().min(0).max(100).optional().nullable(),
});

export type InstructorProfileFormData = z.infer<typeof instructorProfileSchema>;
