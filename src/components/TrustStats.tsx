import React from 'react';
import { ShieldCheck, Users, Clock, Award, CheckCircle2 } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const metrics = [
    {
      stat: '5,000+',
      label: 'Home Visits Completed',
      detail: 'Families cared for across Patna, Danapur & outskirts',
      icon: Users,
      badge: 'Patna Verified',
    },
    {
      stat: '100%',
      label: 'Certified & Verified',
      detail: 'GNM/B.Sc. registered nurses & police-checked GDA staff',
      icon: ShieldCheck,
      badge: 'Hospital-Grade',
    },
    {
      stat: '45–60m',
      label: 'Average Dispatch Time',
      detail: 'Prompt home arrival for acute procedures & injections',
      icon: Clock,
      badge: 'Rapid Response',
    },
    {
      stat: '24×7',
      label: 'Doctor Supervision',
      detail: 'Daily vitals charting & continuous medical oversight',
      icon: Award,
      badge: 'Zero Compromise',
    },
  ];

  return (
    <section className="relative z-10 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90 p-5 sm:p-7 backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-start gap-4 ${idx > 0 ? 'pt-5 sm:pt-0 lg:pl-6' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 border border-teal-200/70 flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                      {item.stat}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100/70 text-teal-800 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                    {item.label}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-normal">
                    {item.detail}
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
