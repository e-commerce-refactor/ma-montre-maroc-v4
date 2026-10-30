'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function InstagramStories() {
  const stories = [{"title": "Avis VIP", "badge": "+1500 Avis", "icon": "⭐"}, {"title": "Garantie 2 Ans", "badge": "Certificat", "icon": "🛡️"}, {"title": "Calibres", "badge": "Automatique", "icon": "⚙️"}, {"title": "Casablanca", "badge": "Livraison 24h", "icon": "📍"}];

  return (
    <div className="py-4 bg-brand-surface/40 border-b border-brand-border/60 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-start sm:justify-center gap-5 sm:gap-8 min-w-max">
        {stories.map((story: any, idx: number) => (
          <div key={idx} className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-brand-accent to-brand-accent2 group-hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-bg flex items-center justify-center text-xl sm:text-2xl border-2 border-brand-bg">
                <span>{story.icon || '✨'}</span>
              </div>
              {story.badge && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-brand-accent text-white text-[9px] font-bold uppercase tracking-wider">
                  {story.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-brand-muted group-hover:text-brand-text transition-colors">
              {story.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
