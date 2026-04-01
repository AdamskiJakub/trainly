'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { DumbbellIcon } from '@/components/ui/dumbbell-icon';

export function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50" aria-label="Main navigation">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" aria-label="Trainly - strona główna">
            <DumbbellIcon className="w-10 h-10" />
            <span className="text-3xl font-bold bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Trainly
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white text-base px-6 py-6"
              asChild
            >
              <Link href="/login">Zaloguj się</Link>
            </Button>
            
            <Button 
              size="lg"
              className="bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-base px-8 py-6 font-semibold"
              asChild
            >
              <Link href="/register">Zarejestruj się</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
