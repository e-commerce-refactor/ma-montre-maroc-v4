'use client';

import React from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';

interface OrderSuccessModalProps {
  orderInfo: any;
  onClose: () => void;
}

export default function OrderSuccessModal({ orderInfo, onClose }: OrderSuccessModalProps) {
  if (!orderInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-brand-surface border border-brand-border p-6 shadow-2xl text-center space-y-4">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-brand-muted hover:text-brand-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-brand-text">Commande Enregistrée !</h2>
          <p className="text-xs text-brand-muted">
            Merci <strong>{orderInfo.customer_name}</strong>. Notre équipe va vous contacter au <strong>{orderInfo.phone}</strong> avant expédition.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border text-left space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-brand-muted">Produit :</span>
            <span className="font-bold text-brand-text truncate max-w-[200px]">{orderInfo.product_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-muted">Ville :</span>
            <span className="font-bold text-brand-text">{orderInfo.city}</span>
          </div>
          <div className="flex justify-between border-t border-brand-border pt-1.5">
            <span className="text-brand-muted">Total à payer :</span>
            <span className="font-black text-brand-accent">{orderInfo.total_amount} DH (Espèces)</span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={`https://wa.me/212645222009?text=${encodeURIComponent(`Salam Ma Montre Maroc, je viens de passer commande pour ${orderInfo.product_name} (Total: ${orderInfo.total_amount} DH) pour ${orderInfo.customer_name} à ${orderInfo.city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Accélérer ma Commande sur WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
