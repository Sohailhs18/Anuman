import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Clock, MapPin, FileText, Bell } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenInquiries?: () => void;
  inquiriesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenInquiries,
  inquiriesCount = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'General Services', href: '#services' },
    { name: 'Specialized Procedures', href: '#specialized-services' },
    { name: 'Care Advisor', href: '#care-advisor' },
    { name: 'Equipment & Lab', href: '#equipment-lab' },
    { name: 'Patna Coverage', href: '#patna-coverage' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Emergency & Clinical Bar */}
      <div
        className={`bg-slate-950 text-slate-200 text-xs py-1.5 px-4 transition-all duration-300 border-b border-slate-800 ${
          isScrolled ? 'hidden md:hidden' : 'block'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-teal-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>24×7 Active Care Support</span>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div className="hidden sm:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Bailey Road, Road No. 3, Rukanpura, Patna – 800014</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {inquiriesCount > 0 && onOpenInquiries && (
              <button
                onClick={onOpenInquiries}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-800/80 text-teal-200 text-[11px] font-bold hover:bg-teal-700 transition-colors"
              >
                <FileText className="w-3 h-3 text-teal-300" />
                <span>My Inquiries ({inquiriesCount})</span>
              </button>
            )}

            <a
              href="tel:7463091878"
              id="topbar-call-link"
              className="flex items-center gap-1.5 font-bold text-white hover:text-teal-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span>7463091878</span>
            </a>

            <span className="text-slate-700">|</span>

            <a
              href="https://wa.me/917463091878?text=Hello%20Anuman%20Home%20Health%20Care%20Centre,%20I%20would%20like%20to%20enquire%20about%20home%20healthcare%20services."
              target="_blank"
              rel="noopener noreferrer"
              id="topbar-whatsapp-link"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-md py-2 border-b border-slate-200/80'
            : 'bg-white/95 backdrop-blur-sm py-3 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center focus:outline-none"
            aria-label="Anuman Home Health Care Centre Home"
          >
            <BrandLogo />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-slate-700 hover:text-teal-800 font-semibold text-xs py-1.5 px-2.5 rounded-lg transition-colors hover:bg-teal-50"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {inquiriesCount > 0 && onOpenInquiries && (
              <button
                onClick={onOpenInquiries}
                className="flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-xl transition-all border border-teal-200"
                title="View Active Requests"
              >
                <FileText className="w-3.5 h-3.5 text-teal-700" />
                <span>Inquiries ({inquiriesCount})</span>
              </button>
            )}

            <a
              href="tel:7463091878"
              id="nav-call-btn"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-all border border-slate-300"
              title="Call 24/7 Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>7463091878</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              id="nav-book-btn"
              className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <span>Book Home Care</span>
            </button>
          </div>

          {/* Mobile Hamburger & Inquiries Icon */}
          <div className="flex xl:hidden items-center gap-2">
            {inquiriesCount > 0 && onOpenInquiries && (
              <button
                onClick={onOpenInquiries}
                className="p-2 rounded-lg bg-teal-100 text-teal-900 relative"
                aria-label="View Inquiries"
              >
                <FileText className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {inquiriesCount}
                </span>
              </button>
            )}

            <a
              href="tel:7463091878"
              className="p-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-200"
              aria-label="Call Helpline"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-slate-800 hover:text-teal-700 font-semibold text-sm py-2 px-3 rounded-lg hover:bg-teal-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-xl shadow-md text-sm"
            >
              Book Home Care
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:7463091878"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span>Call 7463091878</span>
              </a>

              <a
                href="https://wa.me/917463091878?text=Hello%20Anuman%20Home%20Health%20Care%20Centre,%20I%20would%20like%20to%20enquire%20about%20home%20healthcare%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
