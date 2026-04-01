'use client';

import { useTransition } from 'react';
import { useRouter, usePathname, type Locale } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LocaleSwitcher() {
  const t = useTranslations('Common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="lg"
          disabled={isPending}
          className="text-slate-300 hover:text-white hover:bg-slate-800 text-2xl px-3"
          aria-label={`${t('changeLanguage')}: ${locale === 'pl' ? t('polish') : t('english')}`}
        >
          {locale === 'pl' ? '🇵🇱' : '🇬🇧'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
        <DropdownMenuItem 
          onClick={() => onSelectChange('pl')}
          className="hover:bg-slate-800 cursor-pointer text-slate-300 text-base"
          role="menuitem"
        >
          <span className="mr-2" aria-hidden="true">🇵🇱</span> {t('polish')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onSelectChange('en')}
          className="hover:bg-slate-800 cursor-pointer text-slate-300 text-base"
          role="menuitem"
        >
          <span className="mr-2" aria-hidden="true">🇬🇧</span> {t('english')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
