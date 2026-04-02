'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { InstructorFilters } from '@/types/filters';

export function useInstructorFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize filters from URL params
  const [filters, setFilters] = useState<InstructorFilters>({
    city: searchParams.get('city') || '',
    specialization: searchParams.get('specialization') || '',
    subcategories: searchParams.getAll('subcategories') || undefined,
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
    experience: (searchParams.get('experience') as any) || 'all',
    availability: (searchParams.get('availability') as any) || 'all',
    gender: (searchParams.get('gender') as any) || 'all',
    sortBy: (searchParams.get('sortBy') as any) || 'relevance',
  });

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: InstructorFilters) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (key === 'subcategories' && Array.isArray(value) && value.length > 0) {
          // Handle array params
          value.forEach((item) => params.append('subcategories', item));
        } else if (value && value !== 'all' && value !== '') {
          params.append(key, String(value));
        }
      });

      const queryString = params.toString();
      const newURL = queryString ? `/instructors?${queryString}` : '/instructors';
      
      router.push(newURL, { scroll: false });
    },
    [router]
  );

  // Toggle subcategory (multi-select)
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
      updateURL(newFilters);
    },
    [filters, updateURL]
  );

  // Update individual filter
  const updateFilter = useCallback(
    <K extends keyof InstructorFilters>(key: K, value: InstructorFilters[K]) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      updateURL(newFilters);
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

  // Check if any filters are active
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
