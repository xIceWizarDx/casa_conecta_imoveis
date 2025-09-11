import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const milestones = [
    {
      year: "2018",
      title: "Fundação da Casa Conecta",
      description: "Iniciamos nossa jornada com o objetivo de revolucionar o mercado imobiliário de Goiânia, focando em atendimento personalizado e consultoria especializada.",
      icon: "Home",
      stats: "Primeiros 50 clientes atendidos"
    },
    {
      year: "2020",
      title: "Expansão Digital",
      description: "Implementamos atendimento via WhatsApp 24/7 e plataforma digital completa, mantendo o toque humano que nos diferencia no mercado.",
      icon: "Smartphone",
      stats: "200+ famílias conectadas"
    },
    {
      year: "2022",
      title: "Especialização Premium",
      description: "Focamos exclusivamente em imóveis premium nas melhores regiões de Goiânia, desenvolvendo expertise incomparável no segmento alto padrão.",
      icon: "Award",
      stats: "350+ imóveis comercializados"
    },
    {
      year: "2024",
      title: "Liderança Regional",
      description: "Consolidamos nossa posição como referência em consultoria imobiliária premium, com reconhecimento do mercado e clientes.",
      icon: "Trophy",
      stats: "500+ famílias satisfeitas"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Nossa Trajetória de Sucesso
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Seis anos construindo relacionamentos sólidos e conectando famílias aos seus lares ideais
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary/20 hidden lg:block"></div>

          <div className="space-y-12">
            {milestones?.map((milestone, index) => (
              <div key={milestone?.year} className={`relative flex items-center ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg hidden lg:block z-10"></div>

                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={milestone?.icon} size={24} color="var(--color-primary)" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-2xl font-bold text-primary">{milestone?.year}</span>
                          <div className="h-px bg-border flex-1"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary mb-3">
                          {milestone?.title}
                        </h3>
                        <p className="text-text-secondary mb-4 leading-relaxed">
                          {milestone?.description}
                        </p>
                        <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full">
                          <span className="text-sm font-medium text-primary">{milestone?.stats}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;