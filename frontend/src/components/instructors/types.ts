import type { InstructorListing } from '@/types';
import type { InstructorFilters } from '@/types/filters';

export interface InstructorCardProps {
  instructor: InstructorListing;
}

export interface InstructorSearchBarProps {
  city: string;
  specialization: string;
  search: string;
  onCityChange: (city: string) => void;
  onSpecializationChange: (specialization: string) => void;
  onSearchChange: (search: string) => void;
}

export interface FiltersSidebarProps {
  filters: InstructorFilters;
  updateFilter: <K extends keyof InstructorFilters>(
    key: K,
    value: InstructorFilters[K]
  ) => void;
  toggleSubcategory: (subcategoryId: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export interface ResultsSectionProps {
  instructors: InstructorListing[];
  filters: InstructorFilters;
  updateFilter: <K extends keyof InstructorFilters>(
    key: K,
    value: InstructorFilters[K]
  ) => void;
}
