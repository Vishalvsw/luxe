
import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Instagram, Heart, User, Home, Grid, MapPin, Check, MapPinned } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const StorefrontLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cartCount, cart, removeFromCart, cartTotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoggedIn, updateLocation } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [tempCity, setTempCity] = useState(user?.city || '');
  const [tempPincode, setTempPincode] = useState(user?.pincode || '');
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSaveLocation = () => {
    if (tempCity && tempPincode) {
      updateLocation(tempCity, tempPincode);
      setIsLocationModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pb-16 md:pb-0">
      {/* Top Banner */}
      <div className="hidden md:block bg-slate-900 text-white text-[10px] py-2 text-center font-bold tracking-[0.2em] uppercase">
        Free Express Delivery Across India on Orders Above ₹5000
      </div>

      {/* Primary Header - Sticky */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <button className="lg:hidden p-1" onClick={() => setIsMenuOpen(true)}>
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <Link to="/" className="text-xl md:text-2xl font-serif font-black tracking-tighter text-slate-900 uppercase">
              KOOL<span className="text-indigo-600">RAVES</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-slate-900">
              <NavLink to="/shop" className="hover:text-indigo-600 transition-colors">New Arrivals</NavLink>
              <NavLink to="/shop" className="hover:text-indigo-600 transition-colors">Collections</NavLink>
              <NavLink to="/shop" className="text-rose-600 hover:text-rose-700 font-black">Archive Sale</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
            {/* Location Selector */}
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors mr-4 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100"
            >
              <MapPin size={14} className="text-indigo-600" />
              <span className="max-w-[120px] truncate">Deliver to: {isLoggedIn ? user?.city : (user?.city || 'Select Location')}</span>
            </button>

            <div className="hidden md:flex items-center bg-slate-50 rounded-full px-4 py-2 w-full max-w-xs transition-all focus-within:ring-1 focus-within:ring-slate-200">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search trends..." 
                className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-full outline-none text-slate-600 font-medium"
              />
            </div>
            
            <div className="flex items-center gap-3 md:gap-5 text-slate-700">
              <button className="md:hidden hover:text-indigo-600 p-1"><Search size={22} strokeWidth={1.5} /></button>
              <Link to="/admin" className="hidden lg:block text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900">Admin</Link>
              <Link to="/wishlist" className="hidden md:flex relative hover:text-indigo-600 transition-colors">
                <Heart size={20} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button onClick={() => navigate('/login')} className="hidden md:block hover:text-indigo-600">
                <User size={20} strokeWidth={1.5} />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="relative hover:text-indigo-600 p-1">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Delivery Bar */}
        <button 
          onClick={() => setIsLocationModalOpen(true)}
          className="md:hidden w-full bg-indigo-50 px-4 py-1.5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-indigo-700 border-t border-indigo-100"
        >
          <MapPin size={12} />
          <span>Delivering to {user?.city ? `${user.city}, ${user.pincode}` : 'India'} • <span className="underline">Change</span></span>
        </button>
      </nav>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLocationModalOpen(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-sm shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2 mb-8">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinned size={24} />
              </div>
              <h3 className="text-lg font-serif italic uppercase tracking-wider text-slate-900">Select Delivery Location</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Update your address for accurate delivery times</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500">City</label>
                <input 
                  type="text" 
                  value={tempCity}
                  onChange={(e) => setTempCity(e.target.value)}
                  placeholder="e.g. Mumbai, Delhi"
                  className="w-full border-b border-slate-200 py-2 outline-none focus:border-indigo-600 text-sm font-bold text-slate-900 placeholder:text-slate-300 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Pincode</label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="6 Digit Pincode"
                  className="w-full border-b border-slate-200 py-2 outline-none focus:border-indigo-600 text-sm font-bold text-slate-900 placeholder:text-slate-300 transition-colors tracking-[0.2em]"
                />
              </div>
              <button 
                onClick={handleSaveLocation}
                disabled={!tempCity || tempPincode.length !== 6}
                className="w-full bg-slate-900 text-white py-4 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] disabled:bg-slate-200 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Confirm Location <Check size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 h-16 z-[60] flex items-center justify-around md:hidden px-4 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Home size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Home</span>
        </NavLink>
        <NavLink to="/shop" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Grid size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Explore</span>
        </NavLink>
        <NavLink to="/wishlist" className={({isActive}) => `flex flex-col items-center gap-1 relative ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Heart size={20} />
          {wishlistCount > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />}
          <span className="text-[9px] font-bold uppercase tracking-tighter">Wishlist</span>
        </NavLink>
        <button onClick={() => navigate('/login')} className="flex flex-col items-center gap-1 text-slate-400">
          <User size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">{isLoggedIn ? 'Account' : 'Login'}</span>
        </button>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8 md:pb-12 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 text-center md:text-left">
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <h2 className="font-serif font-black text-2xl tracking-tighter uppercase text-slate-900">KOOLRAVES</h2>
            <div className="space-y-2">
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-medium italic">
                India's premier destination for high-end sustainable fashion. Handcrafted excellence, Loved in India.
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                Sponsored by KRK VINTRADE PRIVATE LIMITED (KOOLRAVES)
              </p>
            </div>
            <div className="flex justify-center md:justify-start gap-6">
              <Instagram size={22} className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
              <div className="w-6 h-6 bg-slate-100 rounded-full cursor-pointer hover:bg-indigo-50 transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 md:mb-6 text-slate-900">Customer Care</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">Exchange & Returns</a></li>
                <li><a href="#" className="hover:text-indigo-600">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Track My Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 md:mb-6 text-slate-900">Headquarters</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[180px] mx-auto md:mx-0">
                A-2867, Ground Floor,<br />
                Green Fields Colony,<br />
                Faridabad, Haryana-121010
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 md:mb-6 text-slate-900">The Brand</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><Link to="/shop" className="hover:text-indigo-600">Our Story</Link></li>
                <li><Link to="/shop" className="hover:text-indigo-600">Careers</Link></li>
                <li><Link to="/shop" className="hover:text-indigo-600">Sustainability</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between text-[9px] uppercase tracking-widest text-slate-400 font-bold items-center text-center">
          <p>© 2026 KOOLRAVES INDIA PVT LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-slate-900">Privacy</span>
            <span className="cursor-pointer hover:text-slate-900">Terms</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full md:max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <h2 className="font-bold text-sm uppercase tracking-widest">Shopping Bag ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform p-1"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-sm font-medium">Your bag is empty.</p>
                  <button onClick={() => { setIsCartOpen(false); navigate('/shop'); }} className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] underline underline-offset-4">Browse The Catalog</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-20 h-28 bg-slate-50 overflow-hidden flex-shrink-0 rounded-sm">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-[10px] text-slate-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                          <p className="font-bold text-[10px] text-slate-900">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-[9px] uppercase font-bold text-rose-600 text-left"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 space-y-4 bg-white pb-safe">
                <div className="flex justify-between items-end">
                  <span className="uppercase tracking-[0.2em] text-[9px] font-bold text-slate-400">Subtotal</span>
                  <span className="text-lg font-black text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="w-full bg-slate-900 text-white py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-slate-800 transition-all active:scale-[0.98]">
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Side Menu Drawer (Mobile) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-xs bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
              <span className="font-black text-lg tracking-tighter uppercase">KOOLRAVES</span>
              <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex-1 p-5 flex flex-col gap-6">
              <NavLink to="/shop" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-900 flex justify-between items-center border-b border-slate-50 pb-4">
                Shop Mens <Grid size={16} />
              </NavLink>
              <NavLink to="/shop" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-900 flex justify-between items-center border-b border-slate-50 pb-4">
                Shop Womens <Grid size={16} />
              </NavLink>
              <NavLink to="/shop" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-rose-600">The Archive Sale</NavLink>
              <NavLink to="/admin" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-auto">Brand Dashboard</NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorefrontLayout;
