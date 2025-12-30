
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Sparkles,
  Loader2,
  Trash2,
  Edit,
  ShoppingBag
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../constants';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';

const Products = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleAIDescription = async (product: Product) => {
    setIsGenerating(product.id);
    const description = await generateProductDescription(
      product.name, 
      product.category, 
      ['luxury', 'sustainable', 'exclusive', 'premium quality']
    );
    
    setProducts(prev => prev.map(p => 
      p.id === product.id ? { ...p, description } : p
    ));
    setIsGenerating(null);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Inventory</h1>
          <p className="text-slate-500 mt-1">Manage your clothing items and stock levels.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search catalog..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <select className="flex-1 md:flex-none bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium px-4 py-2 outline-none">
            <option>All Categories</option>
            <option>Dresses</option>
            <option>Knitwear</option>
            <option>Footwear</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-6 hover:border-indigo-200 transition-colors group relative">
            <div className="w-full lg:w-48 h-64 lg:h-48 overflow-hidden rounded-xl bg-slate-100 flex-shrink-0 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                  product.status === 'Published' ? 'bg-white/90 text-emerald-600 border-emerald-100' :
                  product.status === 'Out of Stock' ? 'bg-white/90 text-rose-600 border-rose-100' :
                  'bg-white/90 text-slate-600 border-slate-100'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{product.category}</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{product.name}</h3>
                  </div>
                  <p className="text-2xl font-serif font-bold text-slate-900">${product.price}</p>
                </div>
                <div className="relative group/desc">
                  <p className="text-slate-500 text-sm leading-relaxed max-w-2xl italic">
                    {product.description || "No description provided."}
                  </p>
                  <button 
                    onClick={() => handleAIDescription(product)}
                    disabled={isGenerating === product.id}
                    className="mt-2 flex items-center gap-1.5 text-indigo-600 text-xs font-bold hover:text-indigo-800 transition-colors disabled:opacity-50"
                  >
                    {isGenerating === product.id ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        AI Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={12} />
                        Improve with AI
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-400">ID:</span>
                  <span className="text-xs font-bold text-slate-900">{product.id}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-400">Stock:</span>
                  <span className={`text-xs font-bold ${product.stock < 10 ? 'text-rose-600' : 'text-slate-900'}`}>{product.stock} units</span>
                </div>
                <div className="flex-1 flex justify-end gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
              {/* Fixed: ShoppingBag is now imported */}
              <ShoppingBag size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No products found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
