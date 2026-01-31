
import React from 'react';
import { InvoiceData } from '../types';
import { COMPANY_NAME } from '../constants';

interface InvoicePreviewProps {
  data: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ data }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-slate-100 w-full max-w-[340px] mx-auto font-sans" id="invoice-capture">
      {/* Slim Header */}
      <div className="bg-indigo-600 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {data.logo ? (
            <img src={data.logo} alt="Logo" className="h-7 w-auto object-contain brightness-0 invert" />
          ) : (
            <div className="h-6 w-6 bg-white/20 rounded flex items-center justify-center text-white font-black text-[10px] backdrop-blur-sm">U</div>
          )}
          <h1 className="text-[10px] font-black text-white tracking-tight uppercase">{COMPANY_NAME.split(' ')[0]} {COMPANY_NAME.split(' ')[1]}</h1>
        </div>
        <div className="text-right">
          <p className="text-[7px] font-bold text-white/60 uppercase tracking-widest">Date</p>
          <p className="text-[9px] font-bold text-white">{currentDate}</p>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Success Banner - More Compact */}
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 p-2 rounded-xl">
          <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-[11px] font-black text-emerald-900 leading-none">Activation Success</h2>
            <p className="text-[7px] text-emerald-700/70 font-bold uppercase mt-0.5">Verified System Account</p>
          </div>
        </div>

        {/* User Card - Tight spacing */}
        <div className="space-y-1.5">
          <h3 className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">Account Info</h3>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2">
            <DetailRow label="Subscriber" value={data.userDetails.name} />
            <DetailRow label="ID / Email" value={data.userDetails.email} />
            <DetailRow label="WhatsApp" value={data.userDetails.phone} />
            <DetailRow label="Referral" value={data.userDetails.referralCode} isBold />
            <div className="pt-1.5 border-t border-slate-200/40 flex justify-between items-center">
              <span className="text-[8px] font-bold text-slate-400 uppercase">Cashback</span>
              <span className="text-xs font-black text-indigo-600">{data.userDetails.cashBackBalance}৳</span>
            </div>
          </div>
        </div>

        {/* Payment Summary - Two column grid */}
        <div className="grid grid-cols-2 gap-2">
           <div className="bg-slate-900 rounded-xl p-2.5 flex flex-col justify-center">
              <p className="text-[7px] font-bold text-slate-400 uppercase mb-0.5">Via</p>
              <div className="flex items-center gap-1">
                 <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
                 <p className="text-[10px] font-black text-white uppercase">{data.paymentMethod}</p>
              </div>
           </div>
           <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex flex-col justify-center">
              <p className="text-[7px] font-bold text-slate-400 uppercase mb-0.5 text-center">Amount</p>
              <p className="text-base font-black text-slate-900 text-center tracking-tighter">
                {data.paymentAmount}<span className="text-[8px] ml-0.5">৳</span>
              </p>
           </div>
        </div>

        {/* Instruction Note - Smaller */}
        <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl">
          <p className="text-[9px] leading-relaxed text-indigo-900 font-semibold text-center italic">
            "{data.note}"
          </p>
        </div>
      </div>

      {/* Mini Footer */}
      <div className="bg-slate-50 border-t border-slate-100 px-5 py-2.5 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[6px] font-black text-slate-400 uppercase tracking-widest">Secure Payment</span>
          <span className="text-[8px] font-bold text-slate-500 uppercase">#TR-{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
        <p className="text-[8px] font-black text-indigo-600 tracking-tight">unityearning.edu.bd</p>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, isBold = false }: { label: string; value: string; isBold?: boolean }) => (
  <div className="flex justify-between items-center gap-3">
    <span className="text-[8px] font-bold text-slate-400 uppercase shrink-0">{label}</span>
    <span className={`text-[9px] truncate text-right ${isBold ? 'font-black text-indigo-700' : 'font-bold text-slate-800'}`}>
      {value || '---'}
    </span>
  </div>
);

export default InvoicePreview;
