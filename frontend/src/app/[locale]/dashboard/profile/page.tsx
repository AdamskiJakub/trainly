'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useMyInstructorProfile } from '@/hooks/useMyInstructorProfile';
import { useAuthStore } from '@/stores/auth-store';
import { InstructorProfileForm } from '@/components/instructors/InstructorProfileForm';
import { useEffect } from 'react';

export default function ProfilePage() {
  const t = useTranslations('Dashboard');
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { data: profile, isLoading, error } = useMyInstructorProfile({
    enabled: isAuthenticated && user?.role === 'INSTRUCTOR',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'INSTRUCTOR') {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'INSTRUCTOR') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-300">{t('loadingProfile')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-400">{t('errorLoadingProfile')}: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center space-y-3 pb-8">
        <h1 className="text-4xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {t('editProfile')}
        </h1>
        <p className="text-slate-400 text-lg">
            {t('profileSubtitle')}
        </p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
        {profile && <InstructorProfileForm profile={profile} />}
      </div>
    </div>
  );
}
