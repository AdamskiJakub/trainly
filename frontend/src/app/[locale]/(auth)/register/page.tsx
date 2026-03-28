'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function RegisterPage() {
  const t = useTranslations('auth');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('registerAs')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('chooseRoleDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* CLIENT CARD */}
          <Link href="/register/client">
            <div className="group cursor-pointer rounded-lg border-2 border-gray-200 p-8 transition-all hover:border-orange-500 hover:shadow-xl bg-linear-to-br from-orange-50 to-white">
              <div className="text-center">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('clientRole')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('clientRoleDesc')}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span className="text-gray-700">{t('clientFeature1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span className="text-gray-700">{t('clientFeature2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span className="text-gray-700">{t('clientFeature3')}</span>
                </li>
              </ul>

              <button className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-md font-medium transition-all group-hover:from-orange-600 group-hover:to-red-600 cursor-pointer">
                {t('registerAsClient')}
              </button>
            </div>
          </Link>

          {/* INSTRUCTOR CARD */}
          <Link href="/register/instructor">
            <div className="group cursor-pointer rounded-lg border-2 border-gray-200 p-8 transition-all hover:border-purple-500 hover:shadow-xl bg-linear-to-br from-purple-50 to-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                PREMIUM
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">💪</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('instructorRole')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('instructorRoleDesc')}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-gray-700">{t('instructorFeature1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-gray-700">{t('instructorFeature2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-gray-700">{t('instructorFeature3')}</span>
                </li>
              </ul>

              <button className="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-md font-medium transition-all group-hover:from-purple-700 group-hover:to-indigo-700 cursor-pointer">
                {t('registerAsInstructor')}
              </button>
            </div>
          </Link>
        </div>

        {/* Guest browsing option */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">{t('notReadyToRegister')}</p>
          <Link 
            href="/instructors"
            className="text-orange-600 hover:text-orange-500 font-medium"
          >
            {t('browseAsGuest')} →
          </Link>
        </div>

        {/* Already have account */}
        <div className="text-center">
          <Link 
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {t('alreadyHaveAccount')} <span className="font-medium">{t('loginLink')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
