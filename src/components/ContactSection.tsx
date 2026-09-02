import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  MessageCircle,
  Calendar,
  Clock,
  Send,
  Navigation,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { CareInquiry } from './ActiveInquiriesDrawer';

interface ContactSectionProps {
  initialServiceName?: string;
  onInquiryCreated?: (inquiry: CareInquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialServiceName = '',
  onInquiryCreated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: initialServiceName || '',
    requirement: '',
    preferredDate: '',
    preferredTime: 'Morning (08:00 AM - 12:00 PM)',
    message: '',
  });

  const [submittedInquiry, setSubmittedInquiry] = useState<CareInquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = [
    'Morning (08:00 AM - 12:00 PM)',
    'Afternoon (12:00 PM - 04:00 PM)',
    'Evening (04:00 PM - 08:00 PM)',
    '12-Hour Day Shift',
    '12-Hour Night Shift',
    '24-Hour Continuous Care',
    'Immediate / Urgent Requirement'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please provide the patient or contact person’s name.');
      return;
    }
    // Indian 10-digit phone verification
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please provide a valid 10-digit phone number.');
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
      service: formData.service || 'General Healthcare Inquiry',
      preferredDate: formData.preferredDate || 'Earliest available',
      preferredTime: formData.preferredTime,
      address: formData.requirement || 'Patna Area',
      status: 'In Review',
    };

    setSubmittedInquiry(newInquiry);
    setErrorMsg('');
    if (onInquiryCreated) {
      onInquiryCreated(newInquiry);
    }
  };

  const handleSendViaWhatsApp = () => {
    const inquiryId = submittedInquiry ? submittedInquiry.id : 'PATNA-REQUEST';
    const text = `*Home Care Request - Anuman Home Health Care Centre*
Reference ID: ${inquiryId}
Name: ${formData.name || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service || 'General Enquiry'}
Care Requirement: ${formData.requirement || 'Not specified'}
Preferred Date: ${formData.preferredDate || 'Earliest available'}
Preferred Shift: ${formData.preferredTime}
Additional Note: ${formData.message || 'None'}`;

    const url = `https://wa.me/917463091878?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };


  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/search/?api=1&query=Bailey+Road,+Road+No.+3,+Adarsh+Vihar+Colony,+Rukanpura,+Patna,+Bihar+800014';

  const mapEmbedSrc =
    'https://maps.google.com/maps?q=Bailey%20Road,%20Road%20No.%203,%20Adarsh%20Vihar%20Colony,%20Rukanpura,%20Patna,%20Bihar%20800014&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-100/70 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-wider mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Contact Us & Request Home Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Our medical coordination desk is available 24×7 to assist your family across Patna.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Business Contact Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                  Healthcare Centre
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  ANUMAN HOME HEALTH CARE CENTRE
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  "Professional Home Health Care Services" • A Complete Home Care Solution
                </p>
              </div>

              {/* Phone Channel */}
              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-700 text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">24×7 Careline & WhatsApp</div>
                  <a
                    href="tel:7463091878"
                    id="contact-tel-link"
                    className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-teal-700 transition-colors"
                  >
                    7463091878
                  </a>
                  <p className="text-xs text-teal-800 mt-0.5">Clickable for immediate call assistance</p>
                </div>
              </div>

              {/* Physical Address */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Registered Office Address</div>
                  <address className="not-italic text-sm font-bold text-slate-900 leading-snug mt-0.5">
                    Bailey Road, Road No. 3, Adarsh Vihar Colony,
                    <br />
                    Rukanpura, Patna, Bihar – 800014
                  </address>
                </div>
              </div>

              {/* 3 Prominent Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <a
                  href="tel:7463091878"
                  id="action-call-now"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL NOW</span>
                </a>

                <a
                  href="https://wa.me/917463091878?text=Hello%20Anuman%20Home%20Health%20Care%20Centre,%20I%20would%20like%20to%20enquire%20about%20home%20healthcare%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="action-whatsapp"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="action-directions"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-400" />
                  <span>DIRECTIONS</span>
                </a>
              </div>
            </div>

            {/* Google Maps Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-teal-700" />
                  <span>Location Map • Patna</span>
                </div>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <Navigation className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Map iframe */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  title="Anuman Home Health Care Centre Location Map Patna"
                  src={mapEmbedSrc}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <p className="text-[11px] text-slate-500 mt-2 text-center">
                Bailey Road, Road No. 3, Adarsh Vihar Colony, Rukanpura, Patna – 800014
              </p>
            </div>

          </div>

          {/* Right: Request / Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  Request Home Care
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in basic details below. Our care coordinator will call you back promptly to confirm schedule & details.
                </p>
              </div>

              {submittedInquiry ? (
                <div className="p-8 text-center bg-teal-50/70 border border-teal-200 rounded-2xl space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-teal-700 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-white text-teal-900 rounded-full border border-teal-200 shadow-2xs">
                      Reference Ticket: {submittedInquiry.id}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 font-heading mt-3">
                      Request Received & Logged
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-slate-900">{submittedInquiry.name}</span>. Our healthcare coordinator is reviewing your requirement for{' '}
                    <strong>{submittedInquiry.service}</strong> and will reach you at{' '}
                    <span className="font-semibold text-slate-900">{submittedInquiry.phone}</span> within 15–30 minutes.
                  </p>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Details to WhatsApp Desk</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmittedInquiry(null);
                        setFormData({
                          name: '',
                          phone: '',
                          service: '',
                          requirement: '',
                          preferredDate: '',
                          preferredTime: 'Morning (08:00 AM - 12:00 PM)',
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-bold text-slate-700 mb-1">
                        Name of Patient / Requester <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="form-phone" className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number (10 Digits) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="e.g. 7463091878"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Preferred Service Dropdown */}
                  <div>
                    <label htmlFor="form-service" className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Service
                    </label>
                    <select
                      id="form-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                    >
                      <option value="">-- Select a Service (or General Assessment) --</option>
                      <optgroup label="General Home Care Services">
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

                  {/* Patient Requirement */}
                  <div>
                    <label htmlFor="form-requirement" className="block text-xs font-bold text-slate-700 mb-1">
                      Patient / Care Requirement
                    </label>
                    <input
                      id="form-requirement"
                      type="text"
                      placeholder="e.g. Bedridden senior, post-surgery recovery, daily wound dressing, catheter change"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                    />
                  </div>

                  {/* Preferred Date & Preferred Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-date" className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Date
                      </label>
                      <input
                        id="form-date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="form-time" className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        id="form-time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message / Address Area */}
                  <div>
                    <label htmlFor="form-message" className="block text-xs font-bold text-slate-700 mb-1">
                      Address & Additional Details in Patna
                    </label>
                    <textarea
                      id="form-message"
                      rows={3}
                      placeholder="e.g. Landmark near Bailey Road or specific timing instructions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      id="submit-request-care-btn"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.99]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Care Request</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl shadow-xs transition-colors"
                      title="Direct WhatsApp request"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center pt-1">
                    Your details are handled strictly for clinical dispatch and coordination. No medical spam.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
