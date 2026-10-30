'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Order } from '@/lib/types';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'delivered' | 'cancelled'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fallback demo orders if database is fresh
  const sampleOrders: Order[] = [
    {
      id: 'ord-101',
      lead_id: 'Ma_Montre_Maroc',
      product_name: 'Pack Vedette COD Express',
      product_price: 690,
      shipping_fee: 0,
      total_amount: 690,
      customer_name: 'Amine Bennani',
      phone: '+212661234567',
      city: 'Casablanca',
      address: 'Quartier Gauthier, Rue Jules César',
      status: 'pending',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'ord-102',
      lead_id: 'Ma_Montre_Maroc',
      product_name: 'Édition Prestige Exclusive',
      product_price: 1250,
      shipping_fee: 0,
      total_amount: 1250,
      customer_name: 'Kawtar El Fassi',
      phone: '+212663987654',
      city: 'Rabat',
      address: 'Agdal, Avenue de France',
      status: 'confirmed',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'ord-103',
      lead_id: 'Ma_Montre_Maroc',
      product_name: 'Accessoire Signature',
      product_price: 390,
      shipping_fee: 35,
      total_amount: 425,
      customer_name: 'Omar Tazi',
      phone: '+212665112233',
      city: 'Marrakech',
      address: 'Guéliz, Bd Mohamed V',
      status: 'delivered',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const fetchOrders = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setOrders(data as Order[]);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Fetch orders notice:', err);
      }
    }
    setOrders(sampleOrders);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    setUpdatingId(orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    if (supabase) {
      try {
        await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      } catch (err) {
        console.warn('Update order status notice:', err);
      }
    }
    setUpdatingId(null);
  };

  const openWhatsAppConfirmation = (order: Order) => {
    const cleanPhone = order.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('0') ? '212' + cleanPhone.slice(1) : cleanPhone;
    const msg = `Bonjour ${order.customer_name}, c'est l'équipe Ma Montre Maroc. Nous préparons votre commande de ${order.product_name} pour livraison à ${order.city} (Montant à régler à la livraison: ${order.total_amount} DH). Confirmez-vous l'envoi ? Merci !`;
    window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm) ||
      o.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter((o) => o.status === 'confirmed' || o.status === 'delivered')
    .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const confirmedCount = orders.filter((o) => o.status === 'confirmed' || o.status === 'delivered').length;

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Tableau de Bord</h1>
          <p className="text-xs text-slate-400 mt-1">Supervision des ventes et validation des commandes COD</p>
        </div>
        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Actualiser</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold">Chiffre d'Affaires COD</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs">DH</span>
          </div>
          <p className="text-2xl font-black text-white">{totalRevenue.toLocaleString()} DH</p>
          <p className="text-[11px] text-slate-500 mt-1">Commandes confirmées & livrées</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold">Total Commandes</span>
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 text-xs">🛍️</span>
          </div>
          <p className="text-2xl font-black text-white">{orders.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Flux global du storefront</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold">À Confirmer (En attente)</span>
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold">⏳</span>
          </div>
          <p className="text-2xl font-black text-amber-400">{pendingCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Appel ou WhatsApp requis</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold">Confirmées / Livrées</span>
            <span className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent text-xs">🚚</span>
          </div>
          <p className="text-2xl font-black text-white">{confirmedCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Prêts pour le coursier</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Gestion des Commandes COD</h2>
            <p className="text-xs text-slate-400">Cliquez sur le bouton WhatsApp pour contacter le client en 1 clic</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher nom, ville, tel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-56 px-3.5 py-2 pl-9 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-accent"
              />
              <svg className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-semibold">
              {(['all', 'pending', 'confirmed', 'delivered'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === st ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st === 'all' ? 'Toutes' : st === 'pending' ? 'En attente' : st === 'confirmed' ? 'Confirmées' : 'Livrées'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Téléphone & Ville</th>
                <th className="py-3 px-3">Produit</th>
                <th className="py-3 px-3">Total (DH)</th>
                <th className="py-3 px-3">Statut COD</th>
                <th className="py-3 px-3 text-right">Action Rapide</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Aucune commande trouvée.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-white">{order.customer_name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{order.address}</p>
                    </td>
                    <td className="py-3.5 px-3">
                      <a
                        href={`tel:${order.phone}`}
                        className="text-brand-accent hover:underline font-mono text-xs"
                      >
                        {order.phone}
                      </a>
                      <p className="text-[11px] text-slate-400">{order.city}</p>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300 font-medium">
                      {order.product_name}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-white whitespace-nowrap">
                      {order.total_amount} DH
                    </td>
                    <td className="py-3.5 px-3">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none cursor-pointer ${
                          order.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : order.status === 'confirmed'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : order.status === 'delivered'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        <option value="pending" className="bg-slate-900 text-white">En attente</option>
                        <option value="confirmed" className="bg-slate-900 text-white">Confirmée</option>
                        <option value="delivered" className="bg-slate-900 text-white">Livrée</option>
                        <option value="cancelled" className="bg-slate-900 text-white">Annulée</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => openWhatsAppConfirmation(order)}
                        title="Ouvrir WhatsApp avec message pré-rempli"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all inline-flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 cursor-pointer"
                      >
                        <span>💬 WhatsApp</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
