'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { StoreSettings } from '@/lib/types';

export default function AdminSettingsPage() {
  const [brandName, setBrandName] = useState('Ma Montre Maroc');
  const [waNumber, setWaNumber] = useState('+212 6 45 22 20 09');
  const [email, setEmail] = useState('mamontre.ma@gmail.com');
  const [shippingFee, setShippingFee] = useState(0);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(400);
  const [currencySymbol, setCurrencySymbol] = useState('DH');
  const [announcementText, setAnnouncementText] = useState('Livraison Express 24-48H Gratuite partout au Maroc • Paiement à la livraison');
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      if (supabase) {
        try {
          const { data } = await supabase
            .from('store_settings')
            .select('*')
            .eq('lead_id', 'Ma_Montre_Maroc')
            .maybeSingle();
          if (data) {
            setBrandName(data.brand_name || 'Ma Montre Maroc');
            setWaNumber(data.whatsapp_number || '+212 6 45 22 20 09');
            setEmail(data.contact_email || 'mamontre.ma@gmail.com');
            setShippingFee(data.shipping_fee || 0);
            setFreeShippingThreshold(data.free_shipping_threshold || 400);
            setCurrencySymbol(data.currency_symbol || 'DH');
            setAnnouncementText(data.announcement_text || '');
            setAnnouncementEnabled(data.announcement_enabled ?? true);
          }
        } catch (err) {
          console.warn('Load settings notice:', err);
        }
      }
    };
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const payload: StoreSettings = {
      lead_id: 'Ma_Montre_Maroc',
      brand_name: brandName,
      whatsapp_number: waNumber,
      contact_email: email,
      shipping_fee: Number(shippingFee),
      free_shipping_threshold: Number(freeShippingThreshold),
      currency_symbol: currencySymbol,
      announcement_text: announcementText,
      announcement_enabled: announcementEnabled,
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        await supabase.from('store_settings').upsert(payload, { onConflict: 'lead_id' });
      } catch (err) {
        console.warn('Save settings notice:', err);
      }
    }

    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Paramètres de la Boutique</h1>
        <p className="text-xs text-slate-400 mt-1">Configuration générale, règles de livraison COD et WhatsApp</p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <span>✓</span> Paramètres enregistrés avec succès !
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Coordonnées */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
            Coordonnées & Service Client
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nom de la marque</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Numéro WhatsApp Business (COD)</label>
              <input
                type="text"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                placeholder="+2126XXXXXXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent font-mono"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email de contact</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Règles COD */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
            Paiement Cash à la Livraison & Expédition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Frais de port standard (DH)</label>
              <input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Seuil livraison gratuite (DH)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Symbole monétaire</label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bannière promotionnelle */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
              Ruban d'Annonce Storefront
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-brand-accent focus:ring-brand-accent bg-slate-950 border-slate-800"
              />
              <span className="text-xs text-slate-300">Actif sur le site</span>
            </label>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Texte de l'annonce</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-bold transition-all shadow-lg shadow-brand-accent/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
}
