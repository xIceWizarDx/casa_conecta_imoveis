import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NeighborhoodExpertiseSection = () => {
  const [activeNeighborhood, setActiveNeighborhood] = useState(0);

  const neighborhoods = [
    {
      name: "Jardim Goiás",
      averagePrice: "R$ 8.500/m²",
      growth: "+12%",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      description: "Bairro nobre com excelente infraestrutura e proximidade ao Flamboyant Shopping",
      highlights: [
        "Próximo ao Flamboyant Shopping",
        "Excelente infraestrutura urbana",
        "Área verde preservada",
        "Fácil acesso às principais vias"
      ],
      lifestyle: {
        family: "Ideal para famílias com crianças",
        transport: "Transporte público eficiente",
        leisure: "Parques e áreas de lazer",
        commerce: "Comércio diversificado"
      },
      investment: {
        potential: "Alto",
        reason: "Valorização constante e demanda crescente",
        projection: "15-20% nos próximos 3 anos"
      },
      properties: 45
    },
    {
      name: "Setor Bueno",
      averagePrice: "R$ 9.200/m²",
      growth: "+15%",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      description: "Região premium com apartamentos de alto padrão e vista privilegiada",
      highlights: [
        "Apartamentos de alto padrão",
        "Vista panorâmica da cidade",
        "Proximidade ao centro financeiro",
        "Infraestrutura completa"
      ],
      lifestyle: {
        family: "Perfeito para casais e profissionais",
        transport: "Localização central estratégica",
        leisure: "Vida noturna e restaurantes",
        commerce: "Comércio sofisticado"
      },
      investment: {
        potential: "Muito Alto",
        reason: "Localização premium e escassez de terrenos",
        projection: "18-25% nos próximos 3 anos"
      },
      properties: 32
    },
    {
      name: "Alto da Glória",
      averagePrice: "R$ 7.800/m²",
      growth: "+10%",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      description: "Condomínios fechados com segurança e qualidade de vida excepcional",
      highlights: [
        "Condomínios fechados de luxo",
        "Segurança 24 horas",
        "Área verde abundante",
        "Clube e infraestrutura completa"
      ],
      lifestyle: {
        family: "Excelente para famílias grandes",
        transport: "Acesso fácil às principais vias",
        leisure: "Clubes e áreas de lazer privativas",
        commerce: "Shopping centers próximos"
      },
      investment: {
        potential: "Alto",
        reason: "Crescimento populacional e desenvolvimento urbano",
        projection: "12-18% nos próximos 3 anos"
      },
      properties: 28
    },
    {
      name: "Setor Oeste",
      averagePrice: "R$ 6.900/m²",
      growth: "+8%",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
      description: "Bairro tradicional com boa infraestrutura e custo-benefício atrativo",
      highlights: [
        "Bairro consolidado e tradicional",
        "Boa infraestrutura de serviços",
        "Custo-benefício atrativo",
        "Proximidade a universidades"
      ],
      lifestyle: {
        family: "Adequado para todas as idades",
        transport: "Transporte público abundante",
        leisure: "Parques e praças",
        commerce: "Comércio local forte"
      },
      investment: {
        potential: "Médio-Alto",
        reason: "Estabilidade e potencial de crescimento",
        projection: "10-15% nos próximos 3 anos"
      },
      properties: 38
    }
  ];

  const marketTrends = [
    {
      trend: "Crescimento do Setor Premium",
      description: "Aumento de 18% na demanda por imóveis acima de R$ 800.000",
      impact: "Positivo",
      timeframe: "2024"
    },
    {
      trend: "Valorização de Condomínios Fechados",
      description: "Preferência crescente por segurança e infraestrutura completa",
      impact: "Muito Positivo",
      timeframe: "Tendência contínua"
    },
    {
      trend: "Proximidade a Shopping Centers",
      description: "Imóveis próximos ao Flamboyant valorizam 15% mais rápido",
      impact: "Positivo",
      timeframe: "Últimos 2 anos"
    },
    {
      trend: "Sustentabilidade e Eficiência",
      description: "Crescimento na procura por imóveis com certificação ambiental",
      impact: "Emergente",
      timeframe: "Próximos 3 anos"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Expertise em Bairros Premium
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Conhecimento profundo dos melhores bairros de Goiânia, tendências de mercado 
            e potencial de investimento para orientar sua decisão
          </p>
        </div>

        {/* Neighborhood Selector */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {neighborhoods?.map((neighborhood, index) => (
              <button
                key={neighborhood?.name}
                onClick={() => setActiveNeighborhood(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeNeighborhood === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {neighborhood?.name}
              </button>
            ))}
          </div>

          {/* Active Neighborhood Details */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={neighborhoods?.[activeNeighborhood]?.image}
                  alt={neighborhoods?.[activeNeighborhood]?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {neighborhoods?.[activeNeighborhood]?.name}
                  </h3>
                  <p className="text-sm opacity-90">
                    {neighborhoods?.[activeNeighborhood]?.properties} imóveis disponíveis
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">
                    {neighborhoods?.[activeNeighborhood]?.averagePrice}
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <Icon name="TrendingUp" size={16} />
                    <span className="text-sm font-medium">
                      {neighborhoods?.[activeNeighborhood]?.growth} ao ano
                    </span>
                  </div>
                </div>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  {neighborhoods?.[activeNeighborhood]?.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3">Destaques do Bairro:</h4>
                  <ul className="space-y-2">
                    {neighborhoods?.[activeNeighborhood]?.highlights?.map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} color="var(--color-primary)" />
                        <span className="text-sm text-text-secondary">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lifestyle */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm font-medium text-text-primary mb-1">Família</div>
                    <div className="text-xs text-text-secondary">
                      {neighborhoods?.[activeNeighborhood]?.lifestyle?.family}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary mb-1">Transporte</div>
                    <div className="text-xs text-text-secondary">
                      {neighborhoods?.[activeNeighborhood]?.lifestyle?.transport}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary mb-1">Lazer</div>
                    <div className="text-xs text-text-secondary">
                      {neighborhoods?.[activeNeighborhood]?.lifestyle?.leisure}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary mb-1">Comércio</div>
                    <div className="text-xs text-text-secondary">
                      {neighborhoods?.[activeNeighborhood]?.lifestyle?.commerce}
                    </div>
                  </div>
                </div>

                {/* Investment Potential */}
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-primary">Potencial de Investimento</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      neighborhoods?.[activeNeighborhood]?.investment?.potential === 'Muito Alto' ?'bg-green-100 text-green-800'
                        : neighborhoods?.[activeNeighborhood]?.investment?.potential === 'Alto' ?'bg-blue-100 text-blue-800' :'bg-yellow-100 text-yellow-800'
                    }`}>
                      {neighborhoods?.[activeNeighborhood]?.investment?.potential}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {neighborhoods?.[activeNeighborhood]?.investment?.reason}
                  </p>
                  <div className="text-xs text-primary font-medium">
                    Projeção: {neighborhoods?.[activeNeighborhood]?.investment?.projection}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Tendências do Mercado Goianiense
          </h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {marketTrends?.map((trend, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-text-primary flex-1">{trend?.trend}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ml-3 ${
                    trend?.impact === 'Muito Positivo' ?'bg-green-100 text-green-800'
                      : trend?.impact === 'Positivo' ?'bg-blue-100 text-blue-800' :'bg-orange-100 text-orange-800'
                  }`}>
                    {trend?.impact}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3">{trend?.description}</p>
                <div className="text-xs text-primary font-medium">{trend?.timeframe}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Stats */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Nossa Expertise em Números
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-text-secondary">Bairros Especializados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-sm text-text-secondary">Anos de Mercado</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-text-secondary">Análises de Mercado</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-text-secondary">Precisão nas Projeções</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodExpertiseSection;