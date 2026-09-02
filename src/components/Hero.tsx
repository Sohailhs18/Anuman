import React from 'react';
import { Phone, Calendar, ShieldCheck, HeartPulse, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import heroImg from '../assets/images/home_healthcare_hero_1788374638547.jpg';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-32 pb-16 md:pb-24 lg:pt-36 overflow-hidden bg-slate-50 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/90 border border-teal-200 text-teal-950 text-xs sm:text-sm font-semibold mb-5 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>A Complete Home Care Solution • Patna, Bihar</span>
              <span className="hidden sm:inline text-teal-400">|</span>
              <span className="hidden sm:inline text-teal-800 font-bold">24×7 Available</span>
            </div>

            {/* Brand Title */}
            <p className="text-teal-800 font-extrabold uppercase tracking-wider text-xs sm:text-sm mb-2 font-heading">
              ANUMAN HOME HEALTH CARE CENTRE
            </p>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6 font-heading">
              Hospital-Grade Healthcare,{' '}
              <span className="text-teal-800">
                in the Comfort of Home.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
              Compassionate, hospital-level medical attention delivered by certified nurses (GNM/B.Sc), trained GDA attendants, and visiting physicians across Patna. From post-operative recovery to oxygen therapy and 24-hour bedside care.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenBooking}
                id="hero-book-btn"
                className="inline-flex items-center justify-center gap-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Home Care</span>
              </button>

              <a
                href="tel:7463091878"
                id="hero-call-btn"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-base px-6 py-3.5 rounded-xl border border-slate-300 shadow-2xs transition-all duration-200"
              >
                <Phone className="w-5 h-5 text-teal-700" />
                <span>Call 7463091878</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Safe & Reliable</p>
                  <p className="text-[11px] text-slate-500">Verified Clinical Staff</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">24×7 Care Support</p>
                  <p className="text-[11px] text-slate-500">Day & Night Shifts</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Patna & Surrounds</p>
                  <p className="text-[11px] text-slate-500">Rapid Home Visit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-200 aspect-[4/3]">
                <img
                  src={heroImg}
                  alt="Compassionate home healthcare nurse checking vitals of an elderly patient in home comfort in Patna"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                
                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                    Hospital-Grade Bedside Care
                  </p>
                  <p className="text-sm sm:text-base font-bold text-white drop-shadow-xs">
                    In The Comfort & Dignity of Your Home
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: 24/7 Careline */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Immediate Support</div>
                  <div className="text-xs font-bold text-slate-900">24×7 Helpline</div>
                </div>
              </div>

              {/* Floating Badge 2: Experienced Staff */}
              <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Certified GNM & B.Sc. Nurses</div>
                  <div className="text-[11px] text-slate-500">Trained GDA Attendants</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
