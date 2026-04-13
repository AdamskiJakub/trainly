'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useRegisterClientForm } from '@/hooks/useRegisterClientForm';

export default function RegisterClientPage() {
  const t = useTranslations('auth');
  const { form, isLoading, error, onSubmit } = useRegisterClientForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold text-gradient-trainly mb-2 cursor-pointer hover:opacity-90 transition-opacity">
              Trainly
            </h1>
          </Link>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl space-y-6">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              {t('createAccount')} - {t('clientRole')}
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              {t('haveAccount')}{' '}
              <Link href="/login" className="font-medium text-orange-500 hover:text-orange-400 transition-colors">
                {t('loginLink')}
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={onSubmit}>
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-200">
                {t('firstName')} <span className="text-red-400">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                {...register('firstName')}
                placeholder={t('firstNamePlaceholder')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-slate-600 placeholder-slate-500 text-slate-100 bg-slate-900/50 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">{errors.firstName.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-200">
                {t('lastName')} <span className="text-red-400">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                {...register('lastName')}
                placeholder={t('lastNamePlaceholder')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-slate-600 placeholder-slate-500 text-slate-100 bg-slate-900/50 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">{errors.lastName.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder={t('emailPlaceholder')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-slate-600 placeholder-slate-500 text-slate-100 bg-slate-900/50 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-200">
                {t('phone')} <span className="text-gray-500 font-normal">({t('phoneHint')})</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="123456789"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-slate-600 placeholder-slate-500 text-slate-100 bg-slate-900/50 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                {t('password')}
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                placeholder={t('passwordHint')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-slate-600 placeholder-slate-500 text-slate-100 bg-slate-900/50 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200">
                {t('confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-slate-600 placeholder-slate-500 text-slate-100 bg-slate-900/50 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message as string}</p>
              )}
            </div>
          </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-trainly-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? t('creatingAccount') : t('createAccount')}
            </button>

            <div className="text-center">
              <Link 
                href="/register/instructor"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {t('areYouInstructor')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
