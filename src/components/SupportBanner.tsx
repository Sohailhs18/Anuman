import React from 'react';
import { Phone, Clock, MessageCircle, Calendar } from 'lucide-react';

interface SupportBannerProps {
  onOpenBooking: () => void;
}

export const SupportBanner: React.FC<SupportBannerProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
      {/* Background Subtle Medical Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Text Block */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>24×7 Emergency & General Care Support</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Professional Care When You Need It.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
              Medical emergencies, night shifts, and urgent bedside procedures do not wait. Our clinical helpline is active 24 hours every single day across Patna.
            </p>
          </div>

          {/* Right Action Block */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Direct Call Button */}
            <a
              href="tel:7463091878"
              id="support-banner-call-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-base md:text-lg shadow-lg shadow-teal-500/20 transition-all active:scale-95"
            >
              <Phone className="w-5 h-5 text-slate-950 fill-current" />
              <span>CALL NOW: 7463091878</span>
            </a>

            {/* Request Care Button */}
            <button
              onClick={onOpenBooking}
              id="support-banner-request-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border border-slate-700 transition-all"
            >
              <Calendar className="w-5 h-5 text-teal-400" />
              <span>Request Home Care</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
