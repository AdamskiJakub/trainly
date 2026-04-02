'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useHomeSearch } from '@/hooks/useHomeSearch';
import { SPECIALIZATION_CATEGORIES } from '@/lib/config/specializations';
import { getCategoryName } from '@/lib/utils/localization';

export function HeroSearchBar() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const { city, setCity, specialization, setSpecialization, handleSearch } =
    useHomeSearch();

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t('hero.citySearchPlaceholder')}
            aria-label={t('hero.citySearchLabel')}
            className="h-14 text-lg bg-slate-800/50 border-2 border-slate-700 text-white placeholder-slate-400 focus-visible:border-orange-500"
          />
        </div>

        <div className="flex-1">
          <Select value={specialization} onValueChange={setSpecialization}>
            <SelectTrigger
              className="h-14 text-lg bg-slate-800/50 border-2 border-slate-700 text-white focus-visible:border-orange-500 w-full px-4"
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

      <Button
        type="submit"
        size="lg"
        className="w-full bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-10 py-7 text-xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all"
      >
        {t('hero.primaryCta')}
      </Button>
    </form>
  );
}
