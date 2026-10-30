'use client';

import React from 'react';
import { ShoppingBag, MessageCircle, Calendar } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-brand-bg/90 border-b border-brand-border">
      {/* Luxury Restrained Top Bar */}
      <div className="bg-brand-surface/60 py-1.5 px-4 text-center border-b border-brand-border/40">
        <p className="text-[11px] font-medium tracking-widest uppercase text-brand-muted">
          Maison de Prestige • Écrin Scellé • Livraison Privée au Maroc
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-brand-muted">
          <a href="#catalogue" className="hover:text-brand-text transition-colors">Collections</a>
          <a href="#artisan" className="hover:text-brand-text transition-colors">L'Atelier</a>
          <a href="#contact" className="hover:text-brand-text transition-colors">Sur-Mesure</a>
        </nav>

        {/* Centered Brand Emblem */}
        <div className="flex-1 text-center md:flex-initial">
          <a href="#" className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-brand-text">
            Ma Montre Maroc
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/212645222009?text=Salam%20Ma Montre Maroc%2C%20je%20souhaite%20un%20rendez-vous%20privil%C3%A8ge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-brand-text border border-brand-border hover:border-brand-accent py-2 px-3 rounded-full bg-brand-surface transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-accent" />
            <span className="hidden sm:inline">Rendez-vous</span>
          </a>

          <a
            href="#catalogue"
            className="p-2 rounded-full bg-brand-surface border border-brand-border text-brand-text hover:border-brand-accent transition-colors relative"
          >
            <ShoppingBag className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
