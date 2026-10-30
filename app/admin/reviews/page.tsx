'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Review } from '@/lib/types';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productName, setProductName] = useState('Ma Montre Maroc Original');

  const defaultReviews: Review[] = [
    {
      id: 'rev-1',
      lead_id: 'Ma_Montre_Maroc',
      author: 'Yassine M.',
      city: 'Casablanca',
      rating: 5,
      comment: 'Service impeccable ! Commande reçue en 24h à Casablanca, produit 100% conforme. Paiement à la livraison après vérification.',
      status: 'approved',
      verified_buyer: true,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'rev-2',
      lead_id: 'Ma_Montre_Maroc',
      author: 'Fatima-Zahra B.',
      city: 'Rabat',
      rating: 5,
      comment: 'Très satisfaite de la qualité. Excellente communication via WhatsApp pour la confirmation de livraison.',
      status: 'approved',
      verified_buyer: true,
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: 'rev-3',
      lead_id: 'Ma_Montre_Maroc',
      author: 'Mehdi K.',
      city: 'Tanger',
      rating: 4,
      comment: 'Livraison rapide en 48h à Tanger. Emballage soigné et produit de grande qualité.',
      status: 'pending',
      verified_buyer: true,
      created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
  ];

  const fetchReviews = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setReviews(data as Review[]);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Fetch reviews notice:', err);
      }
    }
    setReviews(defaultReviews);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Review['status']) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (supabase) {
      try {
        await supabase.from('reviews').update({ status: newStatus }).eq('id', id);
      } catch (err) {
        console.warn('Update review notice:', err);
      }
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Supprimer cet avis client ?')) return;
    setReviews((prev) => prev.filter((r) => r.id !== id));
    if (supabase) {
      try {
        await supabase.from('reviews').delete().eq('id', id);
      } catch (err) {
        console.warn('Delete review notice:', err);
      }
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      lead_id: 'Ma_Montre_Maroc',
      author: author.trim(),
      city: city.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      product_name: productName.trim(),
      status: 'approved',
      verified_buyer: true,
      created_at: new Date().toISOString(),
    };

    setReviews((prev) => [newRev, ...prev]);
    if (supabase) {
      try {
        await supabase.from('reviews').insert([newRev]);
      } catch (err) {
        console.warn('Insert review notice:', err);
      }
    }
    setModalOpen(false);
    setAuthor('');
    setComment('');
  };

  const filtered = reviews.filter((r) => filter === 'all' || r.status === filter);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Modération des Avis</h1>
          <p className="text-xs text-slate-400 mt-1">Gestion des témoignages et avis clients pour Ma Montre Maroc</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-bold transition-all shadow-md shadow-brand-accent/25 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <span>+ Ajouter un Avis Vérifié</span>
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 text-xs font-semibold">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              filter === st ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {st === 'all' ? 'Tous' : st === 'pending' ? 'En attente' : st === 'approved' ? 'Approuvés' : 'Rejetés'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <div key={r.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-white flex items-center gap-2">
                  <span>{r.author}</span>
                  {r.verified_buyer && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                      ✓ Acheteur Vérifié
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-slate-500">{r.city} • {new Date(r.created_at).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="flex text-amber-400 text-sm">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{r.comment}"
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                r.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : r.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {r.status === 'approved' ? '✓ En ligne sur le site' : r.status === 'pending' ? '⏳ En attente de validation' : '✕ Masqué'}
              </span>

              <div className="flex items-center gap-2">
                {r.status !== 'approved' && (
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'approved')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-[11px] font-semibold cursor-pointer"
                  >
                    Approuver
                  </button>
                )}
                {r.status !== 'rejected' && (
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'rejected')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 text-[11px] cursor-pointer"
                  >
                    Masquer
                  </button>
                )}
                <button
                  onClick={() => handleDeleteReview(r.id)}
                  className="px-2 py-1 rounded-lg text-rose-400 hover:bg-rose-500/10 text-[11px] cursor-pointer"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-base text-white mb-4">Ajouter un Avis Vérifié</h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nom du client *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="ex: Rachid B."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ville</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Note (sur 5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="5">★★★★★ (5/5)</option>
                    <option value="4">★★★★☆ (4/5)</option>
                    <option value="3">★★★☆☆ (3/5)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Commentaire d'expérience *</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Retour client WhatsApp ou témoignage vérifié..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-bold cursor-pointer"
                >
                  Publier l'avis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
