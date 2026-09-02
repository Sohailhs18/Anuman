import React from 'react';
import { PATIENT_CARE_GUIDELINES } from '../data/servicesData';
import { FileText, Sparkles, PhoneCall, CheckSquare, ShieldCheck, AlertCircle } from 'lucide-react';

export const PatientGuide: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    FileText,
    Sparkles,
    PhoneCall,
    CheckSquare
  };

  return (
    <section id="care-guide" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            Patient & Caretaker Information
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Preparing for Your Home Care Visit
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Essential guidelines to ensure a smooth, hygienic, and comforting care session for your patient.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PATIENT_CARE_GUIDELINES.map((item, idx) => {
            const Icon = iconMap[item.icon] || FileText;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-teal-700 flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Medical Ethics Transparency Box */}
        <div className="bg-teal-50/50 rounded-2xl p-6 sm:p-8 border border-teal-200/80">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center flex-shrink-0 mt-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  Our Professional & Clinical Commitment
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                  We maintain strict aseptic measures with sterilized instruments and single-use consumables. All nursing procedures and medication administrations are strictly carried out in accordance with valid physician prescriptions and verified patient tolerance.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 text-xs text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-800">Patna Care Hub:</span> Bailey Road, Rukanpura
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
