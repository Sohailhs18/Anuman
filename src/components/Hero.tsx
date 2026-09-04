import React from 'react';
import { Phone, Calendar, ShieldCheck, HeartPulse, Clock, MapPin, CheckCircle, ArrowRight, Sparkles, Activity } from 'lucide-react';
import heroImg from '../assets/images/home_healthcare_hero_1788374638547.jpg';

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const quickNeeds = [
    { label: '12h / 24h Bedside Nurse', service: 'Certified Home Nurses', icon: '🩺' },
    { label: 'Elderly Care / GDA', service: 'Experienced GDA Staff', icon: '👵' },
    { label: 'IV Drip & Injections', service: 'IV Cannulation & Infusion', icon: '💉' },
    { label: 'Catheter & Ryles Tube', service: 'Catheterization & Care', icon: '🩹' },
    { label: 'Oxygen & ICU Bed Rental', service: 'Rental Medical Equipment', icon: '🫁' },
  ];

  return (
    <section
      id="home"
      className="relative pt-20 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 lg:pt-36 overflow-hidden bg-gradient-to-b from-teal-900/5 via-slate-50/50 to-white border-b border-slate-200/70"
    >
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live City Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-teal-200/90 text-teal-950 text-xs font-semibold mb-3.5 sm:mb-4 shadow-2xs">
              <span className="flex h-2 w-2 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="font-bold text-teal-950">Patna 24×7 Care Dispatch</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-medium">Across Patna & Danapur</span>
            </div>

            {/* Clinical Eyebrow */}
            <p className="text-teal-800 font-bold uppercase tracking-wider text-[11px] sm:text-xs mb-2 font-heading">
              Certified In-Home Clinical & Nursing Care
            </p>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.14] mb-3 sm:mb-4 font-heading">
              Hospital-Grade Medical Care,{' '}
              <span className="text-teal-700">
                in the Dignity of Your Home.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed mb-5 sm:mb-6 font-normal">
              Certified GNM/B.Sc. nurses, trained GDA attendants, and visiting doctors delivering 12h/24h bedside care and clinical procedures under active supervision across Patna.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto mb-6 sm:mb-8">
              <button
                onClick={() => onOpenBooking()}
                id="hero-book-btn"
                className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base px-6 py-3 sm:py-3.5 rounded-xl shadow-md hover:shadow-lg shadow-teal-900/15 transition-all duration-200 active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-teal-200" />
                <span>Book In-Home Care</span>
              </button>

              <a
                href="tel:7463091878"
                id="hero-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base px-5 py-3 sm:py-3.5 rounded-xl border border-slate-300 shadow-xs transition-all duration-200 hover:border-teal-400"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700" />
                <span>Call 7463091878</span>
              </a>
            </div>

            {/* Interactive Quick-Need Selector (Engaging & Actionable) */}
            <div className="w-full pt-3.5 border-t border-slate-200/80">
              <p className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Immediate Dispatch Options:</span>
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickNeeds.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => onOpenBooking(item.service)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-900 text-[11px] sm:text-xs font-semibold border border-slate-200 hover:border-teal-300 shadow-2xs transition-all active:scale-95"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 aspect-[4/3] group">
                <img
                  src={heroImg}
                  alt="Compassionate home healthcare nurse checking vitals of an elderly patient in home comfort in Patna"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Info Banner */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hospital-Grade Bedside Care</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-white drop-shadow-xs leading-snug">
                    Bailey Road, Road No. 3, Rukanpura, Patna
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: 24/7 Helpline */}
              <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center flex-shrink-0">
                  <HeartPulse className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Patna Support</div>
                  <div className="text-xs font-extrabold text-slate-900">24×7 Active Careline</div>
                </div>
              </div>

              {/* Floating Badge 2: Verified Clinical Staff */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">Certified GNM & B.Sc Nurses</div>
                  <div className="text-[11px] text-slate-500 font-medium">Police Verified & Doctor Supervised</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
