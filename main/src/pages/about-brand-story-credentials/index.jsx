import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import ServicePhilosophySection from './components/ServicePhilosophySection';
import ClientSuccessSection from './components/ClientSuccessSection';
import ProcessTransparencySection from './components/ProcessTransparencySection';
import ContactSection from './components/ContactSection';
import Footer from '../../components/Footer';

const AboutBrandStoryCredentials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppFloat = () => {
    const message = encodeURIComponent('Olá! Gostaria de conhecer mais sobre a Casa Conecta e seus serviços especializados.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Sobre Nós - Casa Conecta | Consultoria Imobiliária Premium em Goiânia</title>
        <meta 
          name="description" 
          content="Conheça a história da Casa Conecta, nossa equipe especializada e credenciais. 6 anos conectando famílias aos seus lares ideais em Goiânia com atendimento personalizado via WhatsApp." 
        />
        <meta name="keywords" content="Casa Conecta, sobre nós, equipe, CRECI, consultoria imobiliária, Goiânia, história, credenciais" />
        <meta property="og:title" content="Sobre Nós - Casa Conecta | Consultoria Imobiliária Premium" />
        <meta property="og:description" content="Conheça nossa história, equipe especializada e credenciais. 6 anos de experiência em consultoria imobiliária premium em Goiânia." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://casaconecta.com.br/about-brand-story-credentials" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection />
          <TimelineSection />
          <ServicePhilosophySection />
          <ClientSuccessSection />
          <ProcessTransparencySection />
          <ContactSection />
        </main>

        {/* WhatsApp Float Button */}
        <button
          onClick={handleWhatsAppFloat}
          className="whatsapp-float w-14 h-14 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200"
          aria-label="Falar no WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"/>
          </svg>
        </button>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default AboutBrandStoryCredentials;