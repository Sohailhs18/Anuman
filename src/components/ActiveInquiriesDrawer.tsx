import React from 'react';
import { X, CheckCircle, Clock, Phone, MessageCircle, AlertCircle, FileText, Trash2 } from 'lucide-react';

export interface CareInquiry {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  address?: string;
  status: 'In Review' | 'Coordinator Assigned' | 'Completed';
}

interface ActiveInquiriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: CareInquiry[];
  onClearInquiries: () => void;
  onRemoveInquiry: (id: string) => void;
}

export const ActiveInquiriesDrawer: React.FC<ActiveInquiriesDrawerProps> = ({
  isOpen,
  onClose,
  inquiries,
  onClearInquiries,
  onRemoveInquiry,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-drawer-title"
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-teal-800 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-0.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Patna Care Desk</span>
            </div>
            <h3 id="inquiry-drawer-title" className="text-lg font-bold font-heading text-white">
              Your Active Care Inquiries
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close inquiries drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inquiries List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {inquiries.length === 0 ? (
            <div className="text-center py-16 text-slate-500 space-y-3">
              <Clock className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No active care requests yet.</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                When you schedule home nursing or submit an enquiry, your reference ticket will appear here for tracking.
              </p>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
                      ID: {inq.id}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{inq.timestamp}</p>
                  </div>
                  <button
                    onClick={() => onRemoveInquiry(inq.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-1"
                    title="Remove this inquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">
                    {inq.service || 'General Home Healthcare'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Patient: <span className="font-semibold text-slate-800">{inq.name}</span> • {inq.phone}
                  </p>
                  {inq.address && (
                    <p className="text-xs text-slate-500 mt-0.5">Location: {inq.address}</p>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="p-2.5 rounded-xl bg-white border border-teal-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-bold text-teal-900">{inq.status}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Callback within 15-30m</span>
                </div>

                {/* Quick actions for this inquiry */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="tel:7463091878"
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3 h-3 text-teal-700" />
                    <span>Call Helpline</span>
                  </a>
                  <a
                    href={`https://wa.me/917463091878?text=${encodeURIComponent(
                      `Hello Anuman Care, following up on inquiry ${inq.id} for ${inq.name} (${inq.service}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {inquiries.length > 0 && (
          <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              {inquiries.length} {inquiries.length === 1 ? 'Inquiry' : 'Inquiries'} stored locally
            </span>
            <button
              onClick={onClearInquiries}
              className="text-xs text-red-600 hover:underline font-semibold"
            >
              Clear All History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
