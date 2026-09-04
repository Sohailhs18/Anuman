import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, ShieldCheck, Phone, Check, Sparkles, Syringe, Stethoscope, Heart, Activity, FileCheck2, Clock } from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcon';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenBooking
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterType, setFilterType] = useState<'all' | 'general' | 'specialized'>('all');

  const categories = [
    { label: 'All', icon: '🌟' },
    { label: 'Nursing & Attendant', icon: '🩺' },
    { label: 'Specialized Procedures', icon: '💉' },
    { label: 'Elder & Child Care', icon: '👵' },
    { label: 'Emergency & Equipment', icon: '🫁' },
    { label: 'Diagnostics & Pharmacy', icon: '🧪' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_LIST.filter((item) => {
      // Type filter
      if (filterType !== 'all' && item.type !== filterType) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.shortDesc.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory, filterType]);

  const generalCount = SERVICES_LIST.filter((s) => s.type === 'general').length;
  const specializedCount = SERVICES_LIST.filter((s) => s.type === 'specialized').length;

  return (
    <section id="services" className="py-20 md:py-24 bg-slate-50/70 border-t border-slate-200/80 relative scroll-mt-20">
      {/* Target anchor for specialized-services link */}
      <div id="specialized-services" className="absolute -top-24 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Complete Home Care Catalog • Patna</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Certified Bedside Care & Clinical Procedures
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed font-normal">
            From 12-hour/24-hour bedside nursing and senior attendant care to sterile catheterization and post-op wound dressings — all supervised under clinical protocols across Patna.
          </p>
        </div>

        {/* 4 Clinical Safety Commitments Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">100% Sterile Kits</p>
              <p className="text-[11px] text-slate-500">Single-use pre-sealed disposables</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
            <FileCheck2 className="w-5 h-5 text-teal-700 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Doctor Prescription</p>
              <p className="text-[11px] text-slate-500">Dosage & clinical verification</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
            <Stethoscope className="w-5 h-5 text-teal-700 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Registered Staff</p>
              <p className="text-[11px] text-slate-500">GNM & B.Sc Nursing certified</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
            <Clock className="w-5 h-5 text-teal-700 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">45–60 Min Dispatch</p>
              <p className="text-[11px] text-slate-500">Rapid Patna coverage</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between">
            
            {/* Type Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  filterType === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Services ({SERVICES_LIST.length})
              </button>
              <button
                onClick={() => setFilterType('general')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  filterType === 'general'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-700'
                }`}
              >
                General Home Care ({generalCount})
              </button>
              <button
                onClick={() => setFilterType('specialized')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  filterType === 'specialized'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-700'
                }`}
              >
                Sterile Procedures ({specializedCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search procedures, nursing, equipment, injections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3.5 mt-3.5 border-t border-slate-100 pb-0.5 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedCategory === cat.label
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <p className="text-base font-bold text-slate-800">No matching clinical services found.</p>
            <p className="text-xs text-slate-500 mt-1">Try a different keyword or reset filters to browse all 29 services.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setFilterType('all');
              }}
              className="mt-4 px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-teal-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-800 border border-teal-100/80 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors flex-shrink-0 shadow-2xs">
                      <ServiceIcon name={service.iconName} className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        service.type === 'specialized'
                          ? 'bg-sky-50 text-sky-800 border border-sky-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {service.type === 'specialized' ? 'Sterile Procedure' : 'Bedside Care'}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="text-[11px] font-bold text-teal-700 block mb-1">
                    {service.category}
                  </span>

                  {/* Service Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors font-heading mb-1.5 leading-snug">
                    {service.name}
                  </h3>

                  {/* Short Explanation */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    <span>View Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.name)}
                    className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-700 text-teal-800 hover:text-white rounded-xl text-xs font-bold transition-all border border-teal-200/80 active:scale-95"
                  >
                    Book In-Home
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fast Booking Banner Strip */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tailored Hospital-To-Home Setup</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-heading">
              Need a Custom Care Shift or Specific Doctor Protocol?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl font-normal leading-relaxed">
              Our clinical care supervisor evaluates prescriptions directly to organize custom 12h/24h ICU nursing, post-surgery rehabilitation, and equipment rentals in Patna.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <a
              href="tel:7463091878"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              <span>Call 7463091878</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <span>Request Care Now</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
