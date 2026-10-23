import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:right-auto md:max-w-md z-[120] flex items-center gap-3 rounded-xl bg-slate-900/95 backdrop-blur-md px-4 py-3 text-xs font-medium text-white shadow-2xl border border-slate-700/50 animate-bounce">
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
        <WifiOff size={16} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-white text-[11px] uppercase tracking-wider">Offline Mode Active</p>
        <p className="text-[10px] text-slate-300">You're viewing cached items and catalog. Seamless browsing enabled.</p>
      </div>
    </div>
  );
};
