'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/utils/api-url';

// ============= TYPES =============
export interface Tag {
    id: string;
    nameEn: string;
    namePl: string;
    categories: string[];
}

export interface Specialization {
    id: string;
    nameEn: string;
    namePl: string;
    icon: string;
    order: number;
}

export interface Goal {
    id: string;
    icon: string;
    nameEn: string;
    namePl: string;
}

// ============= CACHE =============
let tagsCache: Tag[] | null = null;
let specializationsCache: Specialization[] | null = null;
let goalsCache: Goal[] | null = null;

export function useTags() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (tagsCache) {
            setTags(tagsCache);
            setLoading(false);
            return;
        }

        fetch(`${API_BASE_URL}/config/tags`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch tags');
                }
                return res.json();
            })
            .then((data: Tag[]) => {
                tagsCache = data; // Cache the tags
                setTags(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { tags, loading, error };
}

export function useSpecializations() {
    const [specializations, setSpecializations] = useState<Specialization[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (specializationsCache) {
            setSpecializations(specializationsCache);
            setLoading(false);
            return;
        }

        fetch(`${API_BASE_URL}/config/specializations`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch specializations');
                }
                return res.json();
            })
            .then((data: Specialization[]) => {
                specializationsCache = data; // Cache the specializations
                setSpecializations(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { specializations, loading, error };
}

export function useGoals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (goalsCache) {
            setGoals(goalsCache);
            setLoading(false);
            return;
        }

        fetch(`${API_BASE_URL}/config/goals`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch goals');
                }
                return res.json();
            })
            .then((data: Goal[]) => {
                goalsCache = data; // Cache the goals
                setGoals(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { goals, loading, error };
}

// ============= HELPER FUNCTIONS =============

// Tag helpers
export function getTagName(tag: Tag, locale: string) {
    return locale === 'pl' ? tag.namePl : tag.nameEn;
}

export function getTagById(id: string): Tag | undefined {
    return tagsCache?.find(tag => tag.id === id);
}

export function getTagNameById(id: string, locale: string): string {
    const tag = getTagById(id);
    return tag ? getTagName(tag, locale) : id;
}

// Specialization helpers
export function getSpecializationName(spec: Specialization, locale: string) {
    return locale === 'pl' ? spec.namePl : spec.nameEn;
}

export function getSpecializationById(id: string): Specialization | undefined {
    return specializationsCache?.find(spec => spec.id === id);
}

export function getSpecializationNameById(id: string, locale: string): string {
    const spec = getSpecializationById(id);
    return spec ? getSpecializationName(spec, locale) : id;
}

// Alias for backward compatibility
export const getCategoryById = getSpecializationById;

// Goal helpers
export function getGoalName(goal: Goal, locale: string) {
    return locale === 'pl' ? goal.namePl : goal.nameEn;
}

export function getGoalById(id: string): Goal | undefined {
    return goalsCache?.find(goal => goal.id === id);
}

export function getGoalNameById(id: string, locale: string): string {
    const goal = getGoalById(id);
    return goal ? getGoalName(goal, locale) : id;
}

// Get all data (for components that need full list without hooks)
export function getAllTags(): Tag[] {
    return tagsCache || [];
}

export function getAllSpecializations(): Specialization[] {
    return specializationsCache || [];
}

export function getAllGoals(): Goal[] {
    return goalsCache || [];
}