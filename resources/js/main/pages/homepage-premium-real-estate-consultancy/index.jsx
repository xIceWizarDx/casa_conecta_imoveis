import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import FeaturedProperties from './components/FeaturedProperties';
import ExpertiseSection from './components/ExpertiseSection';
import NeighborhoodMap from './components/NeighborhoodMap';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProcessTransparencySection from '../about-brand-story-credentials/components/ProcessTransparencySection';
import Footer from '../../components/Footer';

const HomepagePremiumRealEstateConsultancy = () => {
  const [isHeroReady, setIsHeroReady] = useState(false);

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
    <div className="min-h-screen bg-white relative">
      <Helmet>
        <title>Casa Conecta Imóveis | Consultoria Imobiliária Premium</title>
        <meta
          name="description"
          content="Descubra uma consultoria imobiliária premium com imóveis selecionados, atendimento personalizado e orientação especializada."
        />
      </Helmet>
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
          isHeroReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={isHeroReady}
      >
        <img
          src="/logo.png"
          alt="Casa Conecta Imóveis"
          className="w-32 h-auto mb-6"
        />
        <span className="sr-only">Carregando página inicial</span>
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>

      <div
        className={`transition-opacity duration-500 ${
          isHeroReady ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'
        }`}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Carousel - Full viewport section */}
          <HeroCarousel onFirstSlideReady={() => setIsHeroReady(true)} />

          {/* Featured Properties - Well organized section */}
          <section className="section-spacing">
            <div className="container-responsive">
              <FeaturedProperties />
            </div>
          </section>

          {/* Neighborhood Map - Interactive section */}
          <section className="section-spacing">
            <div className="container-responsive">
              <NeighborhoodMap />
            </div>
          </section>

          {/* Expertise Section - Professional spacing */}
          <section className="section-spacing">
            <div className="container-responsive">
              <ExpertiseSection />
            </div>
          </section>

          {/* Transparent Process Section */}
          <ProcessTransparencySection />
        </main>

        {/* Footer */}
        <Footer />

        {/* WhatsApp Float Button */}
        <WhatsAppFloat />
      </div>
    </div>
  );
};

export default HomepagePremiumRealEstateConsultancy;