
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import StorefrontLayout from './components/StorefrontLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Home from './pages/store/Home';
import Shop from './pages/store/Shop';
import ProductDetail from './pages/store/ProductDetail';
import Wishlist from './pages/store/Wishlist';
import Login from './pages/store/Login';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

const Orders = () => (
  <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
    <h2 className="text-xl font-bold text-slate-900">Orders Management</h2>
    <p className="text-slate-500 mt-2">This module is currently being finalized.</p>
  </div>
);

const Customers = () => (
  <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
    <h2 className="text-xl font-bold text-slate-900">Customer Insights</h2>
    <p className="text-slate-500 mt-2">View and manage your customer database here.</p>
  </div>
);

const Analytics = () => (
  <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
    <h2 className="text-xl font-bold text-slate-900">Deep Analytics</h2>
    <p className="text-slate-500 mt-2">Advanced metrics and forecasting tools.</p>
  </div>
);

const AITools = () => (
  <div className="p-8 text-center bg-indigo-50 rounded-2xl border border-dashed border-indigo-200">
    <h2 className="text-xl font-bold text-indigo-900">AI Fashion Assistant</h2>
    <p className="text-indigo-600 mt-2">Generate lookbooks, social media copy, and trend forecasts.</p>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    return (
      <Layout>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/ai-tools" element={<AITools />} />
        </Routes>
      </Layout>
    );
  }

  return (
    <StorefrontLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </StorefrontLayout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;
