import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Vi o perfil da Casa Conecta e gostaria de conhecer mais sobre os serviços de consultoria imobiliária.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-medium text-primary">Desde 2018 em Goiânia</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                Conectando famílias aos seus 
                <span className="text-primary"> lares ideais</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Somos mais que uma imobiliária. Somos consultores especializados em imóveis premium, 
                dedicados a transformar o sonho da casa própria em realidade através de atendimento 
                personalizado e expertise local incomparável.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-text-secondary">Famílias Atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">6</div>
                <div className="text-sm text-text-secondary">Anos de Mercado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-text-secondary">Satisfação</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={handleWhatsAppClick}
                className="bg-accent hover:bg-accent/90"
              >
                Falar com Especialista
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.open('tel:+5562999999999')}
              >
                (62) 99999-9999
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Equipe Casa Conecta em frente ao Flamboyant Shopping"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CC</span>
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Casa Conecta</div>
                  <div className="text-sm text-text-secondary">CRECI-GO 12345</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;