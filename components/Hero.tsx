'use client';

import React from 'react';
import { ChevronRight, Clock, ShieldCheck, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-bg py-16 md:py-24 border-b border-brand-border">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-accent/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-accent text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>HAUTE HORLOGERIE & CHRONOMÈTRES • ÉDITION 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-text leading-tight">
              L'Art de l'Horlogerie. La Puissance au Poignet.
            </h1>

            <p className="text-base text-brand-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Découvrez la quintessence des garde-temps d'exception chez <strong>Ma Montre Maroc</strong>. Boîtiers forgés en acier noble, verre saphir inrayable et mouvements mécaniques éprouvés.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalogue"
                className="w-full sm:w-auto text-center px-8 py-4 bg-brand-accent hover:brightness-110 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Commander avec Garantie 2 Ans</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#telemetry"
                className="w-full sm:w-auto text-center px-6 py-4 bg-brand-surface hover:bg-brand-surface/80 border border-brand-border text-brand-text text-xs font-semibold rounded-xl transition-all"
              >
                <span>Spécifications Calibre</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-brand-border text-center">
              <div>
                <p className="text-lg font-bold text-brand-text">Saphir</p>
                <p className="text-[11px] text-brand-muted">Verre Inrayable</p>
              </div>
              <div>
                <p className="text-lg font-bold text-brand-accent">50 Mètres</p>
                <p className="text-[11px] text-brand-muted">Étanchéité Testée</p>
              </div>
              <div>
                <p className="text-lg font-bold text-emerald-400">0 DH</p>
                <p className="text-[11px] text-brand-muted">Paiement à Réception</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-brand-border bg-brand-surface p-4 shadow-2xl">
              <img
                src="https://cdn.shopify.com/s/files/1/0947/2101/6096/files/omega-seamaster-diver-300m-co-axial-master-chronometer-42-mm-21090422001003-c0bfe1.avif?v=1782505872"
                alt="Omega Seamaster Diver 300M"
                className="w-full aspect-[4/5] object-cover rounded-xl"
              />
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-brand-accent/40 text-brand-accent text-xs font-bold">
                CALIBRE CERTIFIÉ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
