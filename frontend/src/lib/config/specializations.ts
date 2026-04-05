/**
 * Specialization categories and subcategories configuration
 * This will be later synchronized with backend API
 */

export interface Subcategory {
  id: string;
  nameEn: string;
  namePl: string;
}

export interface SpecializationCategory {
  id: string;
  slug: string;
  nameEn: string;
  namePl: string;
  icon: string;
  order: number;
  subcategories: Subcategory[];
}

export const SPECIALIZATION_CATEGORIES: SpecializationCategory[] = [
  {
    id: 'personal-training',
    slug: 'personal-training',
    nameEn: 'Personal Training',
    namePl: 'Trening personalny',
    icon: '💪',
    order: 1,
    subcategories: [
      { id: 'strength-training', nameEn: 'Strength Training', namePl: 'Trening siłowy' },
      { id: 'functional-training', nameEn: 'Functional Training', namePl: 'Trening funkcjonalny' },
      { id: 'crossfit', nameEn: 'CrossFit', namePl: 'CrossFit' },
      { id: 'strongman', nameEn: 'Strongman', namePl: 'Strongman' },
      { id: 'powerlifting', nameEn: 'Powerlifting', namePl: 'Powerlifting' },
      { id: 'calisthenics', nameEn: 'Calisthenics', namePl: 'Kalistenika' },
      { id: 'bodybuilding', nameEn: 'Bodybuilding', namePl: 'Kulturystyka' },
    ],
  },
  {
    id: 'dance',
    slug: 'dance',
    nameEn: 'Dance',
    namePl: 'Taniec',
    icon: '🕺',
    order: 2,
    subcategories: [
      { id: 'social-dance', nameEn: 'Social Dance', namePl: 'Taniec użytkowy' },
      { id: 'hip-hop', nameEn: 'Hip-hop', namePl: 'Hip-hop' },
      { id: 'bachata', nameEn: 'Bachata', namePl: 'Bachata' },
      { id: 'salsa', nameEn: 'Salsa', namePl: 'Salsa' },
      { id: 'kizomba', nameEn: 'Kizomba', namePl: 'Kizomba' },
      { id: 'reggaeton', nameEn: 'Reggaeton', namePl: 'Reggaeton' },
      { id: 'breakdance', nameEn: 'Breakdance', namePl: 'Break dance' },
      { id: 'contemporary', nameEn: 'Contemporary', namePl: 'Contemporary' },
      { id: 'ballet', nameEn: 'Ballet', namePl: 'Balet' },
    ],
  },
  {
    id: 'yoga-mindfulness',
    slug: 'yoga-mindfulness',
    nameEn: 'Yoga & Mindfulness',
    namePl: 'Joga & Mindfulness',
    icon: '🧘',
    order: 3,
    subcategories: [
      { id: 'hatha-yoga', nameEn: 'Hatha Yoga', namePl: 'Hatha Yoga' },
      { id: 'vinyasa', nameEn: 'Vinyasa', namePl: 'Vinyasa' },
      { id: 'yin-yoga', nameEn: 'Yin Yoga', namePl: 'Yin Yoga' },
      { id: 'power-yoga', nameEn: 'Power Yoga', namePl: 'Power Yoga' },
      { id: 'pilates', nameEn: 'Pilates', namePl: 'Pilates' },
      { id: 'meditation', nameEn: 'Meditation', namePl: 'Medytacja' },
      { id: 'stretching', nameEn: 'Stretching', namePl: 'Stretching' },
    ],
  },
  {
    id: 'combat-sports',
    slug: 'combat-sports',
    nameEn: 'Combat Sports',
    namePl: 'Sporty walki',
    icon: '🥊',
    order: 4,
    subcategories: [
      { id: 'boxing', nameEn: 'Boxing', namePl: 'Boks' },
      { id: 'mma', nameEn: 'MMA', namePl: 'MMA' },
      { id: 'muay-thai', nameEn: 'Muay Thai', namePl: 'Muay Thai' },
      { id: 'kickboxing', nameEn: 'Kickboxing', namePl: 'Kickboxing' },
      { id: 'brazilian-jiu-jitsu', nameEn: 'Brazilian Jiu-Jitsu', namePl: 'Brazylijskie Jiu-Jitsu' },
      { id: 'karate', nameEn: 'Karate', namePl: 'Karate' },
      { id: 'judo', nameEn: 'Judo', namePl: 'Judo' },
      { id: 'taekwondo', nameEn: 'Taekwondo', namePl: 'Taekwondo' },
    ],
  },
  {
    id: 'cardio-sports',
    slug: 'cardio-sports',
    nameEn: 'Cardio Sports',
    namePl: 'Sporty cardio',
    icon: '🏃',
    order: 5,
    subcategories: [
      { id: 'running', nameEn: 'Running', namePl: 'Bieganie' },
      { id: 'cycling', nameEn: 'Cycling', namePl: 'Kolarstwo' },
      { id: 'swimming', nameEn: 'Swimming', namePl: 'Pływanie' },
      { id: 'triathlon', nameEn: 'Triathlon', namePl: 'Triatlon' },
      { id: 'rowing', nameEn: 'Rowing', namePl: 'Wioślarstwo' },
    ],
  },
  {
    id: 'nutrition-wellness',
    slug: 'nutrition-wellness',
    nameEn: 'Nutrition & Wellness',
    namePl: 'Dietetyka & Wellness',
    icon: '🥗',
    order: 6,
    subcategories: [
      { id: 'sports-nutrition', nameEn: 'Sports Nutrition', namePl: 'Dietetyka sportowa' },
      { id: 'clinical-nutrition', nameEn: 'Clinical Nutrition', namePl: 'Dietetyka kliniczna' },
      { id: 'nutrition-coaching', nameEn: 'Nutrition Coaching', namePl: 'Coaching żywieniowy' },
      { id: 'supplementation', nameEn: 'Supplementation', namePl: 'Suplementacja' },
      { id: 'weight-loss', nameEn: 'Weight Loss', namePl: 'Redukcja wagi' },
    ],
  },
  {
    id: 'team-sports',
    slug: 'team-sports',
    nameEn: 'Team Sports',
    namePl: 'Sporty zespołowe',
    icon: '⚽',
    order: 7,
    subcategories: [
      { id: 'football', nameEn: 'Football', namePl: 'Piłka nożna' },
      { id: 'basketball', nameEn: 'Basketball', namePl: 'Koszykówka' },
      { id: 'volleyball', nameEn: 'Volleyball', namePl: 'Siatkówka' },
      { id: 'handball', nameEn: 'Handball', namePl: 'Piłka ręczna' },
      { id: 'conditioning', nameEn: 'Sports Conditioning', namePl: 'Trening przygotowawczy' },
    ],
  },
  {
    id: 'specialized-sports',
    slug: 'specialized-sports',
    nameEn: 'Specialized Sports',
    namePl: 'Sporty specjalistyczne',
    icon: '🎯',
    order: 8,
    subcategories: [
      { id: 'gymnastics', nameEn: 'Gymnastics', namePl: 'Gimnastyka' },
      { id: 'acrobatics', nameEn: 'Acrobatics', namePl: 'Akrobatyka' },
      { id: 'circus-arts', nameEn: 'Circus Arts', namePl: 'Sztuki cyrkowe' },
      { id: 'climbing', nameEn: 'Climbing', namePl: 'Wspinaczka' },
      { id: 'parkour', nameEn: 'Parkour', namePl: 'Parkour' },
    ],
  },
];

/**
 * Helper functions
 */

export function getCategoryById(id: string): SpecializationCategory | undefined {
  return SPECIALIZATION_CATEGORIES.find((cat) => cat.id === id);
}

export function getCategoryBySlug(slug: string): SpecializationCategory | undefined {
  return SPECIALIZATION_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getSubcategoryById(
  categoryId: string,
  subcategoryId: string
): Subcategory | undefined {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find((sub) => sub.id === subcategoryId);
}

export function findSubcategoryById(subcategoryId: string): Subcategory | undefined {
  for (const category of SPECIALIZATION_CATEGORIES) {
    const sub = category.subcategories.find((s) => s.id === subcategoryId);
    if (sub) return sub;
  }
  return undefined;
}

export function getAllSubcategories(): Subcategory[] {
  return SPECIALIZATION_CATEGORIES.flatMap((cat) => cat.subcategories);
}
