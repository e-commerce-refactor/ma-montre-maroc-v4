'use client';

import React from 'react';
import { Check, X, Shield } from 'lucide-react';

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-14 bg-brand-surface/60 border-t border-brand-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-mono text-brand-accent uppercase">[BENCHMARK & SPECS]</span>
          <h2 className="text-2xl font-bold text-brand-text font-mono">Comparatif de Gamme & Performances</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-bg">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-brand-surface border-b border-brand-border text-brand-muted uppercase">
              <tr>
                <th className="p-4">Caractéristique</th>
                <th className="p-4 text-center">Modèle Standard</th>
                <th className="p-4 text-center text-brand-accent">Édition Pro (Notre Choix)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-text">
              <tr>
                <td className="p-4 font-bold">Capteur Optique</td>
                <td className="p-4 text-center text-brand-muted">1080p Standard</td>
                <td className="p-4 text-center text-emerald-400 font-bold">4K Sony Starvis 2</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Surveillance Parking 24/7</td>
                <td className="p-4 text-center text-brand-muted">Optionnelle</td>
                <td className="p-4 text-center text-emerald-400 font-bold">Incluse avec Câble Hardwire</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Garantie Maroc</td>
                <td className="p-4 text-center text-brand-muted">6 Mois</td>
                <td className="p-4 text-center text-emerald-400 font-bold">2 Ans Échange à Neuf</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Paiement à la Livraison</td>
                <td className="p-4 text-center text-emerald-400 font-bold">Oui (0 DH)</td>
                <td className="p-4 text-center text-emerald-400 font-bold">Oui (0 DH)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
