'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { InstructorProfile } from '@/types';
import { useUpdateInstructorProfile } from '@/hooks/useUpdateInstructorProfile';
import { toast } from 'sonner';
import { instructorProfileSchema, type InstructorProfileFormData } from '@/lib/validations/schemas/instructor-profile';
import { SPECIALIZATION_CATEGORIES } from '@/lib/config/specializations';
import { getAllTagsSorted, getTagName } from '@/lib/config/tags';
import { GOALS, getGoalName } from '@/lib/config/goals';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MAX_TAGS = 8;
const MAX_GOALS = 4;

interface InstructorProfileFormProps {
  profile?: InstructorProfile;
}

export function InstructorProfileForm({ profile }: InstructorProfileFormProps) {
  const t = useTranslations('Dashboard.profileForm');
  const locale = useLocale();
  const { mutate: updateProfile, isPending } = useUpdateInstructorProfile();
  
  // State for multi-selects
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState<string | undefined>(
    profile?.specializations?.[0] || undefined
  );
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(
    profile?.specializations?.slice(1) || [] // Exclude primary to avoid duplication
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    profile?.tags?.filter(tag => getAllTagsSorted().some(t => t.id === tag)) || []
  );
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    profile?.goals || []
  );
  const [selectedAvailability, setSelectedAvailability] = useState<string>(
    profile?.availability || 'both'
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InstructorProfileFormData>({
    resolver: zodResolver(instructorProfileSchema),
    defaultValues: {
      bio: profile?.bio || '',
      tagline: profile?.tagline || '',
      location: profile?.location || '',
      city: profile?.city || '',
      hourlyRate: profile?.hourlyRate || undefined,
      photoUrl: profile?.photoUrl || '',
      gallery: profile?.gallery || [],
      languages: profile?.languages || [],
      yearsExperience: profile?.yearsExperience || undefined,
    },
  });

  // Get available tags based on primary category
  const availableTags = getAllTagsSorted(selectedPrimaryCategory);
  
  // Get subcategories for selected primary category
  const selectedCategory = SPECIALIZATION_CATEGORIES.find(c => c.id === selectedPrimaryCategory);
  const subcategories = selectedCategory?.subcategories || [];

  // Toggle functions
  const toggleSpecialization = (id: string) => {
    setSelectedSpecializations(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleTag = (id: string) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(prev => prev.filter(t => t !== id));
    } else if (selectedTags.length < MAX_TAGS) {
      setSelectedTags(prev => [...prev, id]);
    }
  };

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(prev => prev.filter(g => g !== id));
    } else if (selectedGoals.length < MAX_GOALS) {
      setSelectedGoals(prev => [...prev, id]);
    }
  };

  const onSubmit = (data: InstructorProfileFormData) => {
    if (!profile?.id) {
      toast.error(t('profileNotFound'));
      return;
    }

    // Extract custom tags from field (if any)
    const customTagsInput = (data as any).customTags || '';
    const customTagsArray = customTagsInput
      .split(',')
      .map((t: string) => t.trim())
      .filter(Boolean);

    // Combine selected tags with custom tags
    const allTags = [...selectedTags, ...customTagsArray];

    const formattedData = {
      ...data,
      specializations: selectedPrimaryCategory ? [selectedPrimaryCategory, ...selectedSpecializations] : selectedSpecializations,
      tags: allTags,
      goals: selectedGoals,
      availability: selectedAvailability,
      hourlyRate: data.hourlyRate ?? undefined,
      yearsExperience: data.yearsExperience ?? undefined,
      languages: typeof data.languages === 'string'
        ? (data.languages as string).split(',').map(s => s.trim()).filter(Boolean)
        : data.languages,
      gallery: typeof data.gallery === 'string'
        ? (data.gallery as string).split(',').map(s => s.trim()).filter(Boolean)
        : data.gallery,
      photoUrl: data.photoUrl || undefined,
    };

    updateProfile(
      { profileId: profile.id, data: formattedData },
      {
        onSuccess: () => {
          toast.success(t('updateSuccess'));
        },
        onError: (error) => {
          toast.error(`${t('updateError')}: ${error.message}`);
        },
      }
    );
  };

  return ( 
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="tagline" className="block text-sm font-medium text-slate-200">
          {t('tagline')}
        </label>
        <p className="text-xs text-slate-400">{t('taglineHint')}</p>
        <input
          {...register('tagline')}
          id="tagline"
          type="text"
          placeholder={t('taglinePlaceholder')}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />
        {errors.tagline && (
          <p className="text-red-400 text-sm">{errors.tagline.message}</p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label htmlFor="bio" className="block text-sm font-medium text-slate-200">
          {t('bio')}
        </label>
        <textarea
          {...register('bio')}
          id="bio"
          rows={5}
          placeholder={t('bioPlaceholder')}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
        />
        {errors.bio && (
          <p className="text-red-400 text-sm">{errors.bio.message}</p>
        )}
      </div>

      {/* Primary Specialization */}
      <div>
        <label htmlFor="primarySpec" className="block text-sm font-medium text-slate-200 mb-2">
          {t('primarySpecialization')}
        </label>
        <Select
          value={selectedPrimaryCategory}
          onValueChange={(value) => {
            setSelectedPrimaryCategory(value);
            setSelectedSpecializations([]); // Reset subcategories when changing primary
            setSelectedTags([]); // Reset tags when changing primary
          }}
        >
          <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-slate-100">
            <SelectValue placeholder={t('primarySpecializationPlaceholder')} />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            {SPECIALIZATION_CATEGORIES.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="text-slate-100 focus:bg-slate-800 focus:text-white"
              >
                {category.icon} {locale === 'pl' ? category.namePl : category.nameEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Additional Specializations (Subcategories) */}
      {subcategories.length > 0 && (
        <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-5">
          <h3 className="text-base font-semibold text-white mb-3">
            {t('specializations')}
          </h3>
          <p className="text-xs text-slate-400 mb-3">{t('specializationsHint')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subcategories.map((sub) => {
              const isChecked = selectedSpecializations.includes(sub.id);
              return (
                <label
                  key={sub.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors group"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleSpecialization(sub.id)}
                    className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <span
                    className={`text-sm select-none transition-colors ${
                      isChecked
                        ? 'font-semibold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'
                        : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {locale === 'pl' ? sub.namePl : sub.nameEn}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Tags Section */}
      {availableTags.length > 0 && (
        <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-5">
          <h3 className="text-base font-semibold text-white mb-2">
            {t('tags')}
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            {t('tagsHint', { max: MAX_TAGS })}
            {selectedTags.length >= MAX_TAGS && (
              <span className="text-orange-400 ml-2">({t('tagsMaxReached', { max: MAX_TAGS })})</span>
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
            {availableTags.map((tag) => {
              const isChecked = selectedTags.includes(tag.id);
              const isDisabled = !isChecked && selectedTags.length >= MAX_TAGS;
              return (
                <label
                  key={tag.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors group ${
                    isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <Checkbox
                    checked={isChecked}
                    disabled={isDisabled}
                    onCheckedChange={() => toggleTag(tag.id)}
                    className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <span
                    className={`text-sm select-none transition-colors ${
                      isChecked
                        ? 'font-semibold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'
                        : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {getTagName(tag, locale)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Goals Section */}
      <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-5">
        <h3 className="text-base font-semibold text-white mb-2">
          {t('goals')}
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          {t('goalsHint')}
          {selectedGoals.length >= MAX_GOALS && (
            <span className="text-orange-400 ml-2">({t('goalsMaxReached', { max: MAX_GOALS })})</span>
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {GOALS.map((goal) => {
            const isChecked = selectedGoals.includes(goal.id);
            const isDisabled = !isChecked && selectedGoals.length >= MAX_GOALS;
            return (
              <label
                key={goal.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors group ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800/50'
                }`}
              >
                <Checkbox
                  checked={isChecked}
                  disabled={isDisabled}
                  onCheckedChange={() => toggleGoal(goal.id)}
                  className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <span
                  className={`text-sm select-none transition-colors ${
                    isChecked
                      ? 'font-semibold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'
                      : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {goal.icon} {getGoalName(goal, locale)}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <Label className="text-slate-200">
          {t('availability')}
        </Label>
        <RadioGroup
          value={selectedAvailability}
          onValueChange={setSelectedAvailability}
          className="space-y-3"
        >
          <label className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
            <RadioGroupItem value="online" className="border-slate-600" />
            <span className="text-slate-200">{t('availabilityOnline')}</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
            <RadioGroupItem value="in-person" className="border-slate-600" />
            <span className="text-slate-200">{t('availabilityInPerson')}</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
            <RadioGroupItem value="both" className="border-slate-600" />
            <span className="text-slate-200">{t('availabilityBoth')}</span>
          </label>
        </RadioGroup>
      </div>

      {/* Location & City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-slate-200">
            {t('city')}
          </Label>
          <Input
            {...register('city')}
            id="city"
            type="text"
            placeholder={t('cityPlaceholder')}
            className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
          />
          {errors.city && (
            <p className="text-red-400 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsExperience" className="text-slate-200">
            {t('yearsExperience')} <span className="text-slate-400 text-xs font-normal">{t('hourlyRateOptional')}</span>
          </Label>
          <Input
            {...register('yearsExperience', { 
              setValueAs: (v) => v === '' || v === null || v === undefined ? undefined : Number(v)
            })}
            id="yearsExperience"
            type="number"
            placeholder={t('yearsExperiencePlaceholder')}
            className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
          />
          {errors.yearsExperience && (
            <p className="text-red-400 text-sm">{errors.yearsExperience.message}</p>
          )}
        </div>
      </div>

      {/* Hourly Rate */}
      <div className="space-y-2">
        <Label htmlFor="hourlyRate" className="text-slate-200">
          {t('hourlyRate')} <span className="text-slate-400 text-xs font-normal">{t('hourlyRateOptional')}</span>
        </Label>
        <Input
          {...register('hourlyRate', { 
            setValueAs: (v) => v === '' || v === null || v === undefined ? undefined : Number(v)
          })}
          id="hourlyRate"
          type="number"
          step="0.01"
          placeholder={t('hourlyRatePlaceholder')}
          className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
        />
        {errors.hourlyRate && (
          <p className="text-red-400 text-sm">{errors.hourlyRate.message}</p>
        )}
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <Label htmlFor="languages" className="text-slate-200">
          {t('languages')}
        </Label>
        <Input
          {...register('languages')}
          id="languages"
          type="text"
          defaultValue={profile?.languages?.join(', ') || ''}
          placeholder={t('languagesPlaceholder')}
          className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
        />
        {errors.languages && (
          <p className="text-red-400 text-sm">{errors.languages.message}</p>
        )}
      </div>

      {/* Photo URL */}
      <div className="space-y-2">
        <Label htmlFor="photoUrl" className="text-slate-200">
          {t('photoUrl')}
        </Label>
        <Input
          {...register('photoUrl')}
          id="photoUrl"
          type="url"
          placeholder={t('photoUrlPlaceholder')}
          className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
        />
        {errors.photoUrl && (
          <p className="text-red-400 text-sm">{errors.photoUrl.message}</p>
        )}
      </div>

      {/* Gallery */}
      <div className="space-y-2">
        <Label htmlFor="gallery" className="text-slate-200">
          {t('gallery')}
        </Label>
        <Textarea
          {...register('gallery')}
          id="gallery"
          rows={3}
          defaultValue={profile?.gallery?.join(', ') || ''}
          placeholder={t('galleryPlaceholder')}
          className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500 resize-none"
        />
        {errors.gallery && (
          <p className="text-red-400 text-sm">{errors.gallery.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
          size="lg"
        >
          {isPending ? t('saving') : t('saveProfile')}
        </Button>
      </div>
    </form>
  );
}
