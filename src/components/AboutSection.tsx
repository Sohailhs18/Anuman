import React from 'react';
import {
  CheckCircle2,
  Stethoscope,
  Heart,
  Home,
  ShieldAlert,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';
import aboutImg from '../assets/images/home_care_equipment_1788374654304.jpg';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      title: 'Professional Care',
      desc: 'Hospital-level clinical procedures performed with sterile instruments and continuous vitals tracking.',
      icon: Stethoscope,
      accent: 'bg-teal-50 text-teal-800 border-teal-200'
    },
    {
      title: 'Experienced Staff',
      desc: 'Trained registered nurses, GDAs, physiotherapists, and on-call physicians vetted for clinical acumen.',
      icon: Award,
      accent: 'bg-sky-50 text-sky-800 border-sky-200'
    },
    {
      title: 'Personalized Attention',
      desc: '100% focused one-on-one attention unlike overcrowded hospital wards where staff are split across beds.',
      icon: Heart,
      accent: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      title: 'Comfort of Home',
      desc: 'Reduced infection risks, faster emotional healing, home-cooked diet, and continuous family proximity.',
      icon: Home,
      accent: 'bg-slate-50 text-slate-800 border-slate-200'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            About Anuman Home Health Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            Hospital-Level Professional Medical Care In The Comfort of Your Home.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            "We are the Anuman Home Health Care Centre. We provide hospital level professional medical care in the comfort of your home."
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-50 bg-slate-100">
              <img
                src={aboutImg}
                alt="Compassionate healthcare attendant and equipment in home setting in Patna"
                className="w-full h-auto object-cover max-h-[500px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs uppercase font-bold tracking-wider text-teal-300">
                    Patient-First Healthcare
                  </span>
                </div>
                <p className="text-base font-bold text-white">
                  Compassionate, Dignified Recovery Surrounded By Family.
                </p>
              </div>
            </div>

            {/* Quick Location Badge */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="font-semibold text-slate-800">Primary Serving Centre:</span>
              <span className="text-teal-700 font-bold">Bailey Road, Rukanpura, Patna</span>
            </div>
          </div>

          {/* Right Concept Breakdown */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* The Concept of Home Healthcare */}
            <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">
                The Philosophy of Home Healthcare
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                Medical studies consistently demonstrate that patients heal faster with fewer complications when recuperating in their familiar home environment. We bridge modern medical standards with domestic warmth:
              </p>

              {/* Formula pill row */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  Professional Medical Support
                </span>
                <span className="text-teal-600 font-black">+</span>
                <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  Comfort of Home
                </span>
                <span className="text-teal-600 font-black">+</span>
                <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  Personalized Attention
                </span>
                <span className="text-teal-600 font-black">+</span>
                <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  Family Involvement
                </span>
              </div>
            </div>

            {/* 4 Visual Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl bg-white border border-slate-200 hover:border-teal-500/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-start"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${item.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Medical Disclaimer Box */}
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 flex items-start gap-3 text-xs text-teal-900">
              <ShieldAlert className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="font-semibold">Medical Assessment Note:</strong> Healthcare services are provided according to individual patient requirements, doctor prescriptions, and professional clinical assessment.
              </p>
            </div>

            {/* CTA row */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-teal-800 hover:text-teal-900 font-bold text-sm bg-teal-100/80 hover:bg-teal-200/80 px-5 py-2.5 rounded-xl transition-colors"
              >
                <span>Consult Our Care Team in Patna</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
