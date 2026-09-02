import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Phone, CheckCircle2, AlertCircle, Calendar, FileText } from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { CareInquiry } from './ActiveInquiriesDrawer';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  onInquiryCreated?: (inquiry: CareInquiry) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledService = '',
  onInquiryCreated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: prefilledService,
    requirement: '',
    preferredDate: '',
    preferredTime: 'Morning (08:00 AM - 12:00 PM)',
    address: '',
  });

  const [submittedInquiry, setSubmittedInquiry] = useState<CareInquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter the patient or family contact name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newInquiry: CareInquiry = {
      id: `ANM-PATNA-${randomNum}`,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      name: formData.name,
      phone: formData.phone,
      service: formData.service || 'General Home Healthcare',
      preferredDate: formData.preferredDate || 'Earliest available',
      preferredTime: formData.preferredTime,
      address: formData.address || 'Patna Area',
      status: 'In Review',
    };

    setSubmittedInquiry(newInquiry);
    setErrorMsg('');
    if (onInquiryCreated) {
      onInquiryCreated(newInquiry);
    }
  };

  const handleWhatsAppSend = () => {
    const inquiryId = submittedInquiry ? submittedInquiry.id : 'NEW-REQUEST';
    const text = `*Home Healthcare Booking - Anuman Care*
Reference ID: ${inquiryId}
Patient/Contact: ${formData.name || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service || 'General Home Healthcare'}
Preferred Date: ${formData.preferredDate || 'Earliest available'}
Preferred Shift: ${formData.preferredTime}
Location in Patna: ${formData.address || 'Patna'}`;

    const url = `https://wa.me/917463091878?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Patna Central Care Desk • 24×7</span>
          </div>
          <h3 id="booking-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white">
            Schedule Home Healthcare Visit
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Our clinical coordinator in Patna will contact you within 15–30 minutes to confirm schedule and staff details.
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {submittedInquiry ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-teal-100 text-teal-950 rounded-full border border-teal-200">
                  Ticket Ref: {submittedInquiry.id}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-3 font-heading">
                  Request Confirmed & Logged
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Thank you, <strong>{submittedInquiry.name}</strong>. Our clinical dispatch team has received your request for{' '}
                  <strong>{submittedInquiry.service}</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-sm mx-auto text-left space-y-1">
                <p>
                  <strong>Patient Contact:</strong> {submittedInquiry.phone}
                </p>
                <p>
                  <strong>Schedule:</strong> {submittedInquiry.preferredTime}
                </p>
                {submittedInquiry.address && (
                  <p>
                    <strong>Location:</strong> {submittedInquiry.address}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col gap-2.5 max-w-sm mx-auto">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Details to WhatsApp Desk</span>
                </button>
                <a
                  href="tel:7463091878"
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-300 transition-all"
                >
                  <Phone className="w-4 h-4 text-teal-700" />
                  <span>Call Emergency Desk: 7463091878</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient or Attendant Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (10 Digits) <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs font-bold text-slate-500 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="7463091878"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-r-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Required
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                >
                  <option value="">-- Select Healthcare Service --</option>
                  <optgroup label="General Home Care">
                    {SERVICES_LIST.filter((s) => s.type === 'general').map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Specialized Procedures">
                    {SERVICES_LIST.filter((s) => s.type === 'specialized').map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Shift / Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Morning (08:00 AM - 12:00 PM)</option>
                    <option>Afternoon (12:00 PM - 04:00 PM)</option>
                    <option>Evening (04:00 PM - 08:00 PM)</option>
                    <option>12-Hour Day Shift</option>
                    <option>12-Hour Night Shift</option>
                    <option>24-Hour Continuous Care</option>
                    <option>Immediate / Urgent Requirement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location / Colony in Patna
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bailey Road, Rukanpura, Boring Road, Kankarbagh..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  id="modal-submit-booking"
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm & Request Callback</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:7463091878"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-700" />
                    <span>Call 7463091878</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
