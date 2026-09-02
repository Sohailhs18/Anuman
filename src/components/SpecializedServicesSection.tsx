import React, { useState } from 'react';
import {
  Syringe,
  ShieldCheck,
  Clock,
  CheckCircle2,
  FileCheck2,
  Phone,
  MessageCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcon';

interface SpecializedServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const SpecializedServicesSection: React.FC<SpecializedServicesProps> = ({
  onSelectService,
  onOpenBooking
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const specializedItems = SERVICES_LIST.filter((s) => s.type === 'specialized');

  const procedureCategories = [
    { id: 'all', label: 'All Procedures (14)' },
    { id: 'catheter-tubes', label: 'Catheter & Ryles Tube' },
    { id: 'infusion-injections', label: 'IV Cannulation & Injections' },
    { id: 'wound-postop', label: 'Wound Dressing & Post-Op' },
    { id: 'respiratory-trachea', label: 'Tracheostomy & Suction' }
  ];

  const filterByCategory = (item: ServiceItem) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'catheter-tubes') {
      return item.id.includes('catheter') || item.id.includes('ryles');
    }
    if (activeCategory === 'infusion-injections') {
      return item.id.includes('iv') || item.id.includes('injection');
    }
    if (activeCategory === 'wound-postop') {
      return item.id.includes('wound') || item.id.includes('post-operative') || item.id.includes('stitch');
    }
    if (activeCategory === 'respiratory-trachea') {
      return item.id.includes('suctioning') || item.id.includes('nebulization') || item.id.includes('tracheostomy') || item.id.includes('24x7');
    }
    return true;
  };

  const filtered = specializedItems.filter(filterByCategory);

  return (
    <section
      id="specialized-services"
      className="py-20 md:py-28 bg-slate-900 text-slate-100 relative overflow-hidden"
    >
      {/* Background Medical Hairline Grid */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-slate-800">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-950 border border-teal-700/80 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Syringe className="w-3.5 h-3.5 text-teal-400" />
              <span>Specialized Clinical Services • Patna</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
              Sterile Clinical Procedures & Registered Nursing
            </h2>

            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Carried out strictly by certified GNM / B.Sc. nurses using sterile, disposable medical supplies under physician prescriptions. Avoid stressful hospital queues for routine medical procedures.
            </p>
          </div>

          {/* Rapid Clinical Protocol Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 text-xs text-slate-300 bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-teal-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>Hospital Aseptic Protocol Practiced</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>Rapid Nurse Allocation Across Patna (30-60 mins)</span>
            </div>
          </div>
        </div>

        {/* 4 Clinical Safety Commitments Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white leading-tight">100% Single-Use</p>
              <p className="text-[11px] text-slate-400">Sterile disposable trays</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5 flex items-center gap-3">
            <FileCheck2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white leading-tight">Doctor Prescription</p>
              <p className="text-[11px] text-slate-400">Strict dosage verification</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white leading-tight">Vetted Registered Nurses</p>
              <p className="text-[11px] text-slate-400">GNM / B.Sc Nursing certified</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5 flex items-center gap-3">
            <Clock className="w-5 h-5 text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white leading-tight">Post-Procedure Vitals</p>
              <p className="text-[11px] text-slate-400">30-minute monitoring</p>
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {procedureCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Specialized Procedures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              id={`procedure-${item.id}`}
              className="bg-slate-800/90 border border-slate-700/90 hover:border-teal-400/80 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between hover:bg-slate-800 group shadow-md"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-teal-950 border border-teal-700/60 text-teal-300 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                    <ServiceIcon name={item.iconName} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-teal-300 border border-slate-700">
                    Clinical Procedure
                  </span>
                </div>

                {/* Procedure Title */}
                <h3 className="text-lg font-bold text-white font-heading mb-2 group-hover:text-teal-300 transition-colors">
                  {item.name}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item.shortDesc}
                </p>

                {/* Clinical Guarantee Mini-List */}
                <div className="space-y-1.5 pt-3 border-t border-slate-700/80 mb-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                    <span className="truncate">Administered by: Registered GNM Nurse</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span className="truncate">Sterile single-use consumables</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectService(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Clinical Details</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenBooking(item.name)}
                    className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-xs"
                  >
                    Book Visit
                  </button>

                  <a
                    href={`https://wa.me/917463091878?text=${encodeURIComponent(
                      `Hello Anuman Care, I need urgent procedure assistance for: ${item.name} in Patna.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-700/60 transition-colors"
                    title="Quick WhatsApp Booking"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Fast Clinical Triage Strip */}
        <div className="mt-12 bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center flex-shrink-0 mt-1">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                Urgent Nursing or Tube Replacement in Patna?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                If a Foley catheter has blocked, a Ryles tube has slipped, or an urgent IV dose is due, our emergency nurse dispatch team can arrive at your Patna residence within 30 to 60 minutes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <a
              href="tel:7463091878"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call 7463091878</span>
            </a>
            <a
              href="https://wa.me/917463091878?text=EMERGENCY%20CARE:%20I%20need%20urgent%20nursing%20procedure%20assistance%20in%20Patna."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Urgent WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
