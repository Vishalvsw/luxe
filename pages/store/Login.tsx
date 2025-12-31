
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setStep(2);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      login(mobile);
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 animate-in fade-in duration-500">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl font-serif italic uppercase">Welcome to Koolraves</h1>
        <p className="text-slate-500 text-sm">Experience personalized styling and early access to our Indian collections.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm">
        {step === 1 ? (
          <form onSubmit={handleMobileSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mobile Number</label>
              <div className="flex items-center border-b border-slate-200 pb-2 focus-within:border-indigo-600 transition-colors">
                <span className="text-slate-900 font-bold mr-2">+91</span>
                <input 
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full bg-transparent outline-none text-lg font-black tracking-widest placeholder:text-slate-200"
                  autoFocus
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={mobile.length !== 10}
              className="w-full bg-slate-900 text-white py-4 rounded-sm font-bold uppercase tracking-widest text-[11px] disabled:bg-slate-200 flex items-center justify-center gap-2"
            >
              Get OTP <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Enter OTP</label>
                <button onClick={() => setStep(1)} className="text-[9px] font-bold uppercase text-indigo-600 underline">Change Number</button>
              </div>
              <input 
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="0000"
                className="w-full bg-transparent border-b border-slate-200 pb-2 outline-none text-2xl font-black tracking-[1em] text-center placeholder:text-slate-100 focus:border-indigo-600 transition-colors"
                autoFocus
              />
              <p className="text-center text-[10px] text-slate-400 font-medium">Wait 30s to resend OTP</p>
            </div>
            <button 
              type="submit"
              disabled={otp.length !== 4}
              className="w-full bg-indigo-600 text-white py-4 rounded-sm font-bold uppercase tracking-widest text-[11px] disabled:bg-slate-200 flex items-center justify-center gap-2"
            >
              Verify & Log In <ShieldCheck size={16} />
            </button>
          </form>
        )}
      </div>

      <p className="text-center mt-8 text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
        By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Login;
