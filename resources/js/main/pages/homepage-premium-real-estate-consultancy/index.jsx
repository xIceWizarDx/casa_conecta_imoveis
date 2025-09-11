import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import PropertyExplorer from './components/PropertyExplorer';
import ExpertiseSection from './components/ExpertiseSection';
import NeighborhoodMap from './components/NeighborhoodMap';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from '../../components/Footer';

const HomepagePremiumRealEstateConsultancy = () => {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Carousel - Full viewport section */}
        <HeroCarousel />
        
        {/* Property Explorer - unified filters and listing */}
        <PropertyExplorer />
        
        {/* Expertise Section - Professional spacing */}
        <section className="section-spacing bg-surface">
          <div className="container-responsive">
            <ExpertiseSection />
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
