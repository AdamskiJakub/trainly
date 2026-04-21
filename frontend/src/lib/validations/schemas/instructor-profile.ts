import { z } from 'zod';

// Helper to validate comma-separated languages
const commaSeparatedStrings = z.string().refine(
  (val) => {
    if (!val || val.trim() === '') return true;
    return val.split(',').every(s => s.trim().length > 0);
  },
  { message: 'Invalid format' }
);

// Helper to validate upload paths (relative /uploads/... or absolute URLs)
const uploadPathOrUrl = z.string().refine(
  (val) => {
    if (!val) return true;
    if (val.startsWith('/uploads/')) return true;
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  },
  { message: 'Must be a valid URL or upload path' }
);

export const instructorProfileSchema = z.object({
  bio: z.string().max(1000).optional(),
  tagline: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  hourlyRate: z.number().min(0).optional().nullable(),
  hourlyRateHidden: z.boolean().optional(),
  packageDealsEnabled: z.boolean().optional(),
  packageDealsDescription: z.string().max(500).optional(),
  photoUrl: uploadPathOrUrl.nullable().optional(),
  gallery: z.array(uploadPathOrUrl).optional(),
  languages: commaSeparatedStrings.optional(),
  yearsExperience: z.number().min(0).max(100).optional().nullable(),
});

export type InstructorProfileFormData = z.infer<typeof instructorProfileSchema>;
