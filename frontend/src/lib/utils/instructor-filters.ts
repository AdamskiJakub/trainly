import type { InstructorListing } from '@/types';
import type { InstructorFilters } from '@/types/filters';


export function filterAndSortInstructors(
  instructors: InstructorListing[],
  filters: InstructorFilters
): InstructorListing[] {
  const result = [...instructors];

  switch (filters.sortBy) {
    case 'price-asc':
      return result.sort((a, b) => {
        const priceA = a.hourlyRate ?? Infinity;
        const priceB = b.hourlyRate ?? Infinity;
        return priceA - priceB;
      });

    case 'price-desc':
      return result.sort((a, b) => {
        const priceA = a.hourlyRate ?? -Infinity;
        const priceB = b.hourlyRate ?? -Infinity;
        return priceB - priceA;
      });

    case 'rating':
      return result.sort((a, b) => {
        const ratingA = a.averageRating ?? 0;
        const ratingB = b.averageRating ?? 0;
        if (ratingB !== ratingA) return ratingB - ratingA;
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      });

    case 'relevance':
    default:
      return result;
  }
}