import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  Navigation,
  Building2,
  ShieldCheck,
  Search
} from 'lucide-react';
import { PATNA_LOCALITIES, PatnaLocality } from '../data/servicesData';

export const PatnaCoverageGuide: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedLocality, setSelectedLocality] = useState<PatnaLocality>(PATNA_LOCALITIES[0]);

  const filtered = PATNA_LOCALITIES.filter((loc) =>
    loc.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    loc.zone.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <section id="patna-coverage" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-100/70 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            <span>Patna Coverage & Dispatch Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Serving Every Neighbourhood in Patna
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Headquartered at Bailey Road, Rukanpura with rapid clinical nurse and medical attendant allocation across Patna and Greater Danapur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Locality Selector List */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Select Your Area in Patna
              </h3>
              <span className="text-xs text-teal-700 font-semibold">
                {PATNA_LOCALITIES.length} Active Zones
              </span>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search area (e.g. Bailey Road, Boring Road, Kankarbagh)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            {/* Localities List */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {filtered.map((loc) => {
                const isSelected = selectedLocality.name === loc.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() => setSelectedLocality(loc)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-teal-50 border-teal-500 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {loc.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{loc.zone}</p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3" />
                        <span>{loc.responseTime}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Area Details & Fast Action Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>24×7 Active Care Coverage Zone</span>
            </div>

            <h3 className="text-2xl font-bold font-heading text-white mb-1">
              {selectedLocality.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Sector: <span className="text-teal-300 font-semibold">{selectedLocality.zone}</span>
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 mb-6">
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Avg. Response Time
                </p>
                <p className="text-base sm:text-lg font-black text-teal-400 mt-0.5">
                  {selectedLocality.responseTime}
                </p>
                <p className="text-[10px] text-slate-400">Emergency & scheduled visits</p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Shift Availability
                </p>
                <p className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">
                  12h & 24h Shifts
                </p>
                <p className="text-[10px] text-slate-400">Resident or hourly visit</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Frequently Requested in {selectedLocality.name}:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedLocality.popularServices.map((srv, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs font-medium"
                  >
                    • {srv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:7463091878"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-colors shadow-md"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call Care Desk: 7463091878</span>
              </a>

              <a
                href={`https://wa.me/917463091878?text=${encodeURIComponent(
                  `Hello Anuman Care, I am looking for home healthcare services in ${selectedLocality.name}, Patna.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Care Desk</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 text-center">
              Our care coordinator confirms staff arrival time directly upon your call.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
