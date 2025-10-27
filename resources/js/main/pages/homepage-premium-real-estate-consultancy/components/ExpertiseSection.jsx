import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ExpertiseSection = () => {
  const credentials = [
    {
      icon: "Award",
      title: "CRECI Certificado",
      description: "Registro profissional ativo no Conselho Regional de Corretores de Imóveis",
      highlight: "CRECI 39.061"
    },
    {
      icon: "Calendar",
      title: "3+ Anos de Dedicação",
      description: "3 anos dedicados a proteger o patrimônio de cada cliente, com:",
      highlight: "informações claras e decisões seguras"
    },
    {
      icon: "Home",
      title: "Filtro Personalizado 👇 ",
      description: "Assim você economiza tempo, evita frustrações e garante uma:",
      highlight: "escolha e inteligente"
    },
    {
      icon: "MapPin",
      title: "Orientação Financeira ",
      description: "Conheço a fundo o financiamento bancário e apresento também:",
      highlight: "alternativas inteligentes de crédito"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consulta Personalizada",
      description: "Entendemos seu timing, suas necessidades e orçamento; ajustamos tudo ao que existe de melhor disponível no mercado.",
      icon: "MessageCircle"
    },
    {
      step: "02",
      title: "Seleção Curada",
      description: "Apresentamos apenas imóveis que se alinham ao seu perfil e ao estilo de vida da sua família, poupando seu tempo e evitando escolhas equivocadas.”",
      icon: "Filter"
    },
    {
      step: "03",
      title: "Visitas Acompanhadas",
      description: "Agendamos e acompanhamos cada visita, destacando pontos fortes e riscos que muitas vezes passam despercebidos. Assim, você toma decisões com mais segurança e clareza.",
      icon: "Eye"
    },
    {
      step: "04",
      title: "Negociação Expert",
      description: "Negociamos as melhores condições financeiras e jurídicas, defendendo seus interesses em cada detalhe.",
      icon: "Handshake"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Motivos para escolher a Casa Conecta
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
        <div className=" rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Nosso Processo Personalizado
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Um método claro e estruturado que conecta sua família ao imóvel ideal com segurança, transparência e agilidade.
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