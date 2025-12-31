
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, Heart, Share2, AlertCircle, MessageCircle, Facebook, Copy, Check, ZoomIn, ZoomOut, Star, StarHalf, MessageSquare, User } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../constants';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { getStylingAdvice } from '../../services/geminiService';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  // Product state
  const [selectedSize, setSelectedSize] = useState('M');
  const [stylingTips, setStylingTips] = useState<string>('');
  const [loadingTips, setLoadingTips] = useState(false);
  const [qty, setQty] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Review state
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', userName: 'Aarav M.', rating: 5, comment: 'Absolutely stunning quality. The silk feels incredibly premium and the fit is perfect for gala events.', date: '2023-11-15' },
    { id: '2', userName: 'Priya S.', rating: 4, comment: 'Beautiful piece! The color is slightly darker than the photos but I actually prefer it this way.', date: '2023-10-28' },
    { id: '3', userName: 'Vikram K.', rating: 5, comment: 'The best tailoring I have seen from an Indian brand in a long time. Highly recommend.', date: '2023-12-02' }
  ]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  // Zoom & Pan State
  const [isZoomed, setIsZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const product = INITIAL_PRODUCTS.find(p => p.id === id);
  const productImages = product?.images || (product?.image ? [product.image] : []);

  const resetZoom = useCallback(() => {
    setIsZoomed(false);
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    resetZoom();
  }, [productImages.length, resetZoom]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    resetZoom();
  }, [productImages.length, resetZoom]);

  // Synchronize thumbnail scroll position
  useEffect(() => {
    const activeThumb = scrollContainerRef.current?.children[currentImageIndex] as HTMLElement;
    if (activeThumb && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = activeThumb.offsetLeft - (container.offsetWidth / 2) + (activeThumb.offsetWidth / 2);
      const scrollTop = activeThumb.offsetTop - (container.offsetHeight / 2) + (activeThumb.offsetHeight / 2);
      
      container.scrollTo({
        left: scrollLeft,
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') resetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage, resetZoom]);

  useEffect(() => {
    if (product) window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!product) return <div className="max-w-7xl mx-auto px-6 py-20 text-center font-serif text-2xl">Product not found</div>;

  const currentSizeStock = product.sizeStock ? product.sizeStock[selectedSize] ?? 0 : product.stock;
  const isOutOfStock = currentSizeStock === 0;

  const handleGetStyling = async () => {
    setLoadingTips(true);
    const advice = await getStylingAdvice(product.name);
    setStylingTips(advice);
    setLoadingTips(false);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    // Check for double tap
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      if (isZoomed) {
        resetZoom();
      } else {
        const rect = imageContainerRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * -100;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -100;
        setOffset({ x, y });
        setIsZoomed(true);
      }
      setLastTap(0);
      return;
    }
    setLastTap(now);

    if (!isZoomed) return;
    
    // Start dragging logic
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    
    // Capture pointer to track movements even if finger leaves the container
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isZoomed) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Precise boundary clamping for 2.5x zoom
    const limit = 75; 
    const clampedX = Math.max(-limit, Math.min(limit, newX));
    const clampedY = Math.max(-limit, Math.min(limit, newY));
    
    setOffset({ x: clampedX, y: clampedY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      const target = e.target as HTMLElement;
      target.releasePointerCapture(e.pointerId);
    }
  };

  const toggleZoomManual = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isZoomed) resetZoom();
    else setIsZoomed(true);
  };

  const shareUrl = window.location.href;
  const shareText = `Check out this amazing ${product.name} from Koolraves!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: 'whatsapp' | 'facebook') => {
    let url = '';
    if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    }
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newComment || !reviewerName) return;

    const review: Review = {
      id: Date.now().toString(),
      userName: reviewerName,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewRating(0);
    setNewComment('');
    setReviewerName('');
    setIsReviewFormOpen(false);
  };

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-0 md:px-6 py-4 md:py-12 lg:py-20 animate-in fade-in duration-700 pb-32">
      <div className="px-4 md:px-0">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-slate-900 mb-6 md:mb-12 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Collection
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-start mb-24">
        {/* Gallery Section */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div 
            ref={scrollContainerRef}
            className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar py-2 px-4 lg:px-0 lg:max-h-[600px] order-2 lg:order-1"
          >
             {productImages.map((img, idx) => (
               <button 
                 key={idx}
                 onClick={() => { setCurrentImageIndex(idx); resetZoom(); }}
                 className={`flex-shrink-0 w-20 h-28 md:w-24 md:h-32 aspect-[3/4] overflow-hidden border-2 transition-all duration-300 rounded-sm ${
                   currentImageIndex === idx ? 'border-slate-900 ring-2 ring-slate-900/10' : 'border-transparent opacity-60'
                 }`}
               >
                 <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
               </button>
             ))}
          </div>

          <div 
            ref={imageContainerRef}
            className={`flex-1 relative aspect-[3/4] bg-slate-50 overflow-hidden order-1 lg:order-2 select-none transition-all duration-500 rounded-sm ${
              isZoomed ? 'cursor-grab' : 'cursor-zoom-in'
            } ${isDragging ? 'cursor-grabbing' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ touchAction: isZoomed ? 'none' : 'pan-y' }}
          >
              <div 
                className="w-full h-full relative"
                style={{
                  transform: `scale(${isZoomed ? 2.5 : 1}) translate(${offset.x / (isZoomed ? 2.5 : 1)}%, ${offset.y / (isZoomed ? 2.5 : 1)}%)`,
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {productImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      currentImageIndex === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    alt={product.name}
                    draggable={false}
                  />
                ))}
              </div>
              
              {/* Gallery Controls Overlay */}
              <div className={`absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                  className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full pointer-events-auto flex items-center justify-center shadow-lg text-slate-900 active:scale-90 transition-transform"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                  className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full pointer-events-auto flex items-center justify-center shadow-lg text-slate-900 active:scale-90 transition-transform"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Status Indicators */}
              <div className="absolute top-4 right-4 flex gap-2 z-10 pointer-events-none">
                <div className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {currentImageIndex + 1} / {productImages.length}
                </div>
                <button 
                  onClick={toggleZoomManual}
                  className={`bg-white/90 backdrop-blur-sm text-slate-900 p-1.5 rounded-full shadow-lg transition-transform duration-300 pointer-events-auto ${isZoomed ? 'scale-110' : 'scale-100'}`}
                >
                  {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                </button>
              </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-8 md:space-y-12 px-5 md:px-0 lg:sticky lg:top-32 h-fit">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{product.category}</span>
              <div className="flex gap-4 relative" ref={shareRef}>
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className={`p-2 rounded-full transition-colors ${showShareMenu ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  <Share2 size={20} strokeWidth={1.5}/>
                </button>
                
                {showShareMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-sm shadow-2xl border border-slate-100 p-2 z-[60] min-w-[180px] animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 space-y-1 border-b border-slate-50 mb-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Share This Piece</p>
                    </div>
                    <button 
                      onClick={() => handleSocialShare('whatsapp')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-sm transition-colors text-xs font-bold"
                    >
                      <MessageCircle size={16} /> WhatsApp
                    </button>
                    <button 
                      onClick={() => handleSocialShare('facebook')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-sm transition-colors text-xs font-bold"
                    >
                      <Facebook size={16} /> Facebook
                    </button>
                    <button 
                      onClick={handleCopyLink}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-sm transition-colors text-xs font-bold"
                    >
                      <div className="flex items-center gap-3">
                        <Copy size={16} /> Copy Link
                      </div>
                      {copied && <Check size={14} className="text-emerald-500" />}
                    </button>
                  </div>
                )}

                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`transition-all p-2 ${isInWishlist(product.id) ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
                >
                  <Heart size={22} fill={isInWishlist(product.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(Number(averageRating)) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{averageRating} / 5.0 ({reviews.length} Reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-2xl font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</p>
              <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-1 tracking-widest rounded-sm">Free Express Shipping</span>
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed text-sm md:text-base italic">
            {product.description} A masterpiece handcrafted with excellence, tailored for Indian sophistication.
          </p>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
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
                <button className="text-[9px] font-bold uppercase tracking-widest text-indigo-600 underline underline-offset-4">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['S', 'M', 'L', 'XL'].map(size => {
                  const sizeOos = product.sizeStock ? product.sizeStock[size] === 0 : false;
                  return (
                    <button 
                      key={size}
                      onClick={() => !sizeOos && setSelectedSize(size)}
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
              </div>
            </div>

            <div className="hidden md:flex flex-row gap-4 pt-4">
              <div className={`flex items-center border border-slate-100 bg-slate-50 rounded-sm px-4 h-16 ${isOutOfStock ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                <button onClick={() => setQty(Math.max(1, qty-1))} className="p-1 hover:text-indigo-600"><Minus size={16} /></button>
                <span className="w-10 text-center font-black text-sm">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="p-1 hover:text-indigo-600"><Plus size={16} /></button>
              </div>
              <button 
                onClick={() => !isOutOfStock && addToCart(product, selectedSize)}
                disabled={isOutOfStock}
                className={`flex-1 h-16 font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl transition-all ${
                  isOutOfStock 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                }`}
              >
                {isOutOfStock ? <><AlertCircle size={18} /> Out of Stock</> : <><ShoppingBag size={18} /> Add To Shopping Bag</>}
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

      {/* Reviews Section */}
      <section className="px-5 md:px-0 border-t border-slate-100 pt-16 md:pt-24 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif italic text-slate-900">Client Appraisals</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Genuine feedback from our discerning community</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
             <div className="flex items-center gap-3">
               <span className="text-3xl font-black text-slate-900">{averageRating}</span>
               <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(Number(averageRating)) ? "currentColor" : "none"} strokeWidth={1.5} />
                  ))}
               </div>
             </div>
             <button 
              onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 border-b border-indigo-600 pb-1 hover:text-indigo-800 hover:border-indigo-800 transition-all"
             >
               {isReviewFormOpen ? 'Cancel Review' : 'Add Your Appraisal'}
             </button>
          </div>
        </div>

        {/* Review Form */}
        {isReviewFormOpen && (
          <form onSubmit={handleSubmitReview} className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-sm border border-slate-100 space-y-8 animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Identity</label>
                <input 
                  type="text" 
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-white border-b border-slate-200 py-3 outline-none focus:border-indigo-600 transition-colors text-sm font-bold placeholder:text-slate-300 px-2"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Experience Rating</label>
                <div className="flex items-center gap-2 h-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="transition-transform active:scale-90"
                    >
                      <Star 
                        size={24} 
                        fill={(hoverRating || newRating) >= star ? "#fbbf24" : "none"} 
                        stroke={(hoverRating || newRating) >= star ? "#fbbf24" : "#cbd5e1"} 
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                  {newRating > 0 && <span className="ml-2 text-[10px] font-black text-amber-500 uppercase">{newRating}.0 / 5.0</span>}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Thoughts</label>
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your detailed experience with this piece..."
                rows={4}
                className="w-full bg-white border border-slate-100 rounded-sm p-4 outline-none focus:border-indigo-600 transition-colors text-sm font-medium placeholder:text-slate-300"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={newRating === 0 || !newComment || !reviewerName}
              className="w-full bg-slate-900 text-white py-4 font-black uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-slate-800 transition-all disabled:bg-slate-200"
            >
              Submit Appraisal
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-black text-xs">
                    {review.userName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-900">{review.userName}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Date(review.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium italic pl-1 border-l border-slate-100">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-16 md:hidden left-0 right-0 bg-white border-t border-slate-100 p-4 z-40 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
         <button 
           onClick={() => toggleWishlist(product)}
           className={`w-14 h-14 flex items-center justify-center border rounded-sm transition-all ${isInWishlist(product.id) ? 'bg-rose-50 border-rose-100 text-rose-500' : 'border-slate-100 text-slate-400'}`}
         >
           <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
         </button>
         <button 
           onClick={() => !isOutOfStock && addToCart(product, selectedSize)}
           disabled={isOutOfStock}
           className={`flex-1 font-black uppercase tracking-[0.2em] text-[10px] rounded-sm flex items-center justify-center gap-3 shadow-lg transition-all h-14 ${
             isOutOfStock 
               ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
               : 'bg-slate-900 text-white active:scale-95'
           }`}
         >
           {isOutOfStock ? 'Out of Stock' : <><ShoppingBag size={20} /> Add to Bag</>}
         </button>
      </div>
    </div>
  );
};

export default ProductDetail;
