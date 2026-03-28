'use client';

import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function DashboardPage() {
  const t = useTranslations('auth');
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Translate role
  const roleLabel = user.role === 'CLIENT' 
    ? t('clientRole') 
    : user.role === 'INSTRUCTOR' 
    ? t('instructorRole')
    : user.role;

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient-trainly mb-2">
                Welcome back{user.firstName ? `, ${user.firstName}` : ''}!
              </h1>
              <p className="text-slate-400">
                {user.email} • {roleLabel}
              </p>
            </div>
            <button
              onClick={() => logout()}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              Your Profile
            </h2>
            <div className="space-y-2 text-slate-300">
              <p>
                <span className="text-slate-500">ID:</span> {user.id}
              </p>
              {user.firstName && (
                <p>
                  <span className="text-slate-500">Name:</span> {user.firstName}{' '}
                  {user.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              Coming Soon
            </h2>
            <p className="text-slate-400">
              FAZA 4: Instructor Profiles<br />
              FAZA 5: Booking System<br />
              FAZA 6: Reviews & Ratings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
