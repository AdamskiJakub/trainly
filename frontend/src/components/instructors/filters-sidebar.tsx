'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCategoryById } from '@/lib/config/specializations';
import { getCategoryName, getSubcategoryName } from '@/lib/utils/localization';
import type { FiltersSidebarProps } from './types';

export function FiltersSidebar({
  filters,
  updateFilter,
  toggleSubcategory,
  clearFilters,
  hasActiveFilters,
}: FiltersSidebarProps) {
  const t = useTranslations('InstructorsPage');
  const locale = useLocale();

  const currentCategory = filters.specialization
    ? getCategoryById(filters.specialization)
    : null;

  return (
    <aside className="lg:col-span-1" role="region" aria-label={t('filters.ariaLabel')}>
      <div className="sticky top-24 space-y-4">
        <div className="flex items-center justify-between pt-0 md:pt-2">
          <h2 className="text-xl font-semibold text-white">{t('filters.title')}</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-orange-500 hover:text-orange-400 transition-colors font-medium"
              aria-label={t('filters.clearAll')}
            >
              {t('filters.clearAll')}
            </button>
          )}
        </div>

        <div className="space-y-6">
          {currentCategory && currentCategory.subcategories.length > 0 && (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-5">
              <h3 className="text-base font-semibold text-white mb-4">
                {getCategoryName(currentCategory, locale)}
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {currentCategory.subcategories.map((sub) => {
                  const isChecked =
                    filters.subcategories?.includes(sub.id) || false;
                  return (
                    <label
                      key={sub.id}
                      htmlFor={`subcategory-${sub.id}`}
                      className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors group"
                    >
                      <Checkbox
                        id={`subcategory-${sub.id}`}
                        checked={isChecked}
                        onCheckedChange={() => toggleSubcategory(sub.id)}
                        className="border-slate-600 data-checked:bg-orange-500 data-checked:border-orange-500"
                        aria-label={getSubcategoryName(sub, locale)}
                      />
                      <span
                        className={`text-base select-none transition-colors ${
                          isChecked
                            ? 'text-white font-medium'
                            : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {getSubcategoryName(sub, locale)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-5">
            <h3 className="text-base font-semibold text-white mb-4">
              {t('filters.experience')}
            </h3>
            <Select
              value={filters.experience || 'all'}
              onValueChange={(value) =>
                updateFilter('experience', value as any)
              }
            >
              <SelectTrigger
                className="w-full h-12 text-base bg-slate-800 border-slate-700 text-white focus-visible:border-orange-500 px-4"
                aria-label={t('filters.experience')}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={8}
                className="bg-slate-900 border-slate-700 w-(--radix-select-trigger-width)"
              >
                <SelectItem
                  value="all"
                  className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 py-3"
                >
                  {t('experience.all')}
                </SelectItem>
                <SelectItem
                  value="beginner"
                  className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 py-3"
                >
                  {t('experience.beginner')}
                </SelectItem>
                <SelectItem
                  value="intermediate"
                  className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 py-3"
                >
                  {t('experience.intermediate')}
                </SelectItem>
                <SelectItem
                  value="expert"
                  className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 py-3"
                >
                  {t('experience.expert')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-5">
            <h3 className="text-base font-semibold text-white mb-4">
              {t('filters.availability')}
            </h3>
            <Select
              value={filters.availability || 'all'}
              onValueChange={(value) =>
                updateFilter('availability', value as any)
              }
            >
              <SelectTrigger
                className="w-full h-12 text-base bg-slate-800 border-slate-700 text-white focus-visible:border-orange-500 px-4"
                aria-label={t('filters.availability')}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={8}
                className="bg-slate-900 border-slate-700 w-(--radix-select-trigger-width)"
              >
                <SelectItem
                  value="all"
                  className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 py-3"
                >
                  {t('availability.all')}
                </SelectItem>
                <SelectItem
                  value="online"
                  className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 py-3"
                >
                  {t('availability.online')}
                </SelectItem>
                <SelectItem
                  value="in-person"
                  className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 py-3"
                >
                  {t('availability.inPerson')}
                </SelectItem>
                <SelectItem
                  value="both"
                  className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 py-3"
                >
                  {t('availability.both')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-5">
            <h3 className="text-base font-semibold text-white mb-4">
              {t('filters.rating')}
            </h3>
            <div className="space-y-2" role="group" aria-label={t('filters.ratingAriaLabel')}>
              {[5, 4, 3, 2].map((rating) => (
                <button
                  key={rating}
                  onClick={() => updateFilter('minRating', rating)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-base transition-all flex items-center gap-2 ${
                    filters.minRating === rating
                      ? 'bg-orange-500 text-white font-medium'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  aria-pressed={filters.minRating === rating}
                  aria-label={t('filters.ratingOption', { rating })}
                >
                  <span className="flex items-center gap-1">
                    {'⭐'.repeat(rating)}
                  </span>
                  <span className="text-sm">{t('filters.andUp')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
