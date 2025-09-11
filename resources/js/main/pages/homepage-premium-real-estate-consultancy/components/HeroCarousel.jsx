import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroProperties, setHeroProperties] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/hero-slides');
        if (res.ok) {
          const data = await res.json();
          const mapped = (data || []).map((s) => ({
            id: s.id,
            title: s.title,
            subtitle: s.subtitle,
            image: s.image_url,
            price: s.price,
            bedrooms: s.bedrooms,
            bathrooms: s.bathrooms,
            area: s.area,
            neighborhood: s.neighborhood,
            isNew: !!s.is_new,
          }));
          setHeroProperties(mapped);
        }
      } catch {}
    })();
  }, []);

  const heroPropertiesStatic = [
    {
      id: 1,
      title: "Casa de Luxo no Setor Bueno",
      subtitle: "Sua nova casa nos melhores bairros de Goiânia",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&crop=center&auto=format&q=90",
      price: "R$ 1.850.000",
      bedrooms: 4,
      bathrooms: 3,
      area: "320m²",
      neighborhood: "Setor Bueno"
    },
    {
      id: 2,
      title: "Apartamento Premium Jardim Goiás",
      subtitle: "Viva com sofisticação próximo ao Flamboyant",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&crop=center&auto=format&q=90",
      price: "R$ 1.200.000",
      bedrooms: 3,
      bathrooms: 2,
      area: "180m²",
      neighborhood: "Jardim Goiás"
    },
    {
      id: 3,
      title: "Cobertura Alto da Glória",
      subtitle: "Exclusividade e vista panorâmica da cidade",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&crop=center&auto=format&q=90",
      price: "R$ 2.400.000",
      bedrooms: 5,
      bathrooms: 4,
      area: "450m²",
      neighborhood: "Alto da Glória"
    },
    {
      id: 4,
      title: "Casa Moderna Setor Marista",
      subtitle: "Arquitetura contemporânea em localização privilegiada",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&crop=center&auto=format&q=90",
      price: "R$ 1.650.000",
      bedrooms: 4,
      bathrooms: 3,
      area: "280m²",
      neighborhood: "Setor Marista"
    }
  ];

  useEffect(() => {
    const list = heroProperties?.length ? heroProperties : heroPropertiesStatic;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (list.length ? (prev + 1) % list.length : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, [heroProperties?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProperties?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProperties?.length) % heroProperties?.length);
  };

  const handleWhatsAppClick = (property) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${property?.title} - ${property?.price}. Gostaria de mais informações.`);
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <section className="relative w-full hero-carousel bg-white overflow-hidden">
      <div className="relative w-full h-full">
        {(heroProperties?.length ? heroProperties : heroPropertiesStatic).map((property, index) => (
          <div
            key={property?.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={property?.image}
                alt={property?.title}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 hero-overlay" />

              {/* Volta a posição anterior (centrado verticalmente) */}
              <div className="absolute inset-0 flex items-center">
                <div className="container-responsive">
                  <div className="max-w-3xl text-white animate-fade-in-up">
                    <div className="mb-4">
                      <span className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary-foreground">
                        <Icon name="MapPin" size={16} className="mr-2" />
                        {property?.neighborhood}
                      </span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance text-shadow leading-tight">
                      {property?.title}
                    </h1>
                    
                    <p className="text-xl sm:text-2xl mb-8 text-gray-100 text-shadow max-w-2xl">
                      {property?.subtitle}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-10">
                      <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                        <Icon name="Bed" size={20} color="white" />
                        <span className="text-sm font-semibold">{property?.bedrooms} quartos</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                        <Icon name="Bath" size={20} color="white" />
                        <span className="text-sm font-semibold">{property?.bathrooms} banheiros</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                        <Icon name="Square" size={20} color="white" />
                        <span className="text-sm font-semibold">{property?.area}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      {/* Preço sem contorno */}
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                        {property?.price}
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <Button
                          variant="default"
                          iconName="MessageCircle"
                          iconPosition="left"
                          onClick={() => handleWhatsAppClick(property)}
                          className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          iconName="Phone"
                          iconPosition="left"
                          onClick={() => window.open('tel:+5562999999999')}
                          className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 text-base backdrop-blur-sm transition-all duration-200"
                        >
                          Ligar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-20 border border-white/20 hover:scale-110"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={28} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-20 border border-white/20 hover:scale-110"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={28} />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {heroProperties?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-3 bg-white' :'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full gradient-primary transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / heroProperties?.length) * 100}%` 
          }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;
