
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Heart, SlidersHorizontal, X, Check } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../constants';
import { useWishlist } from '../../context/WishlistContext';

const Shop = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Recommended');
  
  const categories = ['All', 'Evening Wear', 'Knitwear', 'Outerwear', 'Essentials'];
  const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest First'];

  const filteredProducts = activeCategory === 'All' 
    ? INITIAL_PRODUCTS 
    : INITIAL_PRODUCTS.filter(p => p.category === activeCategory);

  // Simple sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0; // Default Recommended
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6 md:space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-slate-900">All Collections</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif italic text-slate-900">
          The Kool Catalog <span className="text-slate-300 font-sans not-italic text-sm">({sortedProducts.length})</span>
        </h1>
      </div>

      {/* Filter Bar - Desktop & Quick Access Mobile */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md -mx-4 px-4 py-4 border-y border-slate-100 flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 mr-4">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[9px] uppercase font-bold tracking-widest px-6 py-2.5 transition-all rounded-full border flex-shrink-0 ${
                activeCategory === cat 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                  : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-6">
           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900">
             <span className="text-slate-400">Sort By:</span>
             <select 
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
               className="bg-transparent border-none focus:ring-0 cursor-pointer text-slate-900 font-black"
             >
               {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
             </select>
           </div>
        </div>

        <button 
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900 bg-slate-50 px-4 py-2.5 rounded-full border border-slate-200"
        >
          <SlidersHorizontal size={14} /> Filter
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10">
        {sortedProducts.map((product) => (
          <div key={product.id} className="group block relative space-y-3">
            <Link to={`/product/${product.id}`} className="block">
              <div className="aspect-[3/4] overflow-hidden bg-slate-50 relative rounded-sm">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={product.name}
                />
                <div className="absolute top-2 left-2">
                   <div className="bg-white/90 backdrop-blur px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest shadow-sm">Kool Choice</div>
                </div>
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1.5px] flex items-center justify-center">
                    <span className="text-[9px] uppercase font-black tracking-widest text-slate-900 bg-white px-4 py-1.5 border border-slate-900 shadow-xl">Notify Me</span>
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
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsFilterOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-black uppercase tracking-[0.2em] text-slate-900">Filter & Sort</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 -mr-2"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-10">
              {/* Category Section */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Categories</h4>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold transition-all ${
                        activeCategory === cat ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      {cat}
                      {activeCategory === cat && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Section */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sort By</h4>
                <div className="grid grid-cols-1 gap-2">
                  {sortOptions.map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold transition-all ${
                        sortBy === opt ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      {opt}
                      {sortBy === opt && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-slate-900 text-white py-4 rounded-sm font-black uppercase tracking-widest text-[11px] shadow-xl active:scale-95 transition-all"
              >
                Apply Filters
              </button>
              <button 
                onClick={() => { setActiveCategory('All'); setSortBy('Recommended'); }}
                className="w-full mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
