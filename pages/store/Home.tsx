
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Heart, Instagram as InstaIcon, MapPin } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../constants';
import { useWishlist } from '../../context/WishlistContext';

const Home = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const trendingProducts = INITIAL_PRODUCTS.slice(0, 4);
  const categories = [
    { name: 'Evening', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300' },
    { name: 'Knitwear', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300' },
    { name: 'Outerwear', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300' },
    { name: 'Linen', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300' }
  ];

  const instagramPosts = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
    'https://images.unsplash.com/photo-1539109132304-351deaed13ad?w=400',
    'https://images.unsplash.com/photo-1529139572765-3974d3cf160a?w=400',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400'
  ];

  return (
    <div className="space-y-0 animate-in fade-in duration-700 pb-20">
      {/* Hero Banner - Responsive Height & Content */}
      <section className="relative h-[65vh] md:h-[85vh] group overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          {/* Mobile vs Desktop Banners */}
          <picture>
            <source media="(max-width: 768px)" srcSet="https://images.unsplash.com/photo-1529139572765-3974d3cf160a?q=80&w=1000&auto=format&fit=crop" />
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
              alt="Luxury Collection"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex items-end md:items-center pb-12 md:pb-0">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
            <div className="max-w-2xl space-y-4 md:space-y-6 text-white">
              <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase">
                <span className="w-6 h-[1px] bg-white"></span>
                Winter Edit 2024
              </div>
              <h1 className="text-5xl md:text-8xl font-serif leading-none italic uppercase">Kool <br className="md:hidden"/> Indian Soul</h1>
              <p className="text-xs md:text-lg text-white/80 max-w-[280px] md:max-w-sm font-light leading-relaxed">Handcrafted excellence, perfectly tailored for the modern Indian lifestyle.</p>
              <div className="pt-4 md:pt-8">
                <Link to="/shop" className="group flex items-center justify-center md:justify-start gap-4 bg-white text-slate-900 px-8 py-4 md:py-5 rounded-sm font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-slate-100 transition-all w-full md:w-fit shadow-2xl">
                  Shop Festive Collection <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Scroller */}
      <section className="py-8 bg-white border-b border-slate-50 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between gap-6 md:gap-12 min-w-max">
          {categories.map((cat) => (
            <Link key={cat.name} to="/shop" className="flex flex-col items-center gap-3 group">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border border-slate-100 group-hover:border-indigo-600 transition-all p-0.5">
                <img src={cat.img} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-900 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 md:py-24 max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-4xl font-serif italic flex items-center gap-3">
              <Zap size={22} className="text-indigo-600 fill-indigo-600" />
              Trending In India
            </h2>
            <p className="text-slate-400 text-xs md:text-sm tracking-wide">Most-loved across Mumbai, Delhi & Bangalore.</p>
          </div>
          <Link to="/shop" className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 md:text-slate-900 border-b border-indigo-600 md:border-slate-900 pb-1">See All Picks</Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {trendingProducts.map((product) => (
            <div key={product.id} className="group space-y-3 block relative">
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-slate-50 relative rounded-sm">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                     <span className="bg-indigo-600 text-white px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest">Bestseller</span>
                  </div>
                </div>
              </Link>
              
              <button 
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all ${
                  isInWishlist(product.id) ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-900/40 hover:text-rose-500'
                }`}
              >
                <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} strokeWidth={1.5} />
              </button>

              <div className="space-y-1 px-1">
                <h3 className="text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-tight truncate">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] md:text-xs font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-[9px] text-indigo-600 font-bold tracking-tighter uppercase">SS'24 Choice</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Luxe On Social (Instagram Section) */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 space-y-10">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-indigo-600 mb-2">
              <InstaIcon size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Follow Us @KoolravesIn</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif italic uppercase">The Kool Edit</h2>
            <p className="text-slate-400 text-xs uppercase tracking-widest">Shop Our Feed For Daily Inspo</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 overflow-hidden rounded-xl">
             {instagramPosts.map((post, i) => (
               <div key={i} className="aspect-square overflow-hidden relative group cursor-pointer">
                  <img src={post} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Heart size={20} className="text-white fill-white" />
                  </div>
               </div>
             ))}
          </div>
          
          <div className="text-center pt-4">
            <button className="text-[10px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 hover:text-indigo-600 hover:border-indigo-600 transition-all">
              View Instagram Feed
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
