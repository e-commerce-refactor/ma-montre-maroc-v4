'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
}

export default function ProductGrid({ onSelectProduct }: ProductGridProps) {
  const categories = ['Tous', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered = activeCategory === 'Tous'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="catalogue" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-accent">
          Collection Officielle Maroc
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-text">
          Catalogue & Commandes Express
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto">
          Toutes nos pièces sont en stock physique au Maroc. Livraison rapide avec vérification et paiement à la réception.
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-accent text-white shadow-md'
                  : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
}
