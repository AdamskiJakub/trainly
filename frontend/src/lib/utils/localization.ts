import { SPECIALIZATION_CATEGORIES } from '@/lib/config/specializations';

/**
 * Get localized category name
 */
export function getCategoryName(
  category: typeof SPECIALIZATION_CATEGORIES[0],
  locale: string
): string {
  return locale === 'pl' ? category.namePl : category.nameEn;
}

/**
 * Get localized subcategory name
 */
export function getSubcategoryName(
  subcategory: typeof SPECIALIZATION_CATEGORIES[0]['subcategories'][0],
  locale: string
): string {
  return locale === 'pl' ? subcategory.namePl : subcategory.nameEn;
}
