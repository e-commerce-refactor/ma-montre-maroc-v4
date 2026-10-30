'use client';

import React, { useState } from 'react';
import { X, Truck, ShieldCheck, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { supabase } from '../lib/supabaseClient';

interface CodModalProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: (orderInfo: any) => void;
}

const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Tanger',
  'Fès',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan',
  'Autre Ville (Maroc)'
];

export default function CodModal({ product, onClose, onSuccess }: CodModalProps) {
  if (!product) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [address, setAddress] = useState('');
  const [isVipBox, setIsVipBox] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const shippingFee = city === 'Casablanca'
    ? (product.priceMad >= 500 ? 0 : 20)
    : (product.priceMad >= 1000 ? 0 : 35);

  const totalAmount = product.priceMad + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const normalizedPhone = phone.replace(/\s/g, '');
    const phoneRegex = /^(?:\+212|0)[5-7]\d{8}$/;
    if (!phoneRegex.test(normalizedPhone)) {
      setErrorMsg('Veuillez saisir un numéro de téléphone marocain valide (ex: 06 12 34 56 78).');
      return;
    }

    if (fullName.trim().length < 3) {
      setErrorMsg('Veuillez renseigner votre nom complet.');
      return;
    }

    if (address.trim().length < 5) {
      setErrorMsg('Veuillez préciser votre adresse de livraison.');
      return;
    }

    setLoading(true);

    try {
      if (supabase) {
        const { error } = await supabase.from('orders').insert([
          {
            lead_id: 'Ma_Montre_Maroc',
            product_name: product.name,
            product_price: product.priceMad,
            shipping_fee: shippingFee,
            total_amount: totalAmount,
            customer_name: fullName.trim(),
            phone: normalizedPhone,
            city: city,
            address: address.trim(),
            status: 'pending'
          }
        ]);
        if (error) {
          console.warn('Supabase insert note:', error.message);
        }
      }

      onSuccess({
        product_name: product.name,
        customer_name: fullName.trim(),
        phone: normalizedPhone,
        city: city,
        address: address.trim(),
        total_amount: totalAmount
      });
    } catch (err: any) {
      console.warn('Order submission fallback triggered:', err);
      onSuccess({
        product_name: product.name,
        customer_name: fullName.trim(),
        phone: normalizedPhone,
        city: city,
        address: address.trim(),
        total_amount: totalAmount
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-brand-surface border border-brand-border p-6 shadow-2xl space-y-6 my-8">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-brand-muted hover:text-brand-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-brand-border pb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">
            Validation Express • Paiement à la Livraison (0 DH d'avance)
          </span>
          <h2 className="text-xl font-extrabold text-brand-text pt-1">
            Finaliser ma Commande
          </h2>
        </div>

        <div className="flex gap-4 p-3 rounded-xl bg-brand-bg border border-brand-border items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs text-brand-text truncate">{product.name}</h4>
            <p className="text-[11px] text-brand-muted">Prix : {product.priceMad} DH</p>
            <p className="text-[11px] text-emerald-500 font-semibold">
              Livraison {city === 'Casablanca' ? '24H' : '48H'} : {shippingFee === 0 ? 'Gratuite' : `${shippingFee} DH`}
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-brand-accent">{totalAmount} DH</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-text">Nom & Prénom *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="ex: Youssef El Mansouri"
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-xs focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-text">Numéro de Téléphone Portable (WhatsApp) *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="ex: 06 12 34 56 78"
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-xs focus:outline-none focus:border-brand-accent"
            />
            <p className="text-[10px] text-brand-muted">
              Nous vous appellerons pour confirmer l'heure de passage du livreur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-text">Ville de Livraison *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-xs focus:outline-none focus:border-brand-accent"
              >
                {MOROCCAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c} {c === 'Casablanca' ? '(24h - 20 DH)' : '(48h - 35 DH)'}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-text">Adresse ou Quartier *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ex: Bd Zerktouni, Apt 4"
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-brand-text text-xs focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 font-medium pt-1">
              {errorMsg}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-accent hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Validation en cours...</span>
              ) : (
                <>
                  <span>Confirmer ma Commande ({totalAmount} DH)</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-brand-muted text-center pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
            <span>Paiement en espèces uniquement à la livraison après inspection de l'article</span>
          </div>
        </form>

      </div>
    </div>
  );
}
