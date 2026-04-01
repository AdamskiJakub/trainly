'use client';

import { useEffect, useState } from 'react';

const words = [
  { text: 'STRONG', size: 'text-4xl', color: 'text-orange-500/30', duration: 3 },
  { text: 'FITNESS', size: 'text-5xl', color: 'text-red-500/40', duration: 4 },
  { text: 'HEALTH', size: 'text-4xl', color: 'text-orange-400/30', duration: 3.5 },
  { text: 'WELLNESS', size: 'text-4xl', color: 'text-slate-400/30', duration: 4.5 },
  { text: 'TRAINER', size: 'text-5xl', color: 'text-red-600/35', duration: 3.2 },
  { text: 'COACH', size: 'text-3xl', color: 'text-orange-500/30', duration: 4.2 },
  { text: 'YOGA', size: 'text-3xl', color: 'text-slate-400/25', duration: 3.8 },
  { text: 'GYM', size: 'text-4xl', color: 'text-red-500/30', duration: 3.3 },
  { text: 'NUTRITION', size: 'text-3xl', color: 'text-orange-400/30', duration: 4.1 },
  { text: 'PHYSIO', size: 'text-3xl', color: 'text-slate-300/25', duration: 3.7 },
  { text: 'PROGRESS', size: 'text-4xl', color: 'text-orange-500/35', duration: 4.3 },
  { text: 'GOALS', size: 'text-3xl', color: 'text-red-400/30', duration: 3.6 },
  { text: 'EXPERT', size: 'text-3xl', color: 'text-slate-400/20', duration: 4.4 },
  { text: 'POWER', size: 'text-3xl', color: 'text-orange-500/30', duration: 3.4 },
  { text: 'ENERGY', size: 'text-3xl', color: 'text-slate-300/25', duration: 4.6 },
  { text: 'TRANSFORM', size: 'text-4xl', color: 'text-red-500/30', duration: 3.9 },
];

export function WordCloud() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-125 overflow-hidden flex items-center justify-center">
        
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 max-w-xl">
        {words.map((word, index) => (
          <span
            key={index}
            className={`
              ${word.size} 
              ${word.color} 
              font-bold 
              transition-all 
              duration-1000
              ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
              animate-pulse-slow
            `}
            style={{
              transitionDelay: `${index * 0.05}s`,
              animationDelay: `${index * 0.2}s`,
              animationDuration: `${word.duration}s`,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
}
