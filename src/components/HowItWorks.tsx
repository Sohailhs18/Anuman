import React from 'react';
import { CARE_PROCESS_STEPS } from '../data/servicesData';
import { PhoneCall, FileText, UserCheck, HeartPulse, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const stepIcons = [PhoneCall, FileText, UserCheck, HeartPulse];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-100/70 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-wider mb-3">
            Care Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Getting qualified home nursing and medical support in Patna is simple, clear, and reassuring.
          </p>
        </div>

        {/* 4 Steps Horizontal Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {CARE_PROCESS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <div
                key={step.step}
                className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-teal-700 font-heading">
                      {step.step}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 text-teal-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                {/* Sub-pill action */}
                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-teal-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  <span>{step.action}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 pl-4 pr-3 bg-white rounded-2xl border border-slate-200 shadow-md">
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              Ready to schedule a nursing visit or discuss patient care in Patna?
            </span>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
