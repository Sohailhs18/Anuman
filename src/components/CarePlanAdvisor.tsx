import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Phone,
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface CarePlanAdvisorProps {
  onOpenBooking: (prefilledService?: string) => void;
}

export const CarePlanAdvisor: React.FC<CarePlanAdvisorProps> = ({ onOpenBooking }) => {
  const [patientProfile, setPatientProfile] = useState<string>('elderly-assistance');
  const [careDuration, setCareDuration] = useState<string>('12-hr-day');
  const [clinicalRequirement, setClinicalRequirement] = useState<string>('hygiene-mobility');

  // Recommendation Logic
  const getRecommendation = () => {
    if (patientProfile === 'post-op' || clinicalRequirement === 'invasive-catheter-ryles') {
      return {
        role: 'Certified GNM / B.Sc. Home Nurse',
        shift: careDuration === 'hourly' ? 'Procedure Visit (1-2 Hours)' : careDuration === '24-hr' ? '24-Hour Continuous Nursing' : '12-Hour Dedicated Nursing Shift',
        summary: 'Recommended for clinical procedures, sterile wound dressing, IV/IM administration, and catheter/Ryles tube care.',
        supplies: ['Disposable sterile dressing kit', 'Vitals monitor (BP/Pulse/SpO2/Sugar)', 'Doctor prescription tracking log'],
        primaryService: 'Certified Home Nurses'
      };
    } else if (patientProfile === 'home-icu') {
      return {
        role: 'Critical Care Nurse + Medical Equipment Setup',
        shift: '24-Hour Continuous Care (Day/Night Rotational Nurses)',
        summary: 'Required for high-dependency tracheostomy, continuous oxygen therapy, or multi-organ support under physician guidance.',
        supplies: ['Medical Oxygen Concentrator or Cylinder', 'Suction Machine', 'Anti-Bedsore Air Mattress', 'Emergency standby vitals kit'],
        primaryService: '24×7 Care Support & Rental Medical Equipment'
      };
    } else {
      return {
        role: 'Experienced General Duty Assistant (GDA)',
        shift: careDuration === 'hourly' ? 'Daily Bath / Dressing Visit' : careDuration === '24-hr' ? '24-Hour Resident Attendant' : '12-Hour Day or Night Bedside Attendant',
        summary: 'Ideal for elderly or semi-dependent family members needing daily hygiene, mobility support, medication reminders, and companionship.',
        supplies: ['Diapers & underpads', 'Sponge bath wipes', 'Wheelchair or walking frame if mobility impaired'],
        primaryService: 'Experienced GDA Staff'
      };
    }
  };

  const rec = getRecommendation();

  return (
    <section id="care-advisor" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
            <span>Interactive Care Advisor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Find the Right Healthcare Plan for Your Family
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Unsure whether you need a GDA attendant, a certified nurse, or specific medical equipment? Answer 3 quick questions for instant clinical guidance.
          </p>
        </div>

        {/* 2-Column Interactive Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 3 Selectors */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
            
            {/* Question 1 */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. What is the patient's primary condition?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'elderly-assistance', label: 'Elderly / Reduced Mobility' },
                  { id: 'post-op', label: 'Post-Surgery / Fracture Recovery' },
                  { id: 'bedridden-stroke', label: 'Stroke / Bedridden Patient' },
                  { id: 'home-icu', label: 'Critical Care / Tracheostomy / Oxygen' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPatientProfile(item.id)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                      patientProfile === item.id
                        ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. What level of clinical procedure is required?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'hygiene-mobility', label: 'Daily Hygiene, Feeding & Mobility only' },
                  { id: 'invasive-catheter-ryles', label: 'Catheter / Ryles Tube / Injections' },
                  { id: 'wound-care', label: 'Wound Dressing / Stitches / IV Line' },
                  { id: 'vital-monitoring', label: 'Vitals Monitoring & Medication Chart' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setClinicalRequirement(item.id)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                      clinicalRequirement === item.id
                        ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. What care duration or shift is preferred?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'hourly', label: 'Short Visit (1h)' },
                  { id: '12-hr-day', label: '12-hr Day Shift' },
                  { id: '12-hr-night', label: '12-hr Night Shift' },
                  { id: '24-hr', label: '24-hr Resident' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCareDuration(item.id)}
                    className={`p-2.5 rounded-xl text-center text-xs font-semibold border transition-all ${
                      careDuration === item.id
                        ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Real-time Recommended Care Plan Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-teal-800">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Recommended Care Configuration</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
              {rec.role}
            </h3>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-800/80 text-teal-200 text-xs font-bold mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>Suggested Schedule: {rec.shift}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {rec.summary}
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6 space-y-2">
              <p className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Recommended Supplies / Setup:
              </p>
              {rec.supplies.map((sup, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{sup}</span>
                </div>
              ))}
            </div>

            {/* Action Handover */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => onOpenBooking(`${rec.primaryService} (${rec.shift})`)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
              >
                <span>Request This Care Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/917463091878?text=${encodeURIComponent(
                  `Hello Anuman Care, based on the Care Advisor I would like to consult regarding: ${rec.role} for ${rec.shift}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss On WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
