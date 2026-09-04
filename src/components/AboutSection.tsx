import React from 'react';
import {
  CheckCircle2,
  Stethoscope,
  Heart,
  Home,
  ShieldCheck,
  Users,
  Award,
  ArrowRight,
  XCircle,
  Building,
  Sparkles
} from 'lucide-react';
import aboutImg from '../assets/images/home_care_equipment_1788374654304.jpg';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const comparisonData = [
    {
      feature: 'Staff-to-Patient Ratio',
      hospital: '1 Nurse for 8–12 Patients',
      anuman: 'Dedicated 1:1 Caregiver at Bedside',
      highlight: true
    },
    {
      feature: 'Infection Risk (HAI)',
      hospital: 'High exposure to multi-drug resistant hospital pathogens',
      anuman: 'Protected, hygienic home recovery environment',
      highlight: false
    },
    {
      feature: 'Family Closeness',
      hospital: 'Restricted, strict visiting hours (1–2 hrs/day)',
      anuman: 'Continuous 24-hr family proximity & home food',
      highlight: true
    },
    {
      feature: 'Financial Cost',
      hospital: 'Heavy daily room tariff + ICU consumable overheads',
      anuman: 'Up to 65% more affordable with transparent day/night shifts',
      highlight: true
    },
  ];

  const standards = [
    {
      title: 'Hospital-Grade Sterile Kits',
      desc: 'Single-use, pre-sealed clinical disposables for all IV infusions, catheterizations, and wound dressings.',
      icon: Stethoscope,
      badge: '100% Sterile'
    },
    {
      title: 'Physician-Reviewed Care Plans',
      desc: 'Vital signs charts, medication logs, and patient progress shared with your treating doctor daily.',
      icon: Award,
      badge: 'Doctor Guided'
    },
    {
      title: 'Police & Credential Verified',
      desc: 'Every nurse (GNM/B.Sc) and GDA attendant undergoes background checks, address verification, and clinical vetting.',
      icon: ShieldCheck,
      badge: 'Verified Staff'
    },
    {
      title: 'Guaranteed Shift Continuity',
      desc: 'Standby reliever staff ready across Patna to guarantee zero interruption in your loved one’s care.',
      icon: Heart,
      badge: 'Zero Missed Shifts'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-24 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Why Patna Chooses In-Home Healthcare</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            Hospital-Level Medical Diligence, Delivered In Familiar Domestic Comfort.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Patients heal faster, sleep better, and suffer fewer clinical complications in their own home. Anuman Home Health Care bridges hospital-grade medical precision with family warmth in Patna.
          </p>
        </div>

        {/* Dynamic Comparison Matrix: Hospital Ward vs Anuman Care */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 mb-16 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                The Healing Advantage: Hospital Stay vs. In-Home Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Comparing standard hospital care with Anuman’s dedicated bedside model in Patna
              </p>
            </div>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-800 bg-teal-100 hover:bg-teal-200 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto"
            >
              <span>Consult Our Care Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisonData.map((item) => (
              <div
                key={item.feature}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  item.highlight
                    ? 'bg-white border-teal-200/90 shadow-xs'
                    : 'bg-white/80 border-slate-200'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    {item.feature}
                  </span>
                  
                  {/* Hospital negative */}
                  <div className="flex items-start gap-2 text-xs text-slate-500 mb-3 pb-2.5 border-b border-slate-100">
                    <XCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>Hospital: {item.hospital}</span>
                  </div>

                  {/* Anuman positive */}
                  <div className="flex items-start gap-2 text-xs sm:text-sm font-bold text-teal-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Anuman: {item.anuman}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Standards Grid & Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 aspect-[4/3] group">
              <img
                src={aboutImg}
                alt="Compassionate healthcare attendant and equipment in home setting in Patna"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-300 px-2 py-0.5 rounded bg-teal-900/60 border border-teal-500/30 mb-1.5">
                  Patna Clinical Care Centre
                </span>
                <p className="text-sm sm:text-base font-bold text-white leading-snug">
                  Bailey Road, Road No. 3, Adarsh Vihar Colony, Rukanpura, Patna – 800014
                </p>
              </div>
            </div>

            {/* Quick Dispatch Guarantee */}
            <div className="mt-3.5 p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-center justify-between text-xs">
              <span className="font-semibold text-teal-950">Active Care Operations:</span>
              <span className="font-bold text-teal-800">24×7 Rapid Nurse Dispatch</span>
            </div>
          </div>

          {/* Right Standards Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {standards.map((std) => {
              const Icon = std.icon;
              return (
                <div
                  key={std.title}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400/80 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-100 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-100/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {std.badge}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1.5 font-heading">
                      {std.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {std.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
