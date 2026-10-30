'use client';

import React from 'react';
import { Sparkles, Check } from 'lucide-react';

export default function RoutineBuilder() {
  return (
    <section className="py-12 bg-brand-surface/30 border-t border-brand-border">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">Rituel 3 Étapes</span>
        <h3 className="text-xl font-bold text-brand-text">Protocole Beauté Recommandé</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
          <div className="p-4 rounded-xl bg-brand-bg border border-brand-border">
            <span className="text-xs font-bold text-brand-accent">Étape 01</span>
            <p className="font-bold text-sm text-brand-text pt-1">Nettoyage Purifiant</p>
            <p className="text-xs text-brand-muted pt-1">Élimine les impuretés en douceur sans agresser le film hydrolipidique.</p>
          </div>
          <div className="p-4 rounded-xl bg-brand-bg border border-brand-border">
            <span className="text-xs font-bold text-brand-accent">Étape 02</span>
            <p className="font-bold text-sm text-brand-text pt-1">Sérum Actif Concentré</p>
            <p className="text-xs text-brand-muted pt-1">Pénétration cellulaire profonde pour unifier le teint et repulper.</p>
          </div>
          <div className="p-4 rounded-xl bg-brand-bg border border-brand-border">
            <span className="text-xs font-bold text-brand-accent">Étape 03</span>
            <p className="font-bold text-sm text-brand-text pt-1">Soin Protecteur Scellant</p>
            <p className="text-xs text-brand-muted pt-1">Hydratation 24h et barrière anti-pollution naturelle.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
