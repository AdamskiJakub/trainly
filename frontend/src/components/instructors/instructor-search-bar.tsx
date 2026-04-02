'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SPECIALIZATION_CATEGORIES } from '@/lib/config/specializations';
import { getCategoryName } from '@/lib/utils/localization';

interface InstructorSearchBarProps {
  city: string;
  specialization: string;
  onCityChange: (city: string) => void;
  onSpecializationChange: (specialization: string) => void;
}

export function InstructorSearchBar({
  city,
  specialization,
  onCityChange,
  onSpecializationChange,
}: InstructorSearchBarProps) {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          type="text"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          placeholder={t('hero.citySearchPlaceholder')}
          aria-label={t('hero.citySearchLabel')}
          className="h-12 text-base bg-slate-800/50 border-2 border-slate-700 text-white placeholder-slate-400 focus-visible:border-orange-500"
        />
      </div>

      <div className="flex-1">
        <Select value={specialization} onValueChange={onSpecializationChange}>
          <SelectTrigger
            className="h-12 text-base bg-slate-800/50 border-2 border-slate-700 text-white focus-visible:border-orange-500 w-full px-4"
            aria-label={t('hero.specializationLabel')}
          >
            <SelectValue placeholder={t('hero.specializationPlaceholder')} />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="bg-slate-900 border-slate-700 w-(--radix-select-trigger-width)"
            sideOffset={8}
          >
            {SPECIALIZATION_CATEGORIES.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="text-base text-white hover:bg-slate-800 focus:bg-slate-800 cursor-pointer py-3"
              >
                {category.icon} {getCategoryName(category, locale)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
