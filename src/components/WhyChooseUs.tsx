import React from 'react';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  CheckCircle2,
  FileCheck2,
  Lock,
  PhoneCall,
  Sparkles,
  ClipboardList,
  AlertCircle
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: '100% Police & Credential Verified',
      subtitle: 'Background Cleared Staff',
      desc: 'Every registered nurse and bedside attendant is identity-verified with Aadhaar, police verification, and hospital nursing council registration.',
      icon: ShieldCheck,
      badge: 'Zero Compromise'
    },
    {
      title: 'Continuous Medical Supervision',
      subtitle: 'Doctor Review at Every Shift',
      desc: 'Our staff maintain clinical vitals charting (BP, Pulse, SpO2, Blood Sugar, Intake/Output) directly shared with treating physicians.',
      icon: Award,
      badge: 'Clinical Protocol'
    },
    {
      title: 'Transparent, Honest Tariffs',
      subtitle: 'No Surprises or Hidden Markups',
      desc: 'Clear upfront quotes for 12-hour shifts, 24-hour live-in care, or short procedural visits. No unexpected hospital consumable inflation.',
      icon: HeartHandshake,
      badge: 'Fair Healthcare'
    },
    {
      title: 'Guaranteed Shift Continuity',
      subtitle: 'Standby Relief Across Patna',
      desc: 'Should a caregiver face an emergency, our Patna dispatch coordinator immediately deploys a qualified reliever nurse.',
      icon: PhoneCall,
      badge: '24×7 Reliever'
    }
  ];

  const charterItems = [
    'Patient Dignity & Privacy respected at all hours in your home',
    'Single-use, sterile disposable materials for all procedures',
    'Caregiver ID Card & Registration displayed upon arrival',
    'Bedside clinical charting record available for family review',
    '24×7 Operations Escalation Officer available via direct phone'
  ];

  return (
    <section id="why-us" className="py-20 md:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Hospital Diligence • Domestic Warmth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Why Patna Families Place Their Trust in Anuman
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 font-normal leading-relaxed">
            Healthcare at home requires uncompromised clinical discipline and utter reliability. Here is our solemn commitment to every family.
          </p>
        </div>

        {/* 2-Column High-Impact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 4 Focused Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-teal-400 hover:bg-white transition-all duration-200 flex flex-col justify-between shadow-2xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading mb-1 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700 mb-2">
                      {pillar.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: The Patna Family Healthcare Charter Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
                <ClipboardList className="w-3.5 h-3.5 text-emerald-400" />
                <span>Our Clinical Promise</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3">
                The Anuman Patient Care Charter
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                Every nurse, attendant, and visiting clinician adhering to Anuman care protocols signs and upholds our clinical safety standards in Patna:
              </p>

              <div className="space-y-3 mb-6">
                {charterItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Support Contact */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Patna Operations Desk:</span>
              <a
                href="tel:7463091878"
                className="text-teal-300 font-bold hover:text-white transition-colors"
              >
                +91 7463091878 (24×7)
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
