import React, { useEffect } from 'react';
import { X, CheckCircle, HelpCircle, Phone, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcon';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestService,
}) => {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Anuman Home Health Care Centre, I would like to enquire about ${service.name}.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Category & Close */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-teal-800/80 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <ServiceIcon name={service.iconName} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded">
                  {service.category}
                </span>
                <span className="text-xs text-slate-400">
                  {service.type === 'specialized' ? 'Specialized Procedure' : 'General Care Service'}
                </span>
              </div>
              <h3 id="service-modal-title" className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
                {service.name}
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            {service.shortDesc}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Clinical Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Who May Need It */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-teal-700" />
              <span>Who May Need This Service?</span>
            </div>
            <ul className="space-y-2">
              {service.whoNeedsIt.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Is Included */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>What Is Included in This Care:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.whatIsIncluded.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-teal-50/40 border border-teal-100 text-xs text-slate-700 flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-700 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Protocol Note */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Professional Standard:</strong> {service.clinicalNote}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href="tel:7463091878"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>Call 7463091878</span>
            </a>
            <a
              href={`https://wa.me/917463091878?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestService(service.name);
            }}
            id="modal-request-service-btn"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-900/10 transition-all active:scale-95"
          >
            <span>Request This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
