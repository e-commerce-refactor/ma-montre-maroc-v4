'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Instagram, ShieldCheck, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-brand-border py-12 text-xs text-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-brand-text uppercase tracking-wider">
            Ma Montre Maroc
          </h3>
          <p className="text-xs font-light leading-relaxed">
            Storefront officiel optimisé pour le marché marocain. Paiement cash à la livraison avec contrôle qualité avant règlement.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-xs text-brand-text uppercase">Zones de Livraison</h4>
          <p>• Casablanca (Express 24h)</p>
          <p>• Rabat, Marrakech, Fès, Tanger (48h)</p>
          <p>• Toutes les autres villes du Royaume</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-xs text-brand-text uppercase">Contact & Support</h4>
          <p className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-brand-accent" />
            <span>+212 6 45 22 20 09</span>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-brand-accent" />
            <span>mamontre.ma@gmail.com</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>Casablanca, Maroc</span>
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-xs text-brand-text uppercase">Confiance & Sécurité</h4>
          <p className="flex items-center gap-2 text-emerald-500 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>0 DH d'avance requis</span>
          </p>
          <p className="text-[11px]">
            Conforme à la réglementation marocaine du commerce électronique.
          </p>
        </div>
      </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p>© 2026 Ma Montre Maroc. Tous droits réservés.</p>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-brand-muted hover:text-brand-accent transition-colors flex items-center gap-1 opacity-70 hover:opacity-100">
            <span>🔒</span> Espace Admin
          </Link>
          <p className="text-brand-muted/70">Propulsé par Next.js Edge & Supabase Maroc</p>
        </div>
      </div>
    </footer>
  );
}
