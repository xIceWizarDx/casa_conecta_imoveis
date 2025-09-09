import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import PropertyFilters from './components/PropertyFilters';
import FeaturedProperties from './components/FeaturedProperties';
import ExpertiseSection from './components/ExpertiseSection';
import TestimonialsSection from './components/TestimonialsSection';
import ConsultationHub from './components/ConsultationHub';
import NeighborhoodMap from './components/NeighborhoodMap';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';

const HomepagePremiumRealEstateConsultancy = () => {
  const [filters, setFilters] = useState({
    neighborhood: '',
    priceRange: '',
    propertyType: ''
  });

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e) => {
      const href = e?.target?.getAttribute('href');
      if (href && href?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    
    // Smooth scroll to properties section when filters are applied
    const propertiesSection = document.getElementById('listagem');
    if (propertiesSection) {
      propertiesSection?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Carousel - Full viewport section */}
        <HeroCarousel />
        
        {/* Property Filters - Properly spaced section */}
        <section className="section-spacing bg-surface">
          <div className="container-responsive">
            <PropertyFilters onFiltersChange={handleFiltersChange} />
          </div>
        </section>
        
        {/* Featured Properties - Well organized section */}
        <section className="section-spacing">
          <div className="container-responsive">
            <FeaturedProperties filters={filters} />
          </div>
        </section>
        
        {/* Expertise Section - Professional spacing */}
        <section className="section-spacing bg-surface">
          <div className="container-responsive">
            <ExpertiseSection />
          </div>
        </section>
        
        {/* Testimonials - Enhanced presentation */}
        <section className="section-spacing">
          <div className="container-responsive">
            <TestimonialsSection />
          </div>
        </section>
        
        {/* Consultation Hub - Call-to-action section */}
        <section className="section-spacing bg-gray-50">
          <div className="container-responsive">
            <ConsultationHub />
          </div>
        </section>
        
        {/* Neighborhood Map - Interactive section */}
        <section className="section-spacing">
          <div className="container-responsive">
            <NeighborhoodMap />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default HomepagePremiumRealEstateConsultancy;