import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, ShieldCheck, Phone, Check } from 'lucide-react';
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
    'All',
    'Nursing & Attendant',
    'Specialized Procedures',
    'Elder & Child Care',
    'Diagnostics & Pharmacy',
    'Emergency & Equipment'
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
    <section id="services" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-100/70 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-wider mb-3">
            Comprehensive Healthcare at Home
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Healthcare & Clinical Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Complete bedside medical support delivered by qualified doctors, registered nurses, and certified attendants across Patna.
          </p>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
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
                Specialized Procedures ({specializedCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search services (e.g. Catheter, ECG, Nurse, Oxygen)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-slate-100 pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2 flex-shrink-0">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedCategory === category
                    ? 'bg-teal-100 text-teal-900 border border-teal-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <p className="text-base font-semibold text-slate-700">No services match your search.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-teal-500/80 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                      <ServiceIcon name={service.iconName} className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        service.type === 'specialized'
                          ? 'bg-sky-50 text-sky-800 border border-sky-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {service.type === 'specialized' ? 'Specialized' : 'General'}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="text-[11px] font-semibold text-teal-700 block mb-1">
                    {service.category}
                  </span>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors font-heading mb-2">
                    {service.name}
                  </h3>

                  {/* Short Explanation */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.name)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 rounded-lg text-xs font-semibold transition-colors border border-slate-200"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Fast Booking Strip */}
        <div className="mt-14 bg-gradient-to-r from-teal-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold font-heading">
              Need a Custom Care Package or Unlisted Clinical Requirement?
            </h4>
            <p className="text-sm text-teal-200 mt-1 max-w-xl">
              Our clinical coordinator evaluates specific doctor prescriptions to organize bespoke home ICU or long-term nursing setups in Patna.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:7463091878"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-teal-50 text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              <span>Call 7463091878</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <span>Request Care Now</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
