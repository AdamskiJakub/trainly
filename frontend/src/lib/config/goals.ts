export interface Goal {
  id: string;
  nameEn: string;
  namePl: string;
  icon: string;
}

export const GOALS: Goal[] = [
  {
    id: 'weight_loss',
    nameEn: 'Lose Weight',
    namePl: 'Schudnąć',
    icon: '🎯',
  },
  {
    id: 'muscle_gain',
    nameEn: 'Build Muscle',
    namePl: 'Zbudować masę',
    icon: '💪',
  },
  {
    id: 'flexibility',
    nameEn: 'Improve Flexibility',
    namePl: 'Poprawić elastyczność',
    icon: '🧘',
  },
  {
    id: 'endurance',
    nameEn: 'Increase Endurance',
    namePl: 'Zwiększyć wytrzymałość',
    icon: '🏃',
  },
  {
    id: 'recovery',
    nameEn: 'Recovery & Rehabilitation',
    namePl: 'Rehabilitacja',
    icon: '🩹',
  },
  {
    id: 'sport_performance',
    nameEn: 'Sport Performance',
    namePl: 'Wydolność sportowa',
    icon: '⚡',
  },
  {
    id: 'get_in_shape',
    nameEn: 'Get in Shape',
    namePl: 'Poprawić kondycję',
    icon: '🌟',
  },
];

export function getGoalById(id: string): Goal | undefined {
  return GOALS.find((goal) => goal.id === id);
}

export function getGoalName(goal: Goal, locale: string): string {
  return locale === 'pl' ? goal.namePl : goal.nameEn;
}
