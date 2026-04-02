'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useHomeSearch() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();

      const params = new URLSearchParams();

      if (city.trim()) {
        params.append('city', city.trim());
      }

      if (specialization) {
        params.append('specialization', specialization);
      }

      const queryString = params.toString();
      const url = queryString ? `/instructors?${queryString}` : '/instructors';
      
      router.push(url);
    },
    [city, specialization, router]
  );

  return {
    city,
    setCity,
    specialization,
    setSpecialization,
    handleSearch,
  };
}
