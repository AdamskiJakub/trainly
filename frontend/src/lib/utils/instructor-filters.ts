import type { InstructorListing } from '@/types';
import type { InstructorFilters } from '@/types/filters';
import { getTagById } from '@/lib/config/tags';

export function filterAndSortInstructors(
  instructors: InstructorListing[],
  filters: InstructorFilters
): InstructorListing[] {
  let result = [...instructors];

  if (filters.city) {
    result = result.filter((instructor) =>
      instructor.city?.toLowerCase().includes(filters.city.toLowerCase())
    );
  }

  if (filters.specialization) {
    result = result.filter(
      (instructor) => instructor.primarySpecialization === filters.specialization
    );
  }

  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    result = result.filter((instructor) => {
      const fullName = instructor.fullName.toLowerCase();
      const bio = instructor.bio?.toLowerCase() || '';
      
      const tagNames = (instructor.tags || [])
        .map(tagId => {
          const tag = getTagById(tagId);
          return tag ? `${tag.nameEn} ${tag.namePl}`.toLowerCase() : '';
        })
        .join(' ');
      
      return fullName.includes(searchLower) || 
             bio.includes(searchLower) || 
             tagNames.includes(searchLower);
    });
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((instructor) =>
      filters.tags!.some((tagId) =>
        instructor.tags?.includes(tagId)
      )
    );
  }

  if (filters.goals && filters.goals.length > 0) {
    result = result.filter((instructor) =>
      filters.goals!.some((goalId) =>
        instructor.goals?.includes(goalId)
      )
    );
  }

  if (filters.priceMin !== undefined) {
    result = result.filter(
      (instructor) =>
        instructor.hourlyRate !== null &&
        instructor.hourlyRate >= filters.priceMin!
    );
  }
  if (filters.priceMax !== undefined) {
    result = result.filter(
      (instructor) =>
        instructor.hourlyRate !== null &&
        instructor.hourlyRate <= filters.priceMax!
    );
  }

  if (filters.minRating !== undefined) {
    result = result.filter(
      (instructor) =>
        instructor.averageRating !== undefined &&
        instructor.averageRating >= filters.minRating!
    );
  }

  if (filters.experience && filters.experience !== 'all') {
    result = result.filter((instructor) => {
      const years = instructor.yearsExperience || 0;
      switch (filters.experience) {
        case 'beginner':
          return years <= 2;
        case 'intermediate':
          return years > 2 && years <= 5;
        case 'expert':
          return years > 5;
        default:
          return true;
      }
    });
  }

  if (filters.availability && filters.availability !== 'all') {
    result = result.filter(
      (instructor) => instructor.availability === filters.availability
    );
  }

  const sortBy = filters.sortBy || 'relevance';
  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => {
        if (a.hourlyRate === null && b.hourlyRate === null) return 0;
        if (a.hourlyRate === null) return 1;
        if (b.hourlyRate === null) return -1;
        return a.hourlyRate - b.hourlyRate;
      });
      break;
    case 'price-desc':
      result.sort((a, b) => {
        if (a.hourlyRate === null && b.hourlyRate === null) return 0;
        if (a.hourlyRate === null) return 1;
        if (b.hourlyRate === null) return -1;
        return b.hourlyRate - a.hourlyRate;
      });
      break;
    case 'rating':
      result.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      break;
    case 'relevance':
    default:
      break;
  }

  return result;
}
