'use client';

import React from 'react';
import { Clock, ShieldCheck, Award } from 'lucide-react';

export default function ChronometerTelemetry() {
  return (
    <section className="py-12 bg-brand-surface/40 border-t border-brand-border">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
        <Clock className="w-8 h-8 text-brand-accent mx-auto" />
        <h3 className="text-xl font-bold text-brand-text">Télémetrie Horlogère de Haute Précision</h3>
        <p className="text-xs text-brand-muted max-w-xl mx-auto">
          Nos calibres mécaniques et automatiques subissent une batterie de tests chronométriques rigoureux avant mise sous pli scellé.
        </p>
      </div>
    </section>
  );
}
