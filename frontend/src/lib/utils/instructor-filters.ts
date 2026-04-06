import type { InstructorListing } from '@/types';
import type { InstructorFilters } from '@/types/filters';
import { findSubcategoryById } from '@/lib/config/specializations';

export function filterAndSortInstructors(
  instructors: InstructorListing[],
  filters: InstructorFilters
): InstructorListing[] {
  let result = [...instructors];

  // Filter by city
  if (filters.city) {
    result = result.filter((instructor) =>
      instructor.city?.toLowerCase().includes(filters.city.toLowerCase())
    );
  }

  // Filter by specialization (category)
  if (filters.specialization) {
    result = result.filter(
      (instructor) => instructor.primarySpecialization === filters.specialization
    );
  }

  // Filter by keyword search (name, bio, future: company)
  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    result = result.filter((instructor) => {
      const fullName = instructor.fullName.toLowerCase();
      const bio = instructor.bio?.toLowerCase() || '';
      
      const subcategoryNames = instructor.subcategories
        .map(subId => {
          const sub = findSubcategoryById(subId);
          return sub ? `${sub.nameEn} ${sub.namePl}`.toLowerCase() : '';
        })
        .join(' ');
      
      return fullName.includes(searchLower) || 
             bio.includes(searchLower) || 
             subcategoryNames.includes(searchLower);
    });
  }

  // Filter by subcategories (multi-select)
  if (filters.subcategories && filters.subcategories.length > 0) {
    result = result.filter((instructor) =>
      filters.subcategories!.some((subId) =>
        instructor.subcategories.includes(subId)
      )
    );
  }

  // Filter by price range
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

  // Filter by minimum rating
  if (filters.minRating !== undefined) {
    result = result.filter(
      (instructor) =>
        instructor.averageRating !== undefined &&
        instructor.averageRating >= filters.minRating!
    );
  }

  // Filter by experience
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

  // Filter by availability
  if (filters.availability && filters.availability !== 'all') {
    result = result.filter(
      (instructor) => instructor.availability === filters.availability
    );
  }

  // Sort
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
