import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NeighborhoodMap = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('setor-bueno');

  const neighborhoods = [
    {
      id: 'setor-bueno',
      name: 'Setor Bueno',
      description: 'Bairro nobre com excelente infraestrutura e proximidade ao Flamboyant Shopping',
      averagePrice: 'R$ 1.800.000',
      priceRange: 'R$ 1.200.000 - R$ 3.500.000',
      highlights: ['Flamboyant Shopping', 'Escolas de qualidade', 'Restaurantes renomados'],
      coordinates: { lat: -16.6869, lng: -49.2648 },
      properties: 45,
      growth: '+12%',
      features: [
        { icon: 'ShoppingCart', label: 'Shopping Centers' },
        { icon: 'GraduationCap', label: 'Escolas Premium' },
        { icon: 'Utensils', label: 'Gastronomia' },
        { icon: 'Car', label: 'Fácil Acesso' }
      ]
    },
    {
      id: 'jardim-goias',
      name: 'Jardim Goiás',
      description: 'Região em crescimento com ótimo custo-benefício e infraestrutura moderna',
      averagePrice: 'R$ 1.400.000',
      priceRange: 'R$ 900.000 - R$ 2.800.000',
      highlights: ['Crescimento acelerado', 'Boa infraestrutura', 'Investimento promissor'],
      coordinates: { lat: -16.7069, lng: -49.2548 },
      properties: 32,
      growth: '+18%',
      features: [
        { icon: 'TrendingUp', label: 'Valorização' },
        { icon: 'Building', label: 'Novos Empreendimentos' },
        { icon: 'MapPin', label: 'Localização Estratégica' },
        { icon: 'Leaf', label: 'Áreas Verdes' }
      ]
    },
    {
      id: 'alto-da-gloria',
      name: 'Alto da Glória',
      description: 'Bairro tradicional com vista privilegiada e imóveis de alto padrão',
      averagePrice: 'R$ 2.200.000',
      priceRange: 'R$ 1.500.000 - R$ 4.000.000',
      highlights: ['Vista panorâmica', 'Tradição e prestígio', 'Imóveis únicos'],
      coordinates: { lat: -16.6769, lng: -49.2448 },
      properties: 28,
      growth: '+8%',
      features: [
        { icon: 'Eye', label: 'Vista Panorâmica' },
        { icon: 'Crown', label: 'Alto Padrão' },
        { icon: 'Shield', label: 'Segurança' },
        { icon: 'Star', label: 'Prestígio' }
      ]
    },
    {
      id: 'setor-marista',
      name: 'Setor Marista',
      description: 'Região consolidada com excelente infraestrutura educacional e comercial',
      averagePrice: 'R$ 1.600.000',
      priceRange: 'R$ 1.000.000 - R$ 3.200.000',
      highlights: ['Universidades próximas', 'Comércio diversificado', 'Transporte público'],
      coordinates: { lat: -16.6969, lng: -49.2748 },
      properties: 38,
      growth: '+10%',
      features: [
        { icon: 'BookOpen', label: 'Educação' },
        { icon: 'Bus', label: 'Transporte' },
        { icon: 'Store', label: 'Comércio' },
        { icon: 'Users', label: 'Comunidade' }
      ]
    }
  ];

  const selectedData = neighborhoods?.find(n => n?.id === selectedNeighborhood);

  const handleWhatsAppClick = (neighborhood) => {
    const message = encodeURIComponent(`Olá! Tenho interesse em imóveis no bairro ${neighborhood?.name}. Gostaria de saber mais sobre as opções disponíveis.`);
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Conheça os Melhores Bairros
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nossa expertise em Goiânia nos permite oferecer insights únicos sobre cada região, 
            ajudando você a escolher o bairro ideal para sua família
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Mapa Interativo - Regiões Premium
            </h3>
            
            {/* Google Maps Embed */}
            <div className="w-full h-80 rounded-lg overflow-hidden mb-4">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={selectedData?.name}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${selectedData?.coordinates?.lat},${selectedData?.coordinates?.lng}&z=14&output=embed`}
                className="border-0"
              />
            </div>

            {/* Neighborhood Selector */}
            <div className="grid grid-cols-2 gap-2">
              {neighborhoods?.map((neighborhood) => (
                <button
                  key={neighborhood?.id}
                  onClick={() => setSelectedNeighborhood(neighborhood?.id)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedNeighborhood === neighborhood?.id
                      ? 'bg-primary text-white' :'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {neighborhood?.name}
                </button>
              ))}
            </div>
          </div>

          {/* Neighborhood Details */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedData?.name}
                </h3>
                <p className="text-gray-600">
                  {selectedData?.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Valorização</div>
                <div className="text-lg font-bold text-green-600">
                  {selectedData?.growth}
                </div>
              </div>
            </div>

            {/* Price Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Preço Médio</div>
                  <div className="text-xl font-bold text-primary">
                    {selectedData?.averagePrice}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Faixa de Preços</div>
                  <div className="text-sm font-medium text-gray-900">
                    {selectedData?.priceRange}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {selectedData?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={feature?.icon} size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {feature?.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Destaques da Região</h4>
              <div className="space-y-2">
                {selectedData?.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {selectedData?.properties}
                </div>
                <div className="text-xs text-gray-600">Imóveis Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {selectedData?.growth}
                </div>
                <div className="text-xs text-gray-600">Valorização Anual</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div className="text-xs text-gray-600">Resposta WhatsApp</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => handleWhatsAppClick(selectedData)}
                className="bg-accent hover:bg-accent/90 flex-1"
              >
                Ver Imóveis no {selectedData?.name}
              </Button>
              <Button
                variant="outline"
                iconName="MapPin"
                iconPosition="left"
                onClick={() => {
                  const message = encodeURIComponent(`Gostaria de agendar uma visita guiada pelo bairro ${selectedData?.name}.`);
                  window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
                }}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Visita Guiada
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NeighborhoodMap;