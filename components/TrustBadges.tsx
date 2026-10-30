'use client';

import React from 'react';
import { Clock, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export default function TrustBadges() {
  return (
    <section id="telemetry" className="py-8 bg-brand-surface border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
          <Clock className="w-5 h-5 text-brand-accent mx-auto" />
          <p className="font-bold text-xs text-brand-text">Calibre Automatique</p>
          <p className="text-[10px] text-brand-muted">Précision chronométrique</p>
        </div>
        <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
          <ShieldCheck className="w-5 h-5 text-brand-accent mx-auto" />
          <p className="font-bold text-xs text-brand-text">Glace Saphir</p>
          <p className="text-[10px] text-brand-muted">Anti-rayures haute dureté</p>
        </div>
        <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
          <Compass className="w-5 h-5 text-brand-accent mx-auto" />
          <p className="font-bold text-xs text-brand-text">Étanchéité 50M</p>
          <p className="text-[10px] text-brand-muted">Éprouvé sous pression</p>
        </div>
        <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
          <p className="font-bold text-xs text-brand-text">Garantie 24 Mois</p>
          <p className="text-[10px] text-brand-muted">Carte de garantie physique</p>
        </div>
      </div>
    </section>
  );
}
