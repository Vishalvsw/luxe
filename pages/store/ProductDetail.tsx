
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Sparkles, Loader2, ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, Heart, Share2, AlertCircle } from 'lucide-react';
=======
import { Sparkles, Loader2, ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, Heart, Share2 } from 'lucide-react';
>>>>>>> master
import { INITIAL_PRODUCTS } from '../../constants';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { getStylingAdvice } from '../../services/geminiService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('M');
  const [stylingTips, setStylingTips] = useState<string>('');
  const [loadingTips, setLoadingTips] = useState(false);
  const [qty, setQty] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transformOrigin: 'center center',
    transform: 'scale(1)'
  });

  const product = INITIAL_PRODUCTS.find(p => p.id === id);
  const productImages = product?.images || (product?.image ? [product.image] : []);

  const resetZoom = useCallback(() => {
    setZoomStyle({ transformOrigin: 'center center', transform: 'scale(1)' });
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    resetZoom();
  }, [productImages.length, resetZoom]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    resetZoom();
  }, [productImages.length, resetZoom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage]);

  useEffect(() => {
    if (product) window.scrollTo(0, 0);
  }, [product]);

  if (!product) return <div className="max-w-7xl mx-auto px-6 py-20 text-center font-serif text-2xl">Product not found</div>;

<<<<<<< HEAD
  const currentSizeStock = product.sizeStock ? product.sizeStock[selectedSize] ?? 0 : product.stock;
  const isOutOfStock = currentSizeStock === 0;

=======
>>>>>>> master
  const handleGetStyling = async () => {
    setLoadingTips(true);
    const advice = await getStylingAdvice(product.name);
    setStylingTips(advice);
    setLoadingTips(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(2)' });
  };

  return (
    <div className="max-w-7xl mx-auto px-0 md:px-6 py-4 md:py-12 lg:py-20 animate-in fade-in duration-700 pb-32">
      <div className="px-4 md:px-0">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-slate-900 mb-6 md:mb-12 transition-colors"
        >
          <ChevronLeft size={16} /> Collection
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
        {/* Gallery Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-6">
          <div className="hidden lg:flex lg:flex-col gap-4 overflow-y-auto lg:max-h-[600px] no-scrollbar py-2">
             {productImages.map((img, idx) => (
               <button 
                 key={idx}
                 onClick={() => { setCurrentImageIndex(idx); resetZoom(); }}
                 className={`flex-shrink-0 w-24 aspect-[3/4] overflow-hidden border-2 transition-all duration-300 ${
                   currentImageIndex === idx ? 'border-slate-900' : 'border-transparent opacity-50'
                 }`}
               >
                 <img src={img} className="w-full h-full object-cover" />
               </button>
             ))}
          </div>

          <div className="flex-1 relative aspect-[3/4] bg-slate-50 overflow-hidden">
              <div 
                className="w-full h-full relative cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={resetZoom}
              >
                {productImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    style={currentImageIndex === idx ? zoomStyle : {}}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      currentImageIndex === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none lg:px-6">
                <button onClick={prevImage} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full pointer-events-auto flex items-center justify-center lg:hidden shadow-lg text-slate-900">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImage} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full pointer-events-auto flex items-center justify-center lg:hidden shadow-lg text-slate-900">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-0.5 transition-all rounded-full ${
                      currentImageIndex === idx ? 'w-8 bg-slate-900' : 'w-4 bg-slate-900/20'
                    }`}
                  />
                ))}
              </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-8 md:space-y-12 px-5 md:px-0">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{product.category}</span>
              <div className="flex gap-4">
                <button className="text-slate-400 hover:text-slate-900 transition-colors"><Share2 size={20} strokeWidth={1.5}/></button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`transition-all ${isInWishlist(product.id) ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
                >
                  <Heart size={22} fill={isInWishlist(product.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</p>
              <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-1 tracking-widest">Free Express Shipping</span>
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed text-sm md:text-base italic">
            {product.description} A masterpiece handcrafted in Milano, tailored for Indian sophistication.
          </p>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
<<<<<<< HEAD
                <div className="flex items-center gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Select Size</label>
                  {isOutOfStock ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-sm">
                      <AlertCircle size={12} /> Out of Stock
                    </span>
                  ) : currentSizeStock < 5 ? (
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-sm">
                      Only {currentSizeStock} Left
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-sm">
                      In Stock
                    </span>
                  )}
                </div>
                <button className="text-[9px] font-bold uppercase tracking-widest text-indigo-600 underline underline-offset-4">Check My Size</button>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['S', 'M', 'L', 'XL'].map(size => {
                  const sizeOos = product.sizeStock ? product.sizeStock[size] === 0 : false;
                  return (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 min-w-[60px] h-12 md:h-14 rounded-sm border text-[11px] font-black transition-all relative overflow-hidden ${
                        selectedSize === size 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                          : sizeOos 
                            ? 'border-slate-100 text-slate-200 bg-slate-50 cursor-not-allowed'
                            : 'border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900'
                      }`}
                    >
                      {size}
                      {sizeOos && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 rotate-12 pointer-events-none">
                          <div className="w-full h-[1px] bg-rose-600" />
                        </div>
                      )}
                    </button>
                  );
                })}
=======
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Select Size</label>
                <button className="text-[9px] font-bold uppercase tracking-widest text-indigo-600 underline underline-offset-4">Check My Size</button>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 min-w-[60px] h-12 md:h-14 rounded-sm border text-[11px] font-black transition-all ${
                      selectedSize === size ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
>>>>>>> master
              </div>
            </div>

            <div className="hidden md:flex flex-row gap-4 pt-4">
<<<<<<< HEAD
              <div className={`flex items-center border border-slate-100 bg-slate-50 rounded-sm px-4 h-16 ${isOutOfStock ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
=======
              <div className="flex items-center border border-slate-100 bg-slate-50 rounded-sm px-4 h-16">
>>>>>>> master
                <button onClick={() => setQty(Math.max(1, qty-1))} className="p-1 hover:text-indigo-600"><Minus size={16} /></button>
                <span className="w-10 text-center font-black text-sm">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="p-1 hover:text-indigo-600"><Plus size={16} /></button>
              </div>
              <button 
<<<<<<< HEAD
                onClick={() => !isOutOfStock && addToCart(product, selectedSize)}
                disabled={isOutOfStock}
                className={`flex-1 h-16 font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl transition-all ${
                  isOutOfStock 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                }`}
              >
                {isOutOfStock ? <><AlertCircle size={18} /> Out of Stock</> : <><ShoppingBag size={18} /> Add To Shopping Bag</>}
=======
                onClick={() => addToCart(product, selectedSize)}
                disabled={product.stock === 0}
                className="flex-1 h-16 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                <ShoppingBag size={18} /> Add To Shopping Bag
>>>>>>> master
              </button>
            </div>
          </div>

          <div className="bg-slate-50 rounded-sm p-6 md:p-8 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-600" />
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">AI Stylist Insights</h4>
              </div>
              {!stylingTips && (
                <button onClick={handleGetStyling} disabled={loadingTips} className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800">
                  {loadingTips ? 'Crafting Suggestions...' : 'Request Styling'}
                </button>
              )}
            </div>
            {stylingTips && <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{stylingTips}</p>}
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-16 md:hidden left-0 right-0 bg-white border-t border-slate-100 p-4 z-40 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
         <button 
           onClick={() => toggleWishlist(product)}
           className={`w-14 h-14 flex items-center justify-center border rounded-sm transition-all ${isInWishlist(product.id) ? 'bg-rose-50 border-rose-100 text-rose-500' : 'border-slate-100 text-slate-400'}`}
         >
           <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
         </button>
         <button 
<<<<<<< HEAD
           onClick={() => !isOutOfStock && addToCart(product, selectedSize)}
           disabled={isOutOfStock}
           className={`flex-1 font-black uppercase tracking-[0.2em] text-[10px] rounded-sm flex items-center justify-center gap-3 shadow-lg transition-all ${
             isOutOfStock 
               ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
               : 'bg-slate-900 text-white active:scale-95'
           }`}
         >
           {isOutOfStock ? 'Out of Stock' : <><ShoppingBag size={20} /> Add to Bag</>}
=======
           onClick={() => addToCart(product, selectedSize)}
           disabled={product.stock === 0}
           className="flex-1 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-sm flex items-center justify-center gap-3 shadow-lg active:scale-95"
         >
           <ShoppingBag size={20} /> Add to Bag
>>>>>>> master
         </button>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ProductDetail;
=======
export default ProductDetail;
>>>>>>> master
