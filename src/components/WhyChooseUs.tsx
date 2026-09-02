import React from 'react';
import { WHY_CHOOSE_US_ITEMS } from '../data/servicesData';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  BadgePercent,
  GraduationCap,
  Sparkles,
  Clock,
  Home,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck,
    Award,
    HeartHandshake,
    BadgePercent,
    GraduationCap,
    Sparkles,
    Clock,
    Home
  };

  const clinicalGuarantees = [
    'Police Verified Staff',
    'Certified GNM / B.Sc. Nurses',
    '1-on-1 Personalized Attention',
    'No Hidden Charges',
    'Ongoing Medical Supervision',
    'Sterile Single-Use Packs',
    'Immediate Shift Replacements',
    'Family Comfort & Dignity'
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            Clinical Standards & Ethics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Why Families in Patna Choose Anuman Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Built on hospital-grade clinical diligence, verified credentials, transparent communication, and genuine empathy for patients.
          </p>
        </div>

        {/* 8 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item, index) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            const guarantee = clinicalGuarantees[index] || 'Verified Standard';
            return (
              <div
                key={index}
                className="group relative bg-slate-50/80 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-600/70 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon */}
                  <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight uppercase font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 mb-3">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{guarantee}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
