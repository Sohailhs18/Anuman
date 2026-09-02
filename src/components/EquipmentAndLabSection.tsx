import React, { useState } from 'react';
import {
  Wrench,
  TestTube2,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Truck,
  FileSpreadsheet,
  HeartPulse,
  Wind
} from 'lucide-react';
import {
  MEDICAL_EQUIPMENT_LIST,
  LAB_PACKAGES_LIST,
  MedicalEquipmentItem,
  LabPackageItem
} from '../data/servicesData';

interface EquipmentAndLabSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const EquipmentAndLabSection: React.FC<EquipmentAndLabSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'equipment' | 'lab'>('equipment');

  return (
    <section id="equipment-lab" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            Equipment Rental & Diagnostics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Medical Equipment & Free Home Lab Collection
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Hospital-grade ICU equipment delivered & calibrated at home in Patna, plus certified pathology sample collection without doorstep pickup charges.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveTab('equipment')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'equipment'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wind className="w-4 h-4" />
              <span>Rental Medical Equipment & Oxygen (6)</span>
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'lab'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TestTube2 className="w-4 h-4" />
              <span>Laboratory Tests (Free Home Collection)</span>
            </button>
          </div>
        </div>

        {/* Equipment Tab Content */}
        {activeTab === 'equipment' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {MEDICAL_EQUIPMENT_LIST.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-teal-500/80 transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Truck className="w-3.5 h-3.5" />
                        <span>{item.setupTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 font-heading">
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {item.indication}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-200 mb-4">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenBooking(`Rental Equipment: ${item.name}`)}
                      className="flex-1 py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors text-center"
                    >
                      Book / Rent in Patna
                    </button>
                    <a
                      href={`https://wa.me/917463091878?text=${encodeURIComponent(
                        `Hello Anuman Care, I would like to inquire about renting: ${item.name} in Patna.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Equipment Delivery Guarantee Box */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between flex-wrap gap-4 text-xs text-teal-900">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-teal-700 flex-shrink-0" />
                <span>
                  <strong>Doorstep Installation & Training:</strong> Our clinical technician delivers, sanitizes, and trains family caretakers on operating oxygen concentrators, hospital beds, and suction units safely.
                </span>
              </div>
              <a
                href="tel:7463091878"
                className="font-bold text-teal-800 underline hover:text-teal-950 whitespace-nowrap"
              >
                Emergency Dispatch Helpline: 7463091878
              </a>
            </div>
          </div>
        )}

        {/* Lab Tests Tab Content */}
        {activeTab === 'lab' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {LAB_PACKAGES_LIST.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-teal-500/80 transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                        {pkg.parameterCount}
                      </span>
                      <span className="text-[11px] font-semibold text-teal-700">
                        Free Home Pickup
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 font-heading leading-snug">
                      {pkg.name}
                    </h3>

                    <p className="text-xs text-slate-600 mb-3">
                      <strong>Best for:</strong> {pkg.recommendedFor}
                    </p>

                    <div className="space-y-1 pt-3 border-t border-slate-200 mb-4 text-xs text-slate-700">
                      <p className="font-semibold text-slate-800 mb-1">Key Tests Included:</p>
                      {pkg.testsIncluded.map((t, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 mb-3 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span>Report: {pkg.reportTime}</span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(`Lab Test at Home: ${pkg.name}`)}
                      className="w-full py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors text-center"
                    >
                      Schedule Free Sample Pickup
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Lab Transparency Banner */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-700">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-teal-700 flex-shrink-0" />
                <span>
                  <strong>NABL-Standard Quality Testing:</strong> Phlebotomists follow sterile barcoded vacutainer protocols. Reports are verified by qualified pathologists and delivered directly via WhatsApp PDF and email.
                </span>
              </div>
              <a
                href="https://wa.me/917463091878?text=Hello%20Anuman%20Care,%20I%20want%20to%20book%20a%20blood%20test%20with%20free%20home%20collection%20in%20Patna."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-teal-700 underline hover:text-teal-900 whitespace-nowrap"
              >
                Book via WhatsApp
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
