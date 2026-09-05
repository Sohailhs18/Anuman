import React from 'react';
import { Phone, MapPin, MessageCircle, Navigation, ShieldCheck, Heart, Sparkles, Briefcase, Lock, UserPlus } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SERVICES_LIST } from '../data/servicesData';

interface FooterProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenCareers?: () => void;
  onOpenAdminLogin?: () => void;
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenCareers, onOpenAdminLogin, isAdmin = false }) => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'General Services', href: '#services' },
    { name: 'Specialized Procedures', href: '#specialized-services' },
    { name: 'Care Plan Advisor', href: '#care-advisor' },
    { name: 'Equipment & Lab Tests', href: '#equipment-lab' },
    { name: 'Patna Coverage Guide', href: '#patna-coverage' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Patient & Caretaker Guide', href: '#care-guide' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const popularServices = [
    'Certified Home Nurses',
    'Experienced GDA Staff',
    'Foley Catheterization',
    'Ryles Tube Insertion',
    'Wound Dressing (Major / Minor)',
    'On Call Doctors',
    'Laboratory Tests (Free Home Collection)',
    'Rental Medical Equipment',
    'Oxygen Therapy',
    'Elder Care at Home',
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="white" />
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              "We are the Anuman Home Health Care Centre. We provide hospital level professional medical care in the comfort of your home."
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-teal-300 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>A Complete Home Care Solution in Patna, Bihar</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="tel:7463091878"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-800/60 hover:bg-teal-700 text-teal-200 text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>7463091878</span>
              </a>
              <a
                href="https://wa.me/917463091878?text=Hello%20Anuman%20Home%20Health%20Care%20Centre,%20I%20would%20like%20to%20enquire%20about%20home%20healthcare%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              {onOpenCareers && (
                <li>
                  <button
                    onClick={onOpenCareers}
                    className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Careers / Work With Us</span>
                  </button>
                </li>
              )}
              {onOpenAdminLogin && (
                <li>
                  <button
                    onClick={onOpenAdminLogin}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isAdmin ? 'Operations Desk (Active)' : 'Admin & Staff Portal'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {popularServices.map((serviceName) => (
                <li key={serviceName}>
                  <button
                    onClick={() => onOpenBooking(serviceName)}
                    className="text-left hover:text-teal-300 transition-colors"
                  >
                    • {serviceName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Registered Office
            </h4>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <address className="not-italic leading-relaxed">
                Bailey Road, Road No. 3,
                <br />
                Adarsh Vihar Colony, Rukanpura,
                <br />
                Patna, Bihar – 800014
              </address>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400">
              <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <a href="tel:7463091878" className="hover:text-teal-300 transition-colors font-bold text-white">
                7463091878
              </a>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Bailey+Road,+Road+No.+3,+Adarsh+Vihar+Colony,+Rukanpura,+Patna,+Bihar+800014"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions on Google Maps</span>
            </a>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400">
                Active coverage in Bailey Road, Rukanpura, Danapur, Patliputra, Boring Road, Kankarbagh, and all Patna districts.
              </p>
            </div>
          </div>

        </div>

        {/* Careers & Recruitment Banner in the bottom */}
        {onOpenCareers && (
          <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/80 to-slate-900 border border-teal-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-800/40 border border-teal-500/30 text-teal-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                    Join Our Healthcare Team in Patna
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    We Are Hiring
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Are you a qualified Nurse (GNM / B.Sc), Patient Care Attendant (GDA), Physiotherapist, or Medical Technician? Join Patna’s premier home healthcare network with reliable daily/monthly compensation and clinical support.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenCareers}
              id="footer-career-apply-btn"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-95 flex-shrink-0 whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply for Healthcare Job (हमसे जुड़ें)</span>
            </button>
          </div>
        )}

        {/* Brand Slogan Ribbon & Design Credit */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 text-center sm:text-left">
          <div className="text-sm font-semibold text-teal-400">
            "Quality Care at Home • Your Health, Our Priority"
          </div>

          <div
            id="designer-credit-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Designed by <strong className="text-teal-400 font-semibold">Meer Sohail Hussain</strong></span>
          </div>
        </div>

        {/* Bottom Medical Disclaimer, Copyright & Clear Staff Access */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <div className="space-y-1.5">
            <p>
              © {new Date().getFullYear()} Anuman Home Health Care Centre. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 text-[11px]">
              <span className="text-slate-400">
                Designed by <strong className="text-teal-400 font-semibold">Meer Sohail Hussain</strong>
              </span>
              {onOpenAdminLogin && (
                <>
                  <span className="text-slate-700">•</span>
                  <button
                    onClick={onOpenAdminLogin}
                    id="footer-admin-btn"
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-teal-300 font-medium transition-colors"
                    title="Staff & Care Coordinator Portal"
                  >
                    <Lock className="w-3 h-3 text-teal-400" />
                    <span>{isAdmin ? 'Operations Desk (Active)' : 'Staff / Admin Portal'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="max-w-xl text-[11px] leading-relaxed text-slate-400">
            <strong>Medical Disclaimer:</strong> Healthcare services are provided according to individual patient requirements and professional medical assessment. For sudden life-threatening emergencies, please arrange immediate hospital transport.
          </p>
        </div>

      </div>
    </footer>
  );
};
