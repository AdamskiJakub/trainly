'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function RegisterPage() {
  const t = useTranslations('auth');

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t('registerAs')}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            {t('chooseRoleDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/register/client">
            <div className="group cursor-pointer rounded-lg border-2 border-slate-700 p-8 transition-all hover:border-orange-500 hover:shadow-xl bg-slate-800/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('clientRole')}
                </h3>
                <p className="text-slate-300 mb-6">
                  {t('clientRoleDesc')}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span className="text-slate-300">{t('clientFeature1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span className="text-slate-300">{t('clientFeature2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span className="text-slate-300">{t('clientFeature3')}</span>
                </li>
              </ul>

              <div className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-md font-medium transition-all group-hover:from-orange-600 group-hover:to-red-600 cursor-pointer text-center shadow-lg">
                {t('registerAsClient')}
              </div>
            </div>
          </Link>

          {/* INSTRUCTOR CARD */}
          <Link href="/register/instructor">
            <div className="group cursor-pointer rounded-lg border-2 border-slate-700 p-8 transition-all hover:border-purple-500 hover:shadow-xl bg-slate-800/50 backdrop-blur-sm relative overflow-hidden">
             
              <div className="text-center">
                <div className="text-5xl mb-4">💪</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('instructorRole')}
                </h3>
                <p className="text-slate-300 mb-6">
                  {t('instructorRoleDesc')}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-slate-300">{t('instructorFeature1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-slate-300">{t('instructorFeature2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-slate-300">{t('instructorFeature3')}</span>
                </li>
              </ul>

              <div className="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-md font-medium transition-all group-hover:from-purple-700 group-hover:to-indigo-700 cursor-pointer text-center shadow-lg">
                {t('registerAsInstructor')}
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-slate-400 mb-2">{t('notReadyToRegister')}</p>
          <Link 
            href="/instructors"
            className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
          >
            {t('browseAsGuest')} →
          </Link>
        </div>

        <div className="text-center">
          <Link 
            href="/login"
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            {t('alreadyHaveAccount')} <span className="font-medium">{t('loginLink')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
