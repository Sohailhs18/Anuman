import React from 'react';
import { Shield, UserCheck, Heart, CircleDollarSign } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const highlights = [
    {
      icon: Shield,
      title: 'Safe & Reliable',
      desc: 'Hospital-level infection control & sterile clinical protocols practiced at home.',
      color: 'text-teal-700 bg-teal-50 border-teal-100',
    },
    {
      icon: UserCheck,
      title: 'Experienced Staff',
      desc: 'Verified GNM/B.Sc. registered nurses and trained General Duty Assistants (GDA).',
      color: 'text-sky-700 bg-sky-50 border-sky-100',
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      desc: '1-on-1 dedicated attention tailored directly to your treating doctor’s advice.',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
    {
      icon: CircleDollarSign,
      title: 'Affordable & Transparent',
      desc: 'Clear upfront pricing for short visits, 12-hour shifts, or 24-hour long-term care.',
      color: 'text-slate-700 bg-slate-100 border-slate-200',
    },
  ];

  return (
    <section className="relative z-10 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 ${idx > 0 ? 'pt-5 sm:pt-0 lg:pl-6' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
