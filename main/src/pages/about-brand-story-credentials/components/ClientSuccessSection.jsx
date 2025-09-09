import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ClientSuccessSection = () => {
  const [activeStory, setActiveStory] = useState(0);

  const successStories = [
    {
      id: 1,
      clientName: "Família Rodrigues",
      clientImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=300&fit=crop",
      property: "Casa 4 quartos - Jardim Goiás",
      timeline: "3 meses",
      challenge: "Primeira compra de imóvel",
      beforeSituation: `A família Rodrigues estava alugando um apartamento pequeno e sonhava com uma casa própria 
      no Jardim Goiás. Tinham receio sobre financiamento e não conheciam bem o processo de compra.`,
      casaConectaAction: `Nossa equipe realizou uma consultoria completa sobre financiamento habitacional, 
      acompanhou todas as visitas e negociou condições especiais com o proprietário. Oferecemos suporte 
      completo na documentação e no processo junto ao banco.`,
      afterResult: `Hoje a família vive em sua casa dos sonhos no Jardim Goiás, com financiamento aprovado 
      em condições excelentes. O processo foi tranquilo e sem surpresas.`,
      testimonial: `"A Casa Conecta transformou nosso sonho em realidade. O atendimento via WhatsApp foi fundamental, 
      sempre tirando nossas dúvidas rapidamente. Recomendamos para todos os amigos!"`,
      propertyValue: "R$ 850.000",
      satisfaction: 5
    },
    {
      id: 2,
      clientName: "Dr. Carlos Mendes",
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      property: "Apartamento Cobertura - Setor Bueno",
      timeline: "2 meses",
      challenge: "Investimento imobiliário",
      beforeSituation: `Dr. Carlos queria diversificar seus investimentos e estava procurando um imóvel premium 
      no Setor Bueno para investimento e uso próprio eventual.`,
      casaConectaAction: `Realizamos análise completa do mercado, apresentamos opções pré-selecionadas e 
      fornecemos relatório detalhado sobre potencial de valorização. Negociamos desconto significativo 
      e condições especiais de pagamento.`,
      afterResult: `Adquiriu uma cobertura excepcional com excelente potencial de valorização. O imóvel 
      já valorizou 15% em 8 meses e gera renda de aluguel quando não está em uso.`,
      testimonial: `"Profissionalismo excepcional. A análise de mercado foi fundamental para minha decisão. 
      O investimento superou minhas expectativas!"`,
      propertyValue: "R$ 1.200.000",
      satisfaction: 5
    },
    {
      id: 3,
      clientName: "Casal Silva",
      clientImage: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300&h=300&fit=crop",
      property: "Casa Condomínio - Alto da Glória",
      timeline: "4 meses",
      challenge: "Mudança de cidade",
      beforeSituation: `O casal Silva estava se mudando de São Paulo para Goiânia e precisava encontrar 
      uma casa em condomínio fechado, mas não conhecia a cidade nem os melhores bairros.`,
      casaConectaAction: `Oferecemos tour virtual completo, consultoria sobre bairros, análise de infraestrutura 
      e proximidade com serviços essenciais. Acompanhamos todo o processo remotamente até a mudança.`,
      afterResult: `Encontraram a casa perfeita no Alto da Glória, em condomínio com toda infraestrutura 
      que desejavam. A mudança foi tranquila e se adaptaram rapidamente à nova cidade.`,
      testimonial: `"Mesmo à distância, nos sentimos seguros com o atendimento da Casa Conecta. Conhecem Goiânia como ninguém e nos ajudaram a escolher o bairro ideal!"`,
      propertyValue: "R$ 950.000",
      satisfaction: 5
    }
  ];

  const testimonials = [
    {
      name: "Ana Paula Costa",
      property: "Apartamento 3 quartos - Setor Oeste",
      rating: 5,
      comment: `"Atendimento excepcional! O WhatsApp 24/7 fez toda diferença. Sempre que tinha dúvida, 
      recebia resposta rápida e detalhada. Processo de compra foi muito mais tranquilo do que imaginava."`,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      date: "Dezembro 2024"
    },
    {
      name: "Roberto Santos",
      property: "Casa 5 quartos - Jardim América",
      rating: 5,
      comment: `"Profissionais que realmente entendem do mercado. A análise de bairro foi fundamental 
      para minha decisão. Hoje sei que fiz a escolha certa!"`,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      date: "Novembro 2024"
    },
    {
      name: "Mariana Oliveira",
      property: "Cobertura - Setor Marista",
      rating: 5,
      comment: `"Curadoria impecável! Não perdi tempo visitando imóveis que não faziam sentido. 
      Cada opção apresentada estava alinhada com meu perfil e necessidades."`,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      date: "Outubro 2024"
    }
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Histórias de Sucesso
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Conheça algumas famílias que realizaram o sonho da casa própria com nossa consultoria especializada
          </p>
        </div>

        {/* Success Stories Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {successStories?.map((story, index) => (
              <button
                key={story?.id}
                onClick={() => setActiveStory(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeStory === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {story?.clientName}
              </button>
            ))}
          </div>

          {/* Active Story */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Client Info */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={successStories?.[activeStory]?.clientImage}
                      alt={successStories?.[activeStory]?.clientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {successStories?.[activeStory]?.clientName}
                  </h3>
                  <p className="text-primary font-medium mb-2">{successStories?.[activeStory]?.property}</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center justify-center space-x-2">
                      <Icon name="Clock" size={16} />
                      <span>{successStories?.[activeStory]?.timeline}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Icon name="DollarSign" size={16} />
                      <span>{successStories?.[activeStory]?.propertyValue}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(successStories?.[activeStory]?.satisfaction)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={16} color="#F59E0B" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <Icon name="AlertCircle" size={18} className="mr-2 text-orange-500" />
                      Desafio Inicial
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {successStories?.[activeStory]?.beforeSituation}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <Icon name="Target" size={18} className="mr-2 text-primary" />
                      Nossa Atuação
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {successStories?.[activeStory]?.casaConectaAction}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <Icon name="CheckCircle" size={18} className="mr-2 text-green-500" />
                      Resultado Alcançado
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {successStories?.[activeStory]?.afterResult}
                    </p>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <Icon name="Quote" size={18} className="mr-2 text-primary" />
                      Depoimento
                    </h4>
                    <p className="text-text-secondary text-sm italic leading-relaxed">
                      {successStories?.[activeStory]?.testimonial}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Testimonials */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Mais Depoimentos de Clientes
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials?.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial?.image}
                      alt={testimonial?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{testimonial?.name}</h4>
                    <p className="text-sm text-text-secondary">{testimonial?.property}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(testimonial?.rating)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={14} color="#F59E0B" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {testimonial?.comment}
                </p>
                <div className="text-xs text-text-secondary">{testimonial?.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-text-secondary">Famílias Atendidas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-text-secondary">Satisfação</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2.5</div>
              <div className="text-sm text-text-secondary">Meses Médios</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-text-secondary">Processos Concluídos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSuccessSection;