/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SpecializedServicesSection } from './components/SpecializedServicesSection';
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
import { ActiveInquiriesDrawer, CareInquiry } from './components/ActiveInquiriesDrawer';
import { ServiceItem } from './data/servicesData';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [prefilledServiceName, setPrefilledServiceName] = useState('');
  const [isInquiriesDrawerOpen, setIsInquiriesDrawerOpen] = useState(false);

  const [inquiries, setInquiries] = useState<CareInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('anuman_care_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleInquiryCreated = (inquiry: CareInquiry) => {
    setInquiries((prev) => {
      const next = [inquiry, ...prev];
      try {
        localStorage.setItem('anuman_care_inquiries', JSON.stringify(next));
      } catch {
        // Fallback for private browsing storage restrictions
      }
      return next;
    });
  };

  const handleRemoveInquiry = (id: string) => {
    setInquiries((prev) => {
      const next = prev.filter((i) => i.id !== id);
      try {
        localStorage.setItem('anuman_care_inquiries', JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  };

  const handleClearInquiries = () => {
    setInquiries([]);
    try {
      localStorage.removeItem('anuman_care_inquiries');
    } catch {
      // Fallback
    }
  };

  const handleOpenBooking = (serviceName?: string) => {
    setPrefilledServiceName(serviceName || '');
    setIsBookingModalOpen(true);
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
        onOpenInquiries={() => setIsInquiriesDrawerOpen(true)}
        inquiriesCount={inquiries.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Trust Highlights Banner */}
        <TrustStats />

        {/* 3. Dedicated About & Clinical Leadership Section */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Complete Services Catalog (General & Specialized) */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Sterile Clinical Procedures & Registered Nursing (Specialized column from poster) */}
        <SpecializedServicesSection
          onSelectService={handleSelectService}
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. Interactive Care Plan Advisor */}
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

      {/* 14. Comprehensive Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

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

      {/* Active Care Inquiries Drawer */}
      <ActiveInquiriesDrawer
        isOpen={isInquiriesDrawerOpen}
        onClose={() => setIsInquiriesDrawerOpen(false)}
        inquiries={inquiries}
        onClearInquiries={handleClearInquiries}
        onRemoveInquiry={handleRemoveInquiry}
      />

      {/* Persistent Floating WhatsApp Help Button (Desktop & Tablet) */}
      <FloatingWhatsApp />

      {/* Sticky Mobile Quick Action Bar (Mobile Only) */}
      <MobileActionBar onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
