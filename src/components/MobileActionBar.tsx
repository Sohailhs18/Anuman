import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

interface MobileActionBarProps {
  onOpenBooking: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenBooking }) => {
  const whatsappMessage = encodeURIComponent(
    'Hello Anuman Home Health Care Centre, I would like to enquire about home healthcare services.'
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-3 py-2">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href="tel:7463091878"
          id="mobile-bottom-call"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors active:scale-95 text-center"
        >
          <Phone className="w-5 h-5 text-teal-700 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">CALL NOW</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/917463091878?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-bottom-whatsapp"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors active:scale-95 text-center"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WHATSAPP</span>
        </a>

        {/* Request Care Button */}
        <button
          onClick={onOpenBooking}
          id="mobile-bottom-book"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 text-white transition-colors active:scale-95 text-center shadow-xs"
        >
          <Calendar className="w-5 h-5 text-teal-200 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">REQUEST CARE</span>
        </button>
      </div>
    </div>
  );
};
