import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import type { Product } from '../data/data';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-stone-100 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm">
          {product.price}
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-xs font-medium text-rose-500 uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-sm font-bold text-stone-900 line-clamp-2 mb-2 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-4">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="ml-1 text-xs text-stone-500 font-medium">{product.rating}</span>
          <span className="mx-1 text-stone-300">•</span>
          <span className="text-xs text-stone-400">{product.reviews} reviews</span>
        </div>
        
        <div className="flex gap-2">
          {product.affiliateLinks.amazon && (
            <a 
              href={product.affiliateLinks.amazon} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-3 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
            >
              Amazon <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
