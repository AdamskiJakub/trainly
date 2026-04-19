'use client';

import { InstructorProfile } from '@/types';
import { useTranslations } from 'next-intl';
import { ProfileFullView } from './ProfileFullView';

interface PublicInstructorProfileProps {
  profile: InstructorProfile;
  isPreview?: boolean;
}

export function PublicInstructorProfile({ profile, isPreview = false }: PublicInstructorProfileProps) {
  const t = useTranslations('InstructorProfile');

  return (
    <div className="space-y-6">
      {/* Preview Banner */}
      {isPreview && (
        <div className="bg-orange-500/10 border border-orange-500/50 rounded-lg p-4">
          <p className="text-orange-400 text-sm text-center">
            📝 {t('previewBanner')}
          </p>
        </div>
      )}

      <ProfileFullView profile={profile} />
    </div>
  );
}
