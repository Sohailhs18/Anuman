/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CarePlanAdvisor } from './components/CarePlanAdvisor';
import { EquipmentAndLabSection } from './components/EquipmentAndLabSection';
import { PatnaCoverageGuide } from './components/PatnaCoverageGuide';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { SupportBanner } from './components/SupportBanner';
import { PatientGuide } from './components/PatientGuide';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileActionBar } from './components/MobileActionBar';
import { BookingModal } from './components/BookingModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CareersModal } from './components/CareersModal';
import { ServiceItem } from './data/servicesData';
import { CareInquiry } from './types/appointment';
import {
  getStoredAppointments,
  addAppointment,
  isAdminAuthenticated,
  logoutAdmin,
} from './services/appointmentsStorage';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);
  const [prefilledServiceName, setPrefilledServiceName] = useState('');

  // Admin Portal States
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const [inquiries, setInquiries] = useState<CareInquiry[]>(() => {
    return getStoredAppointments();
  });

  // Keep state in sync with local storage changes (or across tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      setInquiries(getStoredAppointments());
      setIsAdmin(isAdminAuthenticated());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Secret staff shortcut (Ctrl+Shift+A / Alt+Shift+A) & #admin URL hash listener
  useEffect(() => {
    const checkHashOrUrl = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=')) {
        if (isAdminAuthenticated()) {
          setIsAdminDashboardOpen(true);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };
    checkHashOrUrl();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (isAdminAuthenticated()) {
          setIsAdminDashboardOpen(true);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkHashOrUrl);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHashOrUrl);
    };
  }, []);

  const handleInquiryCreated = async (inquiry: CareInquiry) => {
    const created = await addAppointment({
      id: inquiry.id,
      name: inquiry.name,
      phone: inquiry.phone,
      service: inquiry.service,
      preferredDate: inquiry.preferredDate,
      preferredTime: inquiry.preferredTime,
      address: inquiry.address,
      notes: inquiry.notes,
      status: inquiry.status || 'In Review',
      source: 'Booking Modal',
    });

    setInquiries((prev) => [created, ...prev.filter((item) => item.id !== created.id)]);
  };

  const handleOpenBooking = (serviceName?: string) => {
    setPrefilledServiceName(serviceName || '');
    setIsBookingModalOpen(true);
  };

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminLoginOpen(false);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    setIsAdmin(false);
    setIsAdminDashboardOpen(false);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleCloseServiceModal = () => {
    setSelectedService(null);
  };

  const handleRequestFromModal = (serviceName: string) => {
    setSelectedService(null);
    handleOpenBooking(serviceName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenInquiries={() => setIsAdminDashboardOpen(true)}
        inquiriesCount={inquiries.length}
        onOpenAdminLogin={handleOpenAdmin}
        isAdmin={isAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Trust Highlights Banner */}
        <TrustStats />

        {/* 3. Dedicated About & Clinical Leadership Section */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Complete Services Catalog (General & Specialized with Instant Filtering) */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Interactive Care Plan Advisor */}
        <CarePlanAdvisor onOpenBooking={handleOpenBooking} />

        {/* 7. Rental Medical Equipment & Free Home Lab Collection */}
        <EquipmentAndLabSection onOpenBooking={handleOpenBooking} />

        {/* 8. Patna Locality Coverage & Dispatch Checker */}
        <PatnaCoverageGuide />

        {/* 9. Clinical Standards & Commitments */}
        <WhyChooseUs />

        {/* 10. How It Works - 4-Step Patient Journey */}
        <HowItWorks onOpenBooking={() => handleOpenBooking()} />

        {/* 11. 24x7 Dedicated High-Contrast Emergency Support CTA */}
        <SupportBanner onOpenBooking={() => handleOpenBooking()} />

        {/* 12. Patient & Caretaker Information Guide */}
        <PatientGuide />

        {/* 13. Contact Section with Request Form & Interactive Map */}
        <ContactSection
          initialServiceName={prefilledServiceName}
          onInquiryCreated={handleInquiryCreated}
        />
      </main>

      {/* 14. Comprehensive Footer with Careers, Designer Credit & Staff Portal */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenCareers={() => setIsCareersModalOpen(true)}
        onOpenAdminLogin={handleOpenAdmin}
        isAdmin={isAdmin}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={handleCloseServiceModal}
        onRequestService={handleRequestFromModal}
      />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefilledService={prefilledServiceName}
        onInquiryCreated={handleInquiryCreated}
      />

      {/* Careers / Job Application Modal */}
      <CareersModal
        isOpen={isCareersModalOpen}
        onClose={() => setIsCareersModalOpen(false)}
      />

      {/* Staff / Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Staff / Admin Full-Screen Operations Desk */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleAdminLogout}
      />

      {/* Discreet floating staff desk pill when logged in and browsing public website */}
      {isAdmin && !isAdminDashboardOpen && (
        <div className="fixed bottom-16 sm:bottom-6 left-3 sm:left-4 z-40 bg-slate-950/95 text-white border border-teal-500/40 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-2xl flex items-center gap-2.5 sm:gap-3 backdrop-blur-md animate-in slide-in-from-bottom-4 max-w-[calc(100vw-24px)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold text-teal-300 whitespace-nowrap">Staff Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAdminDashboardOpen(true)}
              className="px-2.5 py-1 bg-teal-700 hover:bg-teal-600 text-white rounded-lg text-[11px] sm:text-xs font-bold transition-all shadow-xs whitespace-nowrap"
            >
              Operations Desk
            </button>
            <button
              onClick={handleAdminLogout}
              className="text-[11px] sm:text-xs text-slate-400 hover:text-red-400 transition-colors px-1 whitespace-nowrap"
              title="Sign Out"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Persistent Floating WhatsApp Help Button (Desktop & Tablet) */}
      <FloatingWhatsApp />

      {/* Sticky Mobile Quick Action Bar (Mobile Only) */}
      <MobileActionBar onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
