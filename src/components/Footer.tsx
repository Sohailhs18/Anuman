import React from 'react';
import { Phone, MapPin, MessageCircle, Navigation, ShieldCheck, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SERVICES_LIST } from '../data/servicesData';

interface FooterProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
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

        {/* Brand Slogan Ribbon */}
        <div className="py-6 text-center text-sm font-semibold text-teal-400 border-b border-slate-800/80">
          "Quality Care at Home • Your Health, Our Priority"
        </div>

        {/* Bottom Medical Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} Anuman Home Health Care Centre. All rights reserved.
          </p>
          <p className="max-w-xl text-[11px] leading-relaxed text-slate-400">
            <strong>Medical Disclaimer:</strong> Healthcare services are provided according to individual patient requirements and professional medical assessment. For sudden life-threatening emergencies, please arrange immediate hospital transport.
          </p>
        </div>

      </div>
    </footer>
  );
};
