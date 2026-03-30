import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pl', 'en'],

  // Used when no locale matches
  defaultLocale: 'pl',
  
  // Always show locale prefix in URL
  localePrefix: 'always',
  
  // Localized pathnames (folder names stay in English!)
  pathnames: {
    '/': {
      pl: '/',
      en: '/',
    },
    '/login': {
      pl: '/logowanie',
      en: '/login',
    },
    '/register': {
      pl: '/rejestracja',
      en: '/register',
    },
    '/register/client': {
      pl: '/rejestracja/klient',
      en: '/register/client',
    },
    '/register/instructor': {
      pl: '/rejestracja/instruktor',
      en: '/register/instructor',
    },
    '/dashboard': {
      pl: '/panel',
      en: '/dashboard',
    },
    '/instructors': {
      pl: '/instruktorzy',
      en: '/instructors',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
