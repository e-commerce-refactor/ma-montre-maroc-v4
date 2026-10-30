'use client';

import React from 'react';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function CraftsmanshipSeal() {
  return (
    <section className="py-12 bg-brand-surface/30 border-t border-brand-border text-center">
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        <Sparkles className="w-8 h-8 text-brand-accent mx-auto" />
        <h3 className="text-xl font-serif font-bold text-brand-text">Le Sceau d'Excellence Joaillière</h3>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light max-w-2xl mx-auto">
          Toutes nos pièces en or 18 carats sont façonnées avec la plus grande rigueur au sein de nos ateliers partenaires à Casablanca. Chaque bijou fait l'objet d'un contrôle de pureté rigoureux et porte le poinçon officiel certifiant son authenticité.
        </p>
      </div>
    </section>
  );
}
