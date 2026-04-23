'use client';

import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { InstructorDashboard } from '@/components/dashboard/InstructorDashboard';
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Role-based Dashboard */}
        {user.role === 'INSTRUCTOR' ? (
          <InstructorDashboard />
        ) : (
          <ClientDashboard />
        )}
      </div>
    </div>
  );
}
