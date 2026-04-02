'use client';

import { useTranslations } from 'next-intl';

export function InstructorsPageHeader() {
  const t = useTranslations('InstructorsPage');

  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 blur-3xl -z-10" />
      
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="bg-linear-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl">
          {t('subtitle')}
        </p>
      </div>
    </div>
  );
}
