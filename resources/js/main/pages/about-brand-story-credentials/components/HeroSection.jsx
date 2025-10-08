import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { openWhatsApp, openPhone, formatPhoneDisplay, useContactInfo } from '@/lib/contact';

const buildPlaceholderSrc = (url) => {
  if (!url) return null;

  try {
    const [path, search = ""] = url.split('?');
    const params = new URLSearchParams(search);

    params.set('q', '30');

    if (!params.has('auto')) {
      params.set('auto', 'format');
    }

    if (!params.has('blur')) {
      params.set('blur', '35');
    }

    return `${path}?${params.toString()}`;
  } catch (error) {
    return url;
  }
};

const HeroSection = () => {
  const contact = useContactInfo();
  const handleWhatsAppClick = () => {
    openWhatsApp('Olá! Vi o perfil da Casa Conecta e gostaria de conhecer mais sobre os serviços de consultoria imobiliária.', { contact });
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
                Conectando famílias aos seus <span className="text-primary"> lares ideais</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Mais que uma imobiliária, somos consultores que defendem o patrimônio e os interesses da sua família.
                Nosso foco não é mostrar todos os imóveis, mas selecionar                 os que realmente fazem sentido para você — com                transparência, análise criteriosa e atendimento               personalizado.
                Combinamos expertise local incomparável e um processo                 estruturado para transformar a escolha da casa própria em                 uma decisão segura, estratégica e sem arrependimentos
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Desde 2021</div>
                <div className="text-sm text-text-secondary">ajudando famílias a escolher com clareza</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Consultoria financeira inclusa</div>
                <div className="text-sm text-text-secondary">avaliando crédito e alternativas de financiamento</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Rede de parceiros confiáveis</div>
                <div className="text-sm text-text-secondary">para dar suporte após a compra</div>
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
                onClick={() => openPhone({ contact })}
              >
                {formatPhoneDisplay(contact)}
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Equipe Casa Conecta em frente ao Flamboyant Shopping"
                wrapperClassName="w-full h-96"
                imgClassName="w-full h-full object-cover"
                placeholderSrc={buildPlaceholderSrc('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop')}
                loading="eager"
                fetchPriority="high"
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

