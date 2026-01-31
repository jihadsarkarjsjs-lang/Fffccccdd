
import React, { useState, useEffect } from 'react';
import { InvoiceData } from './types';
import { DEFAULT_NOTE, DEFAULT_SUBJECT, COMPANY_NAME } from './constants';
import LogoUploader from './components/LogoUploader';
import InvoicePreview from './components/InvoicePreview';

const PAYMENT_METHODS = ['Bkash', 'Nagad', 'Rocket', 'Upay'];

const App: React.FC = () => {
  const [data, setData] = useState<InvoiceData>(() => {
    const savedLogo = localStorage.getItem('unity_invoice_logo');
    return {
      logo: savedLogo || null,
      userDetails: {
        name: 'Emon Ahmed',
        email: 'emonahmed78@gmail.com',
        phone: '01646554387',
        referralCode: '1791898',
        cashBackBalance: '300',
      },
      paymentAmount: '1200',
      paymentMethod: 'Bkash',
      subject: DEFAULT_SUBJECT,
      note: DEFAULT_NOTE,
      isActivated: true,
    };
  });

  const [isFinalized, setIsFinalized] = useState(false);

  // Logo persists in localStorage - no need to upload every time
  useEffect(() => {
    if (data.logo) {
      localStorage.setItem('unity_invoice_logo', data.logo);
    }
  }, [data.logo]);

  const handleUserDetailChange = (field: keyof typeof data.userDetails, value: string) => {
    setData(prev => ({
      ...prev,
      userDetails: {
        ...prev.userDetails,
        [field]: value
      }
    }));
  };

  const handlePasteRaw = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text');
    const lines = text.split('\n');
    const newData = { ...data.userDetails };
    
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length < 2) return;
      
      const key = parts[0].trim().toLowerCase();
      const val = parts.slice(1).join(':').trim();

      if (key.includes('name')) newData.name = val;
      if (key.includes('email')) newData.email = val;
      if (key.includes('phone')) newData.phone = val;
      if (key.includes('referral')) newData.referralCode = val;
      // Balance is often referred to as "Balance" or "Cash Back"
      if (key.includes('balance') || key.includes('cash')) {
        newData.cashBackBalance = val.replace(/[^0-9]/g, '');
      }
    });

    setData(prev => ({ ...prev, userDetails: newData }));
    // Clear textarea after processing
    e.currentTarget.value = "";
  };

  const toggleFinalize = () => {
    // Scroll to top when finalizing to help with screenshots
    window.scrollTo(0, 0);
    setIsFinalized(!isFinalized);
  };

  return (
    <div className={`min-h-screen ${isFinalized ? 'bg-slate-900 flex items-center justify-center' : 'bg-slate-50 pb-12'}`}>
      {!isFinalized && (
        <header className="bg-white border-b border-slate-200 py-3 px-6 mb-4 no-print">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="font-bold text-slate-800 text-sm">Unity Admin</h1>
            </div>
            <button onClick={() => window.print()} className="text-slate-500 hover:text-slate-800 p-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 012-2H5a2 2 0 012 2v4a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </header>
      )}

      <main className={`${isFinalized ? 'w-full max-w-sm mx-auto p-4' : 'max-w-7xl mx-auto px-4'}`}>
        <div className={`grid ${isFinalized ? 'grid-cols-1' : 'lg:grid-cols-12'} gap-6 items-start`}>
          
          {!isFinalized && (
            <div className="lg:col-span-5 space-y-4 no-print">
              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logo Setup</label>
                  <LogoUploader 
                    currentLogo={data.logo} 
                    onLogoChange={(logo) => setData(prev => ({ ...prev, logo }))} 
                  />
                  <p className="text-[9px] text-slate-400 italic">Saved automatically in this browser.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase">Input Data</h3>
                  <textarea 
                    placeholder="Paste Name: Value format here..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none h-16 bg-slate-50"
                    onPaste={handlePasteRaw}
                  />
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    <InputField label="Name" value={data.userDetails.name} onChange={(v) => handleUserDetailChange('name', v)} />
                    <InputField label="Email" value={data.userDetails.email} onChange={(v) => handleUserDetailChange('email', v)} />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="Phone" value={data.userDetails.phone} onChange={(v) => handleUserDetailChange('phone', v)} />
                      <InputField label="Referral" value={data.userDetails.referralCode} onChange={(v) => handleUserDetailChange('referralCode', v)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="Cashback" value={data.userDetails.cashBackBalance} onChange={(v) => handleUserDetailChange('cashBackBalance', v)} />
                      <InputField label="Paid (৳)" value={data.paymentAmount} onChange={(v) => setData(prev => ({ ...prev, paymentAmount: v }))} />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Method</label>
                      <select 
                        value={data.paymentMethod}
                        onChange={(e) => setData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none bg-white font-semibold"
                      >
                        {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={toggleFinalize}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] text-sm"
                >
                  Generate Screen-Fit View
                </button>
              </section>
            </div>
          )}

          <div className={`${isFinalized ? 'w-full' : 'lg:col-span-7'}`}>
            {isFinalized && (
              <div className="mb-4 flex justify-between items-center no-print">
                <button onClick={toggleFinalize} className="text-white/60 flex items-center gap-1 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Edit
                </button>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-black">Snap Ready</span>
                </div>
              </div>
            )}
            <InvoicePreview data={data} />
          </div>
        </div>
      </main>
    </div>
  );
};

const InputField: React.FC<{label: string, value: string, onChange: (v: string) => void}> = ({ label, value, onChange }) => (
  <div className="space-y-0.5">
    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
    />
  </div>
);

export default App;
