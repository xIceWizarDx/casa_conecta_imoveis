import React from 'react';
import Icon from '../../../components/AppIcon';

const ServicePhilosophySection = () => {
  const philosophyPillars = [
    {
      icon: "Heart",
      title: "Consultoria Humanizada",
      description: "Entendemos que comprar um imóvel é uma decisão emocional. Nossa abordagem vai além da transação, focando no relacionamento e na compreensão das necessidades únicas de cada família.",
      features: ["Atendimento personalizado", "Escuta ativa das necessidades", "Suporte emocional no processo"]
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp First",
      description: "Revolucionamos o atendimento imobiliário com comunicação instantânea via WhatsApp. Resposta rápida, conveniência e proximidade que você merece.",
      features: ["Resposta em até 5 minutos", "Disponível 24/7", "Comunicação direta e transparente"]
    },
    {
      icon: "Target",
      title: "Curadoria Especializada",
      description: "Não somos apenas corretores, somos curadores de lifestyle. Selecionamos cuidadosamente imóveis que se alinham com seus sonhos e necessidades específicas.",
      features: ["Pré-seleção criteriosa", "Análise de potencial", "Matching personalizado"]
    },
    {
      icon: "Shield",
      title: "Transparência Total",
      description: "Processo completamente transparente, desde a primeira conversa até a entrega das chaves. Você sempre saberá exatamente onde está no processo.",
      features: ["Documentação clara", "Prazos definidos", "Sem surpresas ou taxas ocultas"]
    }
  ];

  const differentials = [
    {
      traditional: "Mostra vários imóveis sem critério",
      casaConecta: "Pré-seleciona imóveis alinhados ao seu perfil"
    },
    {
      traditional: "Atendimento apenas em horário comercial",
      casaConecta: "WhatsApp 24/7 com resposta rápida"
    },
    {
      traditional: "Foca apenas na venda",
      casaConecta: "Acompanha todo o processo até a mudança"
    },
    {
      traditional: "Informações básicas sobre o imóvel",
      casaConecta: "Análise completa do bairro e potencial"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Nossa Filosofia de Atendimento
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Mais que uma imobiliária, somos consultores especializados em conectar 
            famílias aos seus lares ideais através de uma abordagem única no mercado
          </p>
        </div>

        {/* Philosophy Pillars */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {philosophyPillars?.map((pillar, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={pillar?.icon} size={24} color="var(--color-primary)" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {pillar?.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {pillar?.description}
                  </p>
                  <ul className="space-y-2">
                    {pillar?.features?.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} color="var(--color-primary)" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Casa Conecta vs. Imobiliárias Tradicionais
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {differentials?.map((diff, index) => (
                <div key={index} className="grid lg:grid-cols-2 gap-6">
                  {/* Traditional */}
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <Icon name="X" size={20} color="#EF4444" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-red-800 mb-1">Imobiliárias Tradicionais</div>
                      <div className="text-sm text-red-700">{diff?.traditional}</div>
                    </div>
                  </div>

                  {/* Casa Conecta */}
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <Icon name="Check" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-green-800 mb-1">Casa Conecta</div>
                      <div className="text-sm text-green-700">{diff?.casaConecta}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Experimente a Diferença Casa Conecta
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Descubra como nossa abordagem consultiva pode transformar sua experiência 
              de compra de imóvel em uma jornada personalizada e sem estresse.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                 onClick={() => {
                   const message = encodeURIComponent('Olá! Gostaria de conhecer mais sobre a filosofia de atendimento da Casa Conecta.');
                   window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
                 }}>
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Falar com Consultor
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePhilosophySection;