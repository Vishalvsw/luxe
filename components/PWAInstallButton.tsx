import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenApkModal?: () => void;
  className?: string;
  variant?: 'badge' | 'button' | 'compact';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  onOpenApkModal, 
  className = '',
  variant = 'button' 
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA / WebAPK, suppress the prompt
  if (isInstalled) {
    return null;
  }

  // Click handler: if installable, invoke native prompt; otherwise open APK modal / iOS guide
  const handleClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome && onOpenApkModal) {
        onOpenApkModal();
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else if (onOpenApkModal) {
      onOpenApkModal();
    }
  };

  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm transition active:scale-95 ${className}`}
          title="Install Android App / APK"
        >
          <Smartphone size={13} />
          <span>Get App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <h3 className="text-base font-bold text-gray-900">Install on iPhone / iPad</h3>
              <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                1. Tap the <strong>Share</strong> button (box with upward arrow) in the Safari toolbar.<br />
                2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
                3. Koolraves will install as a native full-screen app!
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white uppercase tracking-wider"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition active:scale-95 ${className}`}
      >
        <Download size={14} />
        <span>Install App / APK</span>
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900">Install on iPhone / iPad</h3>
            <p className="mt-3 text-xs text-gray-600 leading-relaxed">
              1. Tap the <strong>Share</strong> button in the Safari toolbar.<br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
