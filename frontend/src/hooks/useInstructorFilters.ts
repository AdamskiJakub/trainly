'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import type { InstructorFilters } from '@/types/filters';

export function useInstructorFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const previousSpecialization = useRef<string>('');

  // Initialize filters from URL params
  const [filters, setFilters] = useState<InstructorFilters>({
    city: searchParams.get('city') || '',
    specialization: searchParams.get('specialization') || '',
    search: searchParams.get('search') || '',
    subcategories: searchParams.getAll('subcategories') || undefined,
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
    experience: (searchParams.get('experience') as any) || 'all',
    availability: (searchParams.get('availability') as any) || 'all',
    gender: (searchParams.get('gender') as any) || 'all',
    sortBy: (searchParams.get('sortBy') as any) || 'relevance',
  });

  const updateURL = useCallback(
    (newFilters: InstructorFilters, scroll = false) => {
      const query: Record<string, string | string[]> = {};

      Object.entries(newFilters).forEach(([key, value]) => {
        if (key === 'subcategories' && Array.isArray(value) && value.length > 0) {
          query[key] = value;
        } else if (
          value !== undefined &&
          value !== null &&
          value !== 'all' &&
          value !== ''
        ) {
          query[key] = String(value);
        }
      });

      router.push({ pathname: '/instructors', query }, { scroll });
    },
    [router]
  );

  useEffect(() => {
    const currentSpecialization = filters.specialization;

    if (previousSpecialization.current && currentSpecialization !== previousSpecialization.current) {
      const clearedFilters = { ...filters, subcategories: undefined };
      setFilters(clearedFilters);
      updateURL(clearedFilters, false);
    }
    
    previousSpecialization.current = currentSpecialization;
  }, [filters.specialization, filters, updateURL]);

  const toggleSubcategory = useCallback(
    (subcategoryId: string) => {
      const current = filters.subcategories || [];
      const newSubcategories = current.includes(subcategoryId)
        ? current.filter((id) => id !== subcategoryId)
        : [...current, subcategoryId];
      
      const newFilters = { 
        ...filters, 
        subcategories: newSubcategories.length > 0 ? newSubcategories : undefined 
      };
      setFilters(newFilters);
      updateURL(newFilters, false);
    },
    [filters, updateURL]
  );

  const updateFilter = useCallback(
    <K extends keyof InstructorFilters>(key: K, value: InstructorFilters[K]) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      updateURL(newFilters, false);
    },
    [filters, updateURL]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    const clearedFilters: InstructorFilters = {
      city: '',
      specialization: '',
      experience: 'all',
      availability: 'all',
      gender: 'all',
      sortBy: 'relevance',
    };
    setFilters(clearedFilters);
    router.push('/instructors');
  }, [router]);

  const hasActiveFilters = 
    filters.city !== '' ||
    filters.specialization !== '' ||
    (filters.subcategories && filters.subcategories.length > 0) ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.minRating !== undefined ||
    (filters.experience && filters.experience !== 'all') ||
    (filters.availability && filters.availability !== 'all') ||
    (filters.gender && filters.gender !== 'all');

  return {
    filters,
    updateFilter,
    toggleSubcategory,
    clearFilters,
    hasActiveFilters,
  };
}
