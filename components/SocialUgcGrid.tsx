'use client';

import React from 'react';
import { Instagram, Heart } from 'lucide-react';

export default function SocialUgcGrid() {
  const ugcPosts = [{"author": "@sarah_casa", "caption": "Mouvement automatique d'une régularité parfaite"}, {"author": "@youssef_k", "caption": "Makan3refch nwesef l'qualité dial l'sa3a, heavy o tqila fl yed"}, {"author": "@mehdi_b", "caption": "Verre saphir inrayable"}, {"author": "@amina_m", "caption": "Li chafha kaygoul s7i7a bzaf"}];

  return (
    <section className="py-12 bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent uppercase tracking-wider">
          <Instagram className="w-4 h-4" />
          <span>Communauté @mamontre.ma</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-brand-text">
          Partagé par nos clients au Maroc
        </h2>
        <p className="text-xs text-brand-muted max-w-xl mx-auto">
          Rejoignez plus de 35k abonnés sur Instagram et partagez vos commandes.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {ugcPosts.map((post: any, idx: number) => (
          <div key={idx} className="p-4 rounded-xl bg-brand-bg border border-brand-border text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-brand-text">
              <span>{post.author}</span>
              <Heart className="w-3.5 h-3.5 text-brand-accent fill-brand-accent" />
            </div>
            <p className="text-xs text-brand-muted font-light leading-relaxed">
              "{post.caption}"
            </p>
            <span className="text-[10px] text-emerald-500 font-semibold block">
              ✓ Achat vérifié au Maroc
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
