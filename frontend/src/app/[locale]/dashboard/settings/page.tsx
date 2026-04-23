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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
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
            {t('backToDashboard')}
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
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('firstName')}</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={user.firstName || ''}
                />
              </div>
              
              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('lastName')}</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={user.lastName || ''}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                type="email"
                name="email"
                id="email"
                defaultValue={user.email}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input
                type="tel"
                name="phone"
                id="phone"
                placeholder={t('phonePlaceholder')}
              />
            </div>

            <Button
              type="submit"
              disabled={updateUserMutation.isPending}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {updateUserMutation.isPending ? t('saving') : t('saveChanges')}
            </Button>
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
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
              <Input
                type="password"
                id="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t('newPassword')}</Label>
              <Input
                type="password"
                id="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value });
                  if (passwordErrors.newPassword) {
                    setPasswordErrors(prev => ({ ...prev, newPassword: '' }));
                  }
                }}
                aria-invalid={passwordErrors.newPassword ? 'true' : 'false'}
                required
                minLength={8}
              />
              {passwordErrors.newPassword && (
                <p className="text-sm text-red-500">{passwordErrors.newPassword}</p>
              )}
              {!passwordErrors.newPassword && (
                <p className="text-xs text-slate-400">
                  Min 8 znaków, wielkie i małe litery, cyfry oraz znaki specjalne (@$!%*?&)
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value });
                  if (passwordErrors.confirmPassword) {
                    setPasswordErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }
                }}
                aria-invalid={passwordErrors.confirmPassword ? 'true' : 'false'}
                required
                minLength={8}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-sm text-red-500">{passwordErrors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={updatePasswordMutation.isPending}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              {updatePasswordMutation.isPending ? t('updating') : t('updatePassword')}
            </Button>
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
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {t('deleteAccountButton')}
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-red-400 font-medium">{t('deleteAccountConfirm')}</p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-slate-700 hover:bg-slate-600 text-white"
                >
                  {t('cancel')}
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  disabled={deleteAccountMutation.isPending}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {t('confirmDelete')}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
