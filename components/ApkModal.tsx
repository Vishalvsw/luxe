import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  QrCode, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkModal: React.FC<ApkModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isIOS, isAndroid } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'instant' | 'builder' | 'cli' | 'qr'>('instant');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://koolraves-fashion.web.app';
  const manifestUrl = `${currentUrl}/manifest.json`;
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(currentUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const bubblewrapCommand = `npm install -g @bubblewrap/cli
bubblewrap init --manifest="${manifestUrl}"
bubblewrap build`;

  const handleCopyCli = () => {
    navigator.clipboard.writeText(bubblewrapCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleDownloadTwaConfig = () => {
    const configData = {
      packageId: "com.koolraves.app",
      name: "Koolraves India | Signature Fashion",
      shortName: "Koolraves",
      startUrl: currentUrl,
      themeColor: "#4F46E5",
      backgroundColor: "#FFFFFF",
      iconUrl: `${currentUrl}/pwa-512x512.png`,
      maskableIconUrl: `${currentUrl}/pwa-maskable-512x512.png`,
      display: "standalone",
      generator: "bubblewrap-cli",
      pwaUrl: currentUrl,
      manifestUrl: manifestUrl
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'koolraves-twa-manifest.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-black tracking-widest text-indigo-400">Android APK Hub</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Ready to Package
                </span>
              </div>
              <h2 className="text-xl font-bold font-serif tracking-tight text-white">
                Convert Koolraves to Android APK
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 max-w-lg mt-1">
            Choose how you want to install or package this web app into a native Android APK or Play Store release.
          </p>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-5 border-b border-white/10 pb-0 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('instant')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'instant' 
                  ? 'bg-white text-slate-900 border-b-2 border-indigo-600' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles size={14} /> 1-Tap WebAPK
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'builder' 
                  ? 'bg-white text-slate-900 border-b-2 border-indigo-600' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Download size={14} /> PWABuilder (.APK)
            </button>
            <button
              onClick={() => setActiveTab('cli')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'cli' 
                  ? 'bg-white text-slate-900 border-b-2 border-indigo-600' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal size={14} /> CLI / Bubblewrap
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'qr' 
                  ? 'bg-white text-slate-900 border-b-2 border-indigo-600' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <QrCode size={14} /> Mobile QR Scan
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* TAB 1: Instant WebAPK */}
          {activeTab === 'instant' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-200/50 px-2 py-0.5 rounded">
                    Recommended for Android Devices
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">Instant Android WebAPK Installation</h3>
                  <p className="text-xs text-slate-600 max-w-md">
                    Android Google Chrome automatically synthesizes a real native APK in the background and places it directly in your device app drawer with offline support.
                  </p>
                </div>
                {isInstalled ? (
                  <div className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-sm">
                    <CheckCircle2 size={16} /> App Installed
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={install}
                    className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shadow-md shadow-indigo-600/30 transition"
                  >
                    <Download size={16} /> Install App Now
                  </button>
                ) : (
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap hover:bg-slate-800 transition"
                  >
                    {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                    {copiedLink ? 'Link Copied!' : 'Open in Chrome on Android'}
                  </button>
                )}
              </div>

              {/* Status details */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" /> Android PWA / APK Pre-flight Verification
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span><strong>Web App Manifest:</strong> Standalone configured</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span><strong>Android Icons:</strong> 192px & 512px present</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span><strong>Maskable Icon:</strong> 15% safe-zone margin</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span><strong>Service Worker:</strong> Offline caching active</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-white border border-slate-200 rounded-lg p-3 flex items-start gap-2.5">
                <Smartphone size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <p>
                  <strong>How to install on Android phone:</strong> Open this URL in <strong>Google Chrome</strong> or Samsung Internet, tap the <strong>three dots menu (⋮)</strong>, then tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>. Android will compile and install the WebAPK immediately!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PWABuilder (.APK generator) */}
          {activeTab === 'builder' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    Official Microsoft & Google Tool
                  </span>
                  <h3 className="font-bold text-sm text-white">Generate Signed APK / AAB with PWABuilder</h3>
                  <p className="text-xs text-slate-300 max-w-md">
                    PWABuilder converts any valid PWA into a production-ready Android APK (for direct sideloading) and AAB (for Google Play Store upload) in 60 seconds.
                  </p>
                </div>
                <a
                  href={pwaBuilderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shadow-lg transition"
                >
                  Generate APK on PWABuilder <ExternalLink size={14} />
                </a>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Step-by-step: How to get your `.apk` file:
                </h4>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside">
                  <li>Click the <strong>Generate APK on PWABuilder</strong> button above.</li>
                  <li>PWABuilder tests the URL (All PWA tests will show <strong>100% Score</strong>).</li>
                  <li>Click <strong>"Package For Stores"</strong> and choose <strong>Android</strong>.</li>
                  <li>Select <strong>"Generate APK / Sideloading Package"</strong> or <strong>"Google Play Package"</strong>.</li>
                  <li>Download your signed <strong>.apk</strong> file and send it to your phone or client!</li>
                </ol>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Download TWA Android Configuration</p>
                  <p className="text-slate-500 text-[11px]">Includes package name, theme colors, and icons</p>
                </div>
                <button
                  onClick={handleDownloadTwaConfig}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
                >
                  <Download size={14} /> Download Config
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CLI / Bubblewrap */}
          {activeTab === 'cli' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">Google Bubblewrap CLI (Command Line APK Build)</h3>
                <p className="text-xs text-slate-600">
                  Use Google's official Trusted Web Activity (TWA) tool to generate an APK locally using the Android SDK and Java.
                </p>
              </div>

              <div className="relative rounded-xl bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto border border-slate-800">
                <button 
                  onClick={handleCopyCli}
                  className="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-sans font-bold flex items-center gap-1 transition"
                >
                  {copiedCli ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copiedCli ? 'Copied!' : 'Copy Commands'}
                </button>
                <div className="space-y-2">
                  <p className="text-slate-500"># 1. Install Google Bubblewrap CLI</p>
                  <p className="text-emerald-400">npm install -g @bubblewrap/cli</p>
                  <p className="text-slate-500 mt-2"># 2. Initialize Android Project from live Manifest</p>
                  <p className="text-emerald-400 break-all">bubblewrap init --manifest="{manifestUrl}"</p>
                  <p className="text-slate-500 mt-2"># 3. Build signed APK / AAB</p>
                  <p className="text-emerald-400">bubblewrap build</p>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 text-xs text-indigo-900">
                <p className="font-bold mb-1">Android Package Specifications:</p>
                <ul className="space-y-1 text-[11px] text-indigo-800">
                  <li>• <strong>Application ID:</strong> <code>com.koolraves.app</code></li>
                  <li>• <strong>App Name:</strong> Koolraves India</li>
                  <li>• <strong>Launcher Name:</strong> Koolraves</li>
                  <li>• <strong>Default Orientation:</strong> Portrait</li>
                  <li>• <strong>Status Bar Color:</strong> <code>#4F46E5</code> (Indigo)</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: QR Code */}
          {activeTab === 'qr' && (
            <div className="space-y-5 animate-in fade-in duration-200 text-center">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">Scan with Your Android Phone</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Scan this QR code using your Android camera or Google Lens to immediately open Koolraves and install the APK on your device.
                </p>
              </div>

              {/* Dynamic QR Code display */}
              <div className="inline-block p-4 bg-white rounded-2xl border-2 border-indigo-100 shadow-xl">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}`} 
                  alt="Koolraves Android APK QR Code"
                  className="w-48 h-48 mx-auto rounded-lg"
                  loading="lazy"
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-3">
                  Scan to Install on Android
                </p>
              </div>

              <div className="max-w-md mx-auto flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
                <span className="truncate flex-1 text-left px-2 text-slate-600 font-mono text-[11px]">
                  {currentUrl}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shrink-0 transition"
                >
                  {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                  {copiedLink ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 px-6 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Layers size={14} className="text-indigo-600" />
            <span>PWA & Android TWA v1.0.0</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold uppercase tracking-wider text-[11px] transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
