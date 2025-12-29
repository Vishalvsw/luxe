
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  ExternalLink,
  Loader2,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { SALES_CHART_DATA, INITIAL_ORDERS } from '../constants';
import StatsCard from '../components/StatsCard';
import { getBusinessInsights } from '../services/geminiService';

const Dashboard = () => {
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = async () => {
    setLoadingInsights(true);
    const result = await getBusinessInsights(SALES_CHART_DATA);
    setInsights(result);
    setLoadingInsights(false);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Monitor your store performance and sales metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
            View Storefront
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Revenue" 
          value="$124,592.00" 
          trend={12.5} 
          icon={<DollarSign size={24} />} 
        />
        <StatsCard 
          label="Total Orders" 
          value="1,248" 
          trend={8.2} 
          icon={<ShoppingBag size={24} />} 
        />
        <StatsCard 
          label="Active Customers" 
          value="842" 
          trend={-2.4} 
          icon={<Users size={24} />} 
        />
        <StatsCard 
          label="Avg. Order Value" 
          value="$99.80" 
          trend={5.1} 
          icon={<TrendingUp size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Revenue Performance</h3>
            <select className="bg-slate-50 border-slate-200 rounded-lg text-sm px-3 py-1 outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_CHART_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl shadow-indigo-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-indigo-500/30 rounded-lg">
                <Sparkles size={20} className="text-indigo-300" />
              </div>
              <h3 className="text-lg font-bold">AI Business Insights</h3>
            </div>
            <div className="flex-1 space-y-4">
              {loadingInsights ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-3">
                  <Loader2 className="animate-spin text-indigo-300" size={32} />
                  <p className="text-sm text-indigo-300">Analyzing store data...</p>
                </div>
              ) : (
                <div className="text-indigo-100 text-sm leading-relaxed space-y-4">
                  {insights.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={fetchInsights}
              className="mt-6 w-full py-3 bg-white text-indigo-900 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Refresh Analysis
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
          <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
            View All Orders <ExternalLink size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-slate-700">{order.customerName}</td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{order.items} items</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
