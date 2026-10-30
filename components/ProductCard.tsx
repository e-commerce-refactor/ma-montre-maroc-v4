'use client';

import React from 'react';
import { ShoppingBag, MessageCircle, Cpu, ShieldCheck } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-brand-surface border border-brand-border p-4 flex flex-col justify-between space-y-4 font-mono shadow-sm hover:border-brand-accent transition-colors">
      <div className="relative aspect-video bg-brand-bg rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-brand-accent text-brand-bg">
            {product.badge}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <span className="text-[10px] text-brand-muted uppercase font-bold">{product.category}</span>
        <h3 className="font-bold text-sm text-brand-text">{product.name}</h3>
        <p className="text-xs text-brand-muted line-clamp-2">{product.description}</p>

        {/* Specs pill strip */}
        {product.specs && Object.keys(product.specs).length > 0 ? (
          <div className="p-2 rounded bg-brand-bg border border-brand-border text-[10px] text-brand-muted flex justify-between flex-wrap gap-1">
            {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
              <span key={k} className="uppercase font-medium">{k}: {v}</span>
            ))}
          </div>
        ) : (
          <div className="p-2 rounded bg-brand-bg border border-brand-border text-[10px] text-brand-muted flex justify-between">
            <span>CERTIFIÉ AUTHENTIQUE</span>
            <span>GARANTIE INCLUSE</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-brand-border flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-brand-accent">{product.priceMad} DH</span>
          {product.originalPriceMad && (
            <span className="text-xs text-brand-muted line-through ml-2">{product.originalPriceMad} DH</span>
          )}
        </div>
        <button
          onClick={() => onSelect(product)}
          className="py-2 px-4 bg-brand-accent text-brand-bg text-xs font-bold uppercase rounded hover:brightness-110 transition-all flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Commander</span>
        </button>
      </div>
    </div>
  );
}
