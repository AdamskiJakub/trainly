'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useLoginForm } from '@/hooks/useLoginForm';
import { DumbbellIcon } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('auth');
  const { form, isLoading, error, onSubmit } = useLoginForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <DumbbellIcon className="w-10 h-10 text-orange-500" />
            <h1 className="text-5xl font-bold bg-linear-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent cursor-pointer hover:opacity-90 transition-opacity">
              Trainly
            </h1>
          </Link>
          <p className="text-xl text-slate-200 font-medium mt-2">
            {t('loginSubtitle')}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                {t('email')}
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                {t('password')}
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
              {isLoading ? t('loggingIn') : t('login')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-300 text-base">
              {t('noAccount')}{' '}
              <Link
                href="/register"
                className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
              >
                {t('signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
