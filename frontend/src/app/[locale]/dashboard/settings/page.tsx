'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/stores/auth-store';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { useUpdatePassword } from '@/hooks/useUpdatePassword';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { User, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { toast } from 'sonner';
import { z } from 'zod';
import { createStrongPasswordSchema } from '@/lib/validations/schemas/auth-base';

export default function SettingsPage() {
  const t = useTranslations('Dashboard.settings');
  const tAuth = useTranslations('auth');
  const { user } = useAuthStore();
  const router = useRouter();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const updateUserMutation = useUpdateUser();
  const updatePasswordMutation = useUpdatePassword();
  const deleteAccountMutation = useDeleteAccount();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateUserMutation.mutateAsync({
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
      });
      
      toast.success(t('successUpdate'));
    } catch (error: any) {
      toast.error(t('errorUpdate'), {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setPasswordErrors({ newPassword: '', confirmPassword: '' });

    const passwordSchema = createStrongPasswordSchema(tAuth);
    
    try {
      passwordSchema.parse(passwordForm.newPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues[0].message;
        setPasswordErrors(prev => ({ ...prev, newPassword: errorMessage }));
        toast.error(errorMessage);
        return;
      }
    }

    // Validate password match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      const errorMessage = t('passwordMismatch');
      setPasswordErrors(prev => ({ ...prev, confirmPassword: errorMessage }));
      toast.error(errorMessage);
      return;
    }

    try {
      await updatePasswordMutation.mutateAsync({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      
      toast.success(t('successPassword'));
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordErrors({ newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(t('errorPassword'), {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccountMutation.mutateAsync();
      toast.success(t('successDelete'));
    } catch (error: any) {
      toast.error(t('errorDelete'), {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do panelu
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{t('title')}</h1>
            <p className="text-slate-400">{t('subtitle')}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white">{t('personalInfo')}</h2>
          </div>

          <form onSubmit={handleUpdateUser} noValidate className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t('firstName')}
                </label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={user.firstName || ''}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t('lastName')}
                </label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={user.lastName || ''}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('phone')}
              </label>
              <input
                type="tel"
                name="phone"
                placeholder={t('phonePlaceholder')}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={updateUserMutation.isPending}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {updateUserMutation.isPending ? t('saving') : t('saveChanges')}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Lock className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white">{t('security')}</h2>
          </div>

          <form onSubmit={handleUpdatePassword} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('currentPassword')}
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('newPassword')}
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value });
                  if (passwordErrors.newPassword) {
                    setPasswordErrors(prev => ({ ...prev, newPassword: '' }));
                  }
                }}
                className={`w-full px-4 py-2 bg-slate-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                  passwordErrors.newPassword 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-slate-700 focus:ring-purple-500'
                }`}
                required
                minLength={8}
              />
              {passwordErrors.newPassword && (
                <p className="text-xs text-red-400 mt-1">{passwordErrors.newPassword}</p>
              )}
              {!passwordErrors.newPassword && (
                <p className="text-xs text-slate-400 mt-1">
                  Min 8 znaków, wielkie i małe litery, cyfry oraz znaki specjalne (@$!%*?&)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value });
                  if (passwordErrors.confirmPassword) {
                    setPasswordErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }
                }}
                className={`w-full px-4 py-2 bg-slate-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                  passwordErrors.confirmPassword 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-slate-700 focus:ring-purple-500'
                }`}
                required
                minLength={8}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-xs text-red-400 mt-1">{passwordErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={updatePasswordMutation.isPending}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {updatePasswordMutation.isPending ? t('updating') : t('updatePassword')}
            </button>
          </form>
        </motion.div>

        {/* Delete Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-500/10 backdrop-blur-sm border border-red-500/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-red-400">{t('dangerZone')}</h2>
          </div>

          <p className="text-slate-300 mb-4">{t('deleteAccountDescription')}</p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              {t('deleteAccountButton')}
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-red-400 font-medium">{t('deleteAccountConfirm')}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteAccountMutation.isPending}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {t('confirmDelete')}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
