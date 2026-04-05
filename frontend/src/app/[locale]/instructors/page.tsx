'use client';

import { useMemo } from 'react';
import { InstructorSearchBar } from '@/components/instructors/instructor-search-bar';
import { InstructorsPageHeader } from '@/components/instructors/page-header';
import { FiltersSidebar } from '@/components/instructors/filters-sidebar';
import { ResultsSection } from '@/components/instructors/results-section';
import { useInstructorFilters } from '@/hooks/useInstructorFilters';
import { filterAndSortInstructors } from '@/lib/utils/instructor-filters';
import { MOCK_INSTRUCTORS } from '@/lib/mock-data/instructors';

export default function InstructorsPage() {
  const { filters, updateFilter, toggleSubcategory, clearFilters, hasActiveFilters } =
    useInstructorFilters();

  const filteredAndSortedInstructors = useMemo(
    () => filterAndSortInstructors(MOCK_INSTRUCTORS, filters),
    [filters]
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <InstructorsPageHeader />

        <div className="mb-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
          <InstructorSearchBar
            city={filters.city}
            specialization={filters.specialization}
            search={filters.search || ''}
            onCityChange={(city) => updateFilter('city', city)}
            onSpecializationChange={(spec) => updateFilter('specialization', spec)}
            onSearchChange={(search) => updateFilter('search', search)}
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <FiltersSidebar
            filters={filters}
            updateFilter={updateFilter}
            toggleSubcategory={toggleSubcategory}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters || false}
          />

          <ResultsSection
            instructors={filteredAndSortedInstructors}
            filters={filters}
            updateFilter={updateFilter}
          />
        </div>
      </div>
    </div>
  );
}
