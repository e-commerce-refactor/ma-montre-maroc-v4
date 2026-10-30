'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/lib/types';
import { PRODUCTS } from '@/data/products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState<number>(490);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(690);
  const [formCategory, setFormCategory] = useState('Principal');
  const [formImage, setFormImage] = useState('');
  const [formBadge, setFormBadge] = useState('Bestseller');
  const [formDescription, setFormDescription] = useState('');
  const [formInStock, setFormInStock] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setProducts(data as Product[]);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Fetch products notice:', err);
      }
    }
    const initialMapped: Product[] = PRODUCTS.map((p) => ({
      id: p.id,
      lead_id: 'Ma_Montre_Maroc',
      name: p.name,
      price_mad: p.priceMad,
      original_price_mad: p.originalPriceMad,
      category: p.category,
      image_url: p.image,
      badge: p.badge,
      in_stock: p.inStock,
      rating: p.rating,
      reviews_count: p.reviewsCount,
      description: p.description,
    }));
    setProducts(initialMapped);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormPrice(490);
    setFormOriginalPrice(690);
    setFormCategory('Collection Officielle');
    setFormImage('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800');
    setFormBadge('Nouveau');
    setFormDescription('Produit premium avec garantie et livraison COD partout au Maroc.');
    setFormInStock(true);
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormPrice(p.price_mad);
    setFormOriginalPrice(p.original_price_mad || p.price_mad);
    setFormCategory(p.category);
    setFormImage(p.image_url);
    setFormBadge(p.badge || '');
    setFormDescription(p.description || '');
    setFormInStock(p.in_stock);
    setModalOpen(true);
  };

  const handleToggleStock = async (p: Product) => {
    const updatedStock = !p.in_stock;
    setProducts((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, in_stock: updatedStock } : item))
    );
    if (supabase) {
      try {
        await supabase.from('products').update({ in_stock: updatedStock }).eq('id', p.id);
      } catch (err) {
        console.warn('Toggle stock notice:', err);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Voulez-vous supprimer ce produit du catalogue ?')) return;
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (supabase) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.warn('Delete product notice:', err);
      }
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName.trim(),
        price_mad: Number(formPrice),
        original_price_mad: Number(formOriginalPrice),
        category: formCategory.trim(),
        image_url: formImage.trim(),
        badge: formBadge.trim(),
        description: formDescription.trim(),
        in_stock: formInStock,
      };
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      if (supabase) {
        try {
          await supabase.from('products').update(updated).eq('id', updated.id);
        } catch (err) {
          console.warn('Update product notice:', err);
        }
      }
    } else {
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        lead_id: 'Ma_Montre_Maroc',
        name: formName.trim(),
        price_mad: Number(formPrice),
        original_price_mad: Number(formOriginalPrice),
        category: formCategory.trim(),
        image_url: formImage.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        badge: formBadge.trim(),
        description: formDescription.trim(),
        in_stock: formInStock,
        rating: 5.0,
        reviews_count: 1,
      };
      setProducts((prev) => [newProd, ...prev]);
      if (supabase) {
        try {
          await supabase.from('products').insert([newProd]);
        } catch (err) {
          console.warn('Insert product notice:', err);
        }
      }
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Gestion des Produits</h1>
          <p className="text-xs text-slate-400 mt-1">Catalogue officiel de Ma Montre Maroc</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-bold transition-all shadow-md shadow-brand-accent/25 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <span>+ Ajouter un Produit</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Article</th>
                <th className="py-3 px-3">Catégorie</th>
                <th className="py-3 px-3">Prix Vente</th>
                <th className="py-3 px-3">Disponibilité</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white text-xs">{p.name}</p>
                        {p.badge && (
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-brand-accent/15 text-brand-accent text-[10px] font-bold">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">{p.category}</td>
                  <td className="py-3.5 px-3 font-bold text-white whitespace-nowrap">
                    <span>{p.price_mad} DH</span>
                    {p.original_price_mad && p.original_price_mad > p.price_mad && (
                      <span className="ml-2 text-[11px] text-slate-500 line-through">
                        {p.original_price_mad} DH
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleToggleStock(p)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                        p.in_stock
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {p.in_stock ? '● En Stock' : '○ Rupture'}
                    </button>
                  </td>
                  <td className="py-3.5 px-3 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => openEditModal(p)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer text-xs"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="font-bold text-base text-white">
                {editingProduct ? 'Modifier le Produit' : 'Nouveau Produit au Catalogue'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Titre du produit *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Prix de vente (DH) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Prix barré (DH)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catégorie</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge promo</label>
                  <input
                    type="text"
                    placeholder="Bestseller, -30%..."
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL de l'image</label>
                <input
                  type="url"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formInStock}
                  onChange={(e) => setFormInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-accent focus:ring-brand-accent bg-slate-950 border-slate-800"
                />
                <label htmlFor="inStockCheck" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Produit immédiatement disponible en stock
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-bold"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
