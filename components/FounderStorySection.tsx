'use client';

import React from 'react';
import { Heart } from 'lucide-react';

export default function FounderStorySection() {
  return (
    <section className="py-12 bg-brand-surface/30 border-t border-brand-border">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <Heart className="w-8 h-8 text-brand-accent mx-auto" />
        <h3 className="text-xl font-serif font-bold text-brand-text">La Passion du Fait Main</h3>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light max-w-2xl mx-auto">
          Depuis nos ateliers de Fès et Marrakech, nos artisans façonnent chaque création dans le respect des traditions séculaires. Le cuir tanné végétal et les finitions manuelles confèrent à chaque pièce un caractère unique qui se patine avec le temps.
        </p>
      </div>
    </section>
  );
}
