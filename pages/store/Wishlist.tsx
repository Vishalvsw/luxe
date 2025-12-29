
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-500">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Wishlist</span>
        </div>
        <h1 className="text-4xl font-serif italic">My Wishlist <span className="text-slate-300 font-sans not-italic text-lg">({wishlist.length})</span></h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
            <Heart size={48} strokeWidth={1} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-serif">Your wishlist is empty</h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">Save items that you love to your wishlist. Revisit them anytime and easily add them to your bag.</p>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all">
            Start Shopping <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {wishlist.map((product) => (
            <div key={product.id} className="group block space-y-4">
              <div className="aspect-[3/4] overflow-hidden bg-slate-50 relative">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </Link>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-rose-500 hover:scale-110 transition-transform"
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">{product.name}</h3>
                    <span className="text-xs font-bold text-slate-900">${product.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{product.category}</p>
                </div>
                <button 
                  onClick={() => addToCart(product, 'M')}
                  className="w-full bg-slate-900 text-white py-3 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
