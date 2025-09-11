import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ExpertiseSection = () => {
  const credentials = [
    {
      icon: "Award",
      title: "CRECI Certificado",
      description: "Registro profissional ativo no Conselho Regional de Corretores de Imóveis",
      highlight: "CRECI/GO 12.345"
    },
    {
      icon: "Calendar",
      title: "15+ Anos de Experiência",
      description: "Mais de uma década atuando no mercado imobiliário de Goiânia",
      highlight: "Desde 2009"
    },
    {
      icon: "Home",
      title: "500+ Imóveis Vendidos",
      description: "Centenas de famílias realizaram o sonho da casa própria conosco",
      highlight: "R$ 180M+ negociados"
    },
    {
      icon: "MapPin",
      title: "Especialista em Goiânia",
      description: "Conhecimento profundo dos melhores bairros e regiões da cidade",
      highlight: "Foco premium"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consulta Personalizada",
      description: "Entendemos suas necessidades, orçamento e preferências através do WhatsApp ou presencialmente",
      icon: "MessageCircle"
    },
    {
      step: "02",
      title: "Seleção Curada",
      description: "Apresentamos apenas imóveis que atendem seus critérios, economizando seu tempo",
      icon: "Filter"
    },
    {
      step: "03",
      title: "Visitas Acompanhadas",
      description: "Agendamos e acompanhamos todas as visitas, fornecendo insights sobre cada propriedade",
      icon: "Eye"
    },
    {
      step: "04",
      title: "Negociação Expert",
      description: "Negociamos as melhores condições e acompanhamos todo o processo até a entrega das chaves",
      icon: "Handshake"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Por Que Escolher a Casa Conecta?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mais que uma imobiliária, somos consultores especializados em conectar você ao imóvel dos seus sonhos 
            com transparência, expertise e atendimento personalizado
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {credentials?.map((credential, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon name={credential?.icon} size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {credential?.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {credential?.description}
              </p>
              <span className="text-primary font-semibold text-sm">
                {credential?.highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Nosso Processo Personalizado
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Um método comprovado que garante que você encontre o imóvel ideal com segurança e agilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps?.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={step?.icon} size={24} color="white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {step?.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {step?.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {step?.description}
                  </p>
                </div>
                
                {index < processSteps?.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full">
                    <div className="w-full h-0.5 bg-primary/20 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <Icon name="ChevronRight" size={16} className="text-primary/40" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExpertiseSection;