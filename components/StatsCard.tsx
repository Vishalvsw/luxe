
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, trend, icon }) => {
  const isPositive = trend > 0;
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-xl text-indigo-600 border border-slate-100">
          {icon}
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {isPositive ? '+' : ''}{trend}%
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">{label}</h3>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
