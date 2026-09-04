import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const message = encodeURIComponent(
    'Hello Anuman Home Health Care Centre, I would like to enquire about home healthcare services.'
  );

  return (
    <aside aria-label="Quick WhatsApp assistance" className="hidden md:block fixed bottom-8 right-5 z-40">
      <a
        href={`https://wa.me/917463091878?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-900/30 transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Chat on WhatsApp with Anuman Care Coordinator"
      >
        {/* Soft pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 text-white fill-current relative z-10" />

        {/* Hover Tooltip on Desktop */}
        <div className="hidden md:group-hover:flex absolute right-16 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl whitespace-nowrap items-center gap-1.5 pointer-events-none transition-all">
          <span>Chat on WhatsApp</span>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
      </a>
    </aside>
  );
};
