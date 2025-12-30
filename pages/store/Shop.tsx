
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Heart, SlidersHorizontal } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../constants';
import { useWishlist } from '../../context/WishlistContext';

const Shop = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Evening Wear', 'Knitwear', 'Footwear', 'Outerwear', 'Essentials'];

  const filteredProducts = activeCategory === 'All' 
    ? INITIAL_PRODUCTS 
    : INITIAL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6 md:space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-900">All Collections</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif italic">The Luxe Catalog <span className="text-slate-300 font-sans not-italic text-sm">({filteredProducts.length})</span></h1>
      </div>

      {/* Mobile Sticky Filter/Category Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md -mx-4 px-4 py-4 border-y border-slate-50 flex flex-col gap-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[9px] uppercase font-bold tracking-widest px-6 py-2.5 transition-all rounded-full border flex-shrink-0 ${
                activeCategory === cat ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center md:hidden border-t border-slate-50 pt-3">
           <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900">
             <SlidersHorizontal size={14} /> Refine Results
           </button>
           <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900">
             Sort: Recommended <ChevronDown size={14} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group block relative space-y-3">
            <Link to={`/product/${product.id}`} className="block">
              <div className="aspect-[3/4] overflow-hidden bg-slate-50 relative rounded-sm">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-2 left-2">
                   <div className="bg-white/90 backdrop-blur px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest shadow-sm">Premium</div>
                </div>
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1.5px] flex items-center justify-center">
                    <span className="text-[9px] uppercase font-black tracking-widest text-slate-900 bg-white px-4 py-1.5 border border-slate-900 shadow-xl">Waitlist Only</span>
                  </div>
                )}
              </div>
            </Link>
            
            <button 
              onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
              className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all ${
                isInWishlist(product.id) ? 'bg-white text-rose-500 shadow-md scale-110' : 'text-slate-900/20 hover:text-rose-400'
              }`}
            >
              <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>

            <div className="space-y-1 px-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                <span className="text-[10px] md:text-xs font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-medium">{product.category}</p>
              <div className="flex gap-1.5 pt-1.5 opacity-40">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-200" />
                 <div className="w-2.5 h-2.5 rounded-full bg-indigo-50 border border-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
