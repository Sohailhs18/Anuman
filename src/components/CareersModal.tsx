import React, { useState } from 'react';
import {
  X,
  Briefcase,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import { addCareerApplication, CareerInput } from '../services/careersStorage';

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareersModal: React.FC<CareersModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<CareerInput>({
    name: '',
    phone: '',
    email: '',
    role: 'Certified Home Nurse (GNM / B.Sc Nursing)',
    qualification: '',
    experience: '1-2 Years Experience',
    preferredShift: '12-Hour Day Shift',
    preferredLocality: '',
    about: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent, sendToWhatsApp = false) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = await addCareerApplication(formData);
      setSubmittedId(created.id);

      if (sendToWhatsApp) {
        const waMsg = `Hello Anuman Home Health Care Centre Patna HR,
I want to apply for a job with your team.
• Name: ${formData.name}
• Phone: ${formData.phone}
• Position: ${formData.role}
• Qualification: ${formData.qualification || 'Nursing / Healthcare Background'}
• Experience: ${formData.experience}
• Shift Preference: ${formData.preferredShift}
• Preferred Area in Patna: ${formData.preferredLocality || 'Anywhere in Patna'}
• Notes: ${formData.about || 'Ready to join immediately'}
Application ID: ${created.id}`;

        const waUrl = `https://wa.me/917463091878?text=${encodeURIComponent(waMsg)}`;
        window.open(waUrl, '_blank');
      }
    } catch (err) {
      console.error(err);
      alert('Could not submit application. Please try again or call 7463091878 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedId(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      role: 'Certified Home Nurse (GNM / B.Sc Nursing)',
      qualification: '',
      experience: '1-2 Years Experience',
      preferredShift: '12-Hour Day Shift',
      preferredLocality: '',
      about: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-slate-950 text-white px-5 py-4 sm:px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                  Join Our Caregiving Team • Patna Careers
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  We Are Hiring
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Nurses, Patient Attendants, Physiotherapists & Technicians in Patna
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-slate-800">
          {submittedId ? (
            /* Success confirmation screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-heading">
                Application Received Successfully!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for applying to work with <strong>Anuman Home Health Care Centre</strong>. Your profile has been logged directly in our Patna Staff Desk.
              </p>

              <div className="inline-block p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800">
                Application Reference: <span className="text-teal-700">{submittedId}</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/917463091878?text=${encodeURIComponent(
                    `Hello Anuman Care HR, I have submitted my job application (${submittedId}). Kindly review my application.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With HR on WhatsApp</span>
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form className="space-y-4 text-xs">
              {/* Highlights Pill */}
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-950 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Why join Anuman Care?</strong> Timely payments, verified and safe home environments, flexible 12-hour/24-hour shifts in your preferred Patna colonies, and continuous clinical guidance.
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar / Sunita Devi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number (e.g. 9835012345)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-slate-900"
                  />
                </div>
              </div>

              {/* Role & Qualification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Role You Are Applying For <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-slate-900"
                  >
                    <option>Certified Home Nurse (GNM / B.Sc Nursing)</option>
                    <option>Patient Care Attendant / GDA (Female)</option>
                    <option>Patient Care Attendant / GDA (Male)</option>
                    <option>Home Physiotherapist (BPT / MPT)</option>
                    <option>Medical Equipment Technician (O2, BiPAP, Beds)</option>
                    <option>Lab Phlebotomist (Home Sample Collection)</option>
                    <option>Ambulance Driver & Emergency Assistant</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Highest Educational / Nursing Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GNM, B.Sc Nursing, GDA Diploma, 12th Pass, BPT"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-slate-900"
                  />
                </div>
              </div>

              {/* Shift & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-slate-900"
                  >
                    <option>Fresher / Under 1 Year</option>
                    <option>1-2 Years Experience</option>
                    <option>3-5 Years Experience</option>
                    <option>5+ Years Senior Clinical Experience</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Preferred Shift Preference
                  </label>
                  <select
                    value={formData.preferredShift}
                    onChange={(e) => setFormData({ ...formData, preferredShift: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-slate-900"
                  >
                    <option>12-Hour Day Shift</option>
                    <option>12-Hour Night Shift</option>
                    <option>24-Hour Residential Stay</option>
                    <option>Visiting / Per Procedure Visits</option>
                    <option>Flexible / Any Shift</option>
                  </select>
                </div>
              </div>

              {/* Locality in Patna */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Your Current Residence / Preferred Patna Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bailey Road, Rukanpura, Danapur, Boring Road, Kankarbagh..."
                  value={formData.preferredLocality}
                  onChange={(e) => setFormData({ ...formData, preferredLocality: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-slate-900"
                />
              </div>

              {/* Skills & Past Experience */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Clinical Skills / Past Hospital Experience (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Worked at PMCH / Kurji Hospital. Skilled in IV injections, Foley catheter, diaper changing, tracheostomy care..."
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-slate-900"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={(e) => handleSubmit(e, false)}
                  className="w-full sm:flex-1 py-2.5 px-4 bg-teal-700 hover:bg-teal-800 active:scale-98 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving...' : 'Submit Application'}</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={(e) => handleSubmit(e, true)}
                  className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Apply & Chat on WhatsApp</span>
                </button>
              </div>

              <div className="text-center pt-1 text-[11px] text-slate-500">
                You can also directly contact our Patna HR Desk at <a href="tel:7463091878" className="font-bold text-teal-800 underline">7463091878</a>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
