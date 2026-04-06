export interface Tag {
  id: string;
  nameEn: string;
  namePl: string;
  categories: string[];
}

export const GLOBAL_TAGS: Tag[] = [
  {
    id: 'strength-training',
    nameEn: 'Strength Training',
    namePl: 'Trening siłowy',
    categories: ['personal-training'],
  },
  {
    id: 'functional-training',
    nameEn: 'Functional Training',
    namePl: 'Trening funkcjonalny',
    categories: ['personal-training'],
  },
  {
    id: 'hiit',
    nameEn: 'HIIT',
    namePl: 'HIIT',
    categories: ['personal-training', 'fitness-cardio'],
  },
  {
    id: 'calisthenics',
    nameEn: 'Calisthenics',
    namePl: 'Kalistenika',
    categories: ['personal-training'],
  },
  {
    id: 'mobility',
    nameEn: 'Mobility',
    namePl: 'Mobilność',
    categories: ['personal-training', 'yoga-mobility', 'recovery'],
  },
  {
    id: 'rehabilitation',
    nameEn: 'Rehabilitation',
    namePl: 'Rehabilitacja',
    categories: ['personal-training', 'recovery'],
  },
  {
    id: 'beginner-friendly',
    nameEn: 'Beginner Friendly',
    namePl: 'Dla początkujących',
    categories: ['personal-training'],
  },

  // === FITNESS & CARDIO ===
  {
    id: 'running',
    nameEn: 'Running',
    namePl: 'Bieganie',
    categories: ['fitness-cardio'],
  },
  {
    id: 'cycling',
    nameEn: 'Cycling',
    namePl: 'Kolarstwo',
    categories: ['fitness-cardio'],
  },
  {
    id: 'swimming',
    nameEn: 'Swimming',
    namePl: 'Pływanie',
    categories: ['fitness-cardio'],
  },
  {
    id: 'cardio-training',
    nameEn: 'Cardio Training',
    namePl: 'Trening cardio',
    categories: ['fitness-cardio'],
  },

  {
    id: 'hatha',
    nameEn: 'Hatha Yoga',
    namePl: 'Hatha Yoga',
    categories: ['yoga-mobility'],
  },
  {
    id: 'vinyasa',
    nameEn: 'Vinyasa',
    namePl: 'Vinyasa',
    categories: ['yoga-mobility'],
  },
  {
    id: 'yin-yoga',
    nameEn: 'Yin Yoga',
    namePl: 'Yin Yoga',
    categories: ['yoga-mobility'],
  },
  {
    id: 'power-yoga',
    nameEn: 'Power Yoga',
    namePl: 'Power Yoga',
    categories: ['yoga-mobility'],
  },
  {
    id: 'pilates',
    nameEn: 'Pilates',
    namePl: 'Pilates',
    categories: ['yoga-mobility'],
  },
  {
    id: 'stretching',
    nameEn: 'Stretching',
    namePl: 'Stretching',
    categories: ['yoga-mobility', 'recovery'],
  },

  {
    id: 'social-dance',
    nameEn: 'Social Dance',
    namePl: 'Taniec użytkowy',
    categories: ['dance'],
  },
  {
    id: 'wedding-dance',
    nameEn: 'Wedding Dance',
    namePl: 'Pierwszy taniec',
    categories: ['dance'],
  },
  {
    id: 'hip-hop',
    nameEn: 'Hip-hop',
    namePl: 'Hip-hop',
    categories: ['dance'],
  },
  {
    id: 'bachata',
    nameEn: 'Bachata',
    namePl: 'Bachata',
    categories: ['dance'],
  },
  {
    id: 'salsa',
    nameEn: 'Salsa',
    namePl: 'Salsa',
    categories: ['dance'],
  },
  {
    id: 'kizomba',
    nameEn: 'Kizomba',
    namePl: 'Kizomba',
    categories: ['dance'],
  },
  {
    id: 'reggaeton',
    nameEn: 'Reggaeton',
    namePl: 'Reggaeton',
    categories: ['dance'],
  },
  {
    id: 'breakdance',
    nameEn: 'Breakdance',
    namePl: 'Break dance',
    categories: ['dance'],
  },
  {
    id: 'heels',
    nameEn: 'High Heels',
    namePl: 'High Heels',
    categories: ['dance'],
  },
  {
    id: 'pole-dance',
    nameEn: 'Pole Dance',
    namePl: 'Pole Dance',
    categories: ['dance'],
  },
  {
    id: 'ballet',
    nameEn: 'Ballet',
    namePl: 'Balet',
    categories: ['dance'],
  },

  {
    id: 'boxing',
    nameEn: 'Boxing',
    namePl: 'Boks',
    categories: ['martial-arts'],
  },
  {
    id: 'mma',
    nameEn: 'MMA',
    namePl: 'MMA',
    categories: ['martial-arts'],
  },
  {
    id: 'muay-thai',
    nameEn: 'Muay Thai',
    namePl: 'Muay Thai',
    categories: ['martial-arts'],
  },
  {
    id: 'kickboxing',
    nameEn: 'Kickboxing',
    namePl: 'Kickboxing',
    categories: ['martial-arts'],
  },
  {
    id: 'bjj',
    nameEn: 'Brazilian Jiu-Jitsu',
    namePl: 'Brazylijskie Jiu-Jitsu',
    categories: ['martial-arts'],
  },
  {
    id: 'karate',
    nameEn: 'Karate',
    namePl: 'Karate',
    categories: ['martial-arts'],
  },
  {
    id: 'judo',
    nameEn: 'Judo',
    namePl: 'Judo',
    categories: ['martial-arts'],
  },
  {
    id: 'taekwondo',
    nameEn: 'Taekwondo',
    namePl: 'Taekwondo',
    categories: ['martial-arts'],
  },
  {
    id: 'krav-maga',
    nameEn: 'Krav Maga',
    namePl: 'Krav Maga',
    categories: ['martial-arts'],
  },

  {
    id: 'football',
    nameEn: 'Football',
    namePl: 'Piłka nożna',
    categories: ['sports'],
  },
  {
    id: 'basketball',
    nameEn: 'Basketball',
    namePl: 'Koszykówka',
    categories: ['sports'],
  },
  {
    id: 'volleyball',
    nameEn: 'Volleyball',
    namePl: 'Siatkówka',
    categories: ['sports'],
  },
  {
    id: 'handball',
    nameEn: 'Handball',
    namePl: 'Piłka ręczna',
    categories: ['sports'],
  },
  {
    id: 'athletic-training',
    nameEn: 'Athletic Training',
    namePl: 'Trening atletyczny',
    categories: ['sports'],
  },

  {
    id: 'weight-loss-diet',
    nameEn: 'Weight Loss Diet',
    namePl: 'Dieta redukcyjna',
    categories: ['nutrition'],
  },
  {
    id: 'muscle-gain-diet',
    nameEn: 'Muscle Gain Diet',
    namePl: 'Dieta na masę',
    categories: ['nutrition'],
  },
  {
    id: 'sports-nutrition',
    nameEn: 'Sports Nutrition',
    namePl: 'Dietetyka sportowa',
    categories: ['nutrition'],
  },
  {
    id: 'meal-planning',
    nameEn: 'Meal Planning',
    namePl: 'Układanie planów żywieniowych',
    categories: ['nutrition'],
  },
  {
    id: 'healthy-eating',
    nameEn: 'Healthy Eating',
    namePl: 'Zdrowe odżywianie',
    categories: ['nutrition'],
  },
  {
    id: 'supplementation',
    nameEn: 'Supplementation',
    namePl: 'Suplementacja',
    categories: ['nutrition'],
  },

  {
    id: 'massage',
    nameEn: 'Massage',
    namePl: 'Masaż',
    categories: ['recovery'],
  },
  {
    id: 'injury-recovery',
    nameEn: 'Injury Recovery',
    namePl: 'Powrót po kontuzji',
    categories: ['recovery'],
  },
];

export function getTagById(id: string): Tag | undefined {
  return GLOBAL_TAGS.find((tag) => tag.id === id);
}

export function getTagName(tag: Tag, locale: string): string {
  return locale === 'pl' ? tag.namePl : tag.nameEn;
}

export function getTagsByCategory(categoryId: string): Tag[] {
  return GLOBAL_TAGS.filter((tag) => tag.categories.includes(categoryId));
}

export function getAllTags(): Tag[] {
  return GLOBAL_TAGS;
}

export function getAllTagsSorted(categoryId?: string): Tag[] {
  if (!categoryId) return GLOBAL_TAGS;
  
  const primaryTags = GLOBAL_TAGS.filter((tag) => 
    tag.categories.includes(categoryId)
  );
  const otherTags = GLOBAL_TAGS.filter((tag) => 
    !tag.categories.includes(categoryId)
  );
  
  return [...primaryTags, ...otherTags];
}
