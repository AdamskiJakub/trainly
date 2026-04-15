'use client';

import { InstructorProfile } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Star } from 'lucide-react';
import { getSpecializationName } from '@/lib/config/specializations';
import { getTagName, getTagById } from '@/lib/config/tags';
import { getGoalName, getGoalById } from '@/lib/config/goals';

interface PublicInstructorProfileProps {
  profile: InstructorProfile;
  isPreview?: boolean;
}

export function PublicInstructorProfile({ profile, isPreview = false }: PublicInstructorProfileProps) {
  const locale = useLocale();
  const t = useTranslations('InstructorProfile');
  
  const fullName = profile.user?.firstName && profile.user?.lastName
    ? `${profile.user.firstName} ${profile.user.lastName}`
    : profile.user?.username || 'Unknown Instructor';

  const primarySpecialization = profile.specializations?.[0];
  const additionalSpecializations = profile.specializations?.slice(1) || [];

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

      {/* Header Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <Avatar className="size-24 md:size-32 border-4 border-orange-500 shrink-0">
            <AvatarImage src={profile.photoUrl || undefined} alt={fullName} />
            <AvatarFallback className="bg-slate-700 text-white text-2xl">
              {fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Info Section */}
          <div className="flex-1 space-y-3">
            {/* Title + Price Row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {fullName}
                  </h1>
                  {profile.verified && (
                    <Badge className="bg-orange-500 hover:bg-orange-600">
                      ✓ {t('verified')}
                    </Badge>
                  )}
                </div>
                
                {primarySpecialization && (
                  <p className="text-sm text-slate-400 mt-1">
                    {getSpecializationName(primarySpecialization, locale)}
                  </p>
                )}
              </div>

              {/* Price - PO PRAWEJ jak na listingu */}
              {!profile.hourlyRateHidden && profile.hourlyRate !== null && profile.hourlyRate !== undefined && (
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-orange-500">
                    {profile.hourlyRate} zł
                  </p>
                  <p className="text-xs text-slate-400">{t('perHour')}</p>
                </div>
              )}
            </div>

            {/* Tagline */}
            {profile.tagline && (
              <p className="text-sm text-slate-300">{profile.tagline}</p>
            )}

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {/* Rating */}
              {profile.averageRating !== null && profile.averageRating !== undefined && (
                <div className="flex items-center gap-1 text-orange-500">
                  <Star className="size-4 fill-orange-500" />
                  <span className="font-semibold">
                    {profile.averageRating.toFixed(1)}
                  </span>
                  {profile.reviewCount !== null && profile.reviewCount !== undefined && (
                    <span className="text-slate-400">
                      ({profile.reviewCount})
                    </span>
                  )}
                </div>
              )}

              {/* Location */}
              {profile.city && (
                <div className="flex items-center gap-1 text-slate-400">
                  <MapPin className="size-4" />
                  <span>{profile.city}</span>
                </div>
              )}

              {/* Availability Badge - jak na listingu */}
              {profile.availability && (
                <Badge
                  variant="secondary"
                  className="bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                  {profile.availability === 'online' && (
                    <>
                      <Globe className="size-3 mr-1" />
                      {t('availabilityOnline')}
                    </>
                  )}
                  {profile.availability === 'in-person' && (
                    <>
                      <MapPin className="size-3 mr-1" />
                      {t('availabilityInPerson')}
                    </>
                  )}
                  {profile.availability === 'both' && (
                    <>
                      <Globe className="size-3 mr-1" />
                      {t('availabilityBoth')}
                    </>
                  )}
                </Badge>
              )}

              {/* Years Experience */}
              {profile.yearsExperience !== null && profile.yearsExperience !== undefined && (
                <span className="text-slate-400">
                  {t('yearsExperience', { count: profile.yearsExperience })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">{t('aboutMe')}</h2>
          <p className="text-slate-300 whitespace-pre-wrap">{profile.bio}</p>
        </div>
      )}

      {/* Additional Specializations */}
      {additionalSpecializations.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">{t('additionalSpecializations')}</h2>
          <div className="flex flex-wrap gap-2">
            {additionalSpecializations.map((spec) => (
              <Badge key={spec} variant="secondary" className="bg-slate-700 text-slate-200">
                {getSpecializationName(spec, locale)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {profile.tags && profile.tags.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">{t('skillsExpertise')}</h2>
          <div className="flex flex-wrap gap-2">
            {profile.tags.map((tagId) => {
              const tag = getTagById(tagId);
              return tag ? (
                <Badge key={tagId} variant="outline" className="border-slate-600 text-slate-300">
                  {getTagName(tag, locale)}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Goals */}
      {profile.goals && profile.goals.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">{t('iHelpYouAchieve')}</h2>
          <div className="flex flex-wrap gap-2">
            {profile.goals.map((goalId) => {
              const goal = getGoalById(goalId);
              return goal ? (
                <Badge key={goalId} variant="outline" className="border-orange-500/50 text-orange-400">
                  {goal.icon} {getGoalName(goal, locale)}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Languages */}
      {profile.languages && profile.languages.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">{t('languages')}</h2>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="bg-slate-700 text-slate-200">
                {lang.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      {profile.gallery && profile.gallery.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">{t('gallery')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profile.gallery.map((url, idx) => (
              <div key={idx} className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                <img 
                  src={url} 
                  alt={t('galleryImage', { number: idx + 1 })}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
