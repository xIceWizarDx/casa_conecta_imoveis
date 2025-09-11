import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProperties = () => {
  const [showMore, setShowMore] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const [filters, setFilters] = useState({
    neighborhood: '',
    priceRange: '',
    propertyType: ''
  });
  const [formFilters, setFormFilters] = useState({
    neighborhood: '',
    priceRange: '',
    propertyType: ''
  });

  const neighborhoods = [
    { value: '', label: 'Todos os Bairros' },
    { value: 'setor-bueno', label: 'Setor Bueno' },
    { value: 'jardim-goias', label: 'Jardim Goiás' },
    { value: 'alto-da-gloria', label: 'Alto da Glória' },
    { value: 'setor-marista', label: 'Setor Marista' },
    { value: 'setor-oeste', label: 'Setor Oeste' },
    { value: 'park-lozandes', label: 'Park Lozandes' },
  ];

  const priceRanges = [
    { value: '', label: 'Qualquer Valor' },
    { value: '800000-1200000', label: 'R$ 800.000 - R$ 1.200.000' },
    { value: '1200000-1800000', label: 'R$ 1.200.000 - R$ 1.800.000' },
    { value: '1800000-2500000', label: 'R$ 1.800.000 - R$ 2.500.000' },
    { value: '2500000-3000000', label: 'R$ 2.500.000 - R$ 3.000.000' },
    { value: '3000000+', label: 'Acima de R$ 3.000.000' },
  ];

  const propertyTypes = [
    { value: '', label: 'Todos os Tipos' },
    { value: 'casa', label: 'Casa' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'cobertura', label: 'Cobertura' },
    { value: 'sobrado', label: 'Sobrado' },
    { value: 'terreno', label: 'Terreno' },
  ];

  const handleFilterChange = (type, value) => {
    setFormFilters(prev => ({ ...prev, [type]: value }));
  };

  const applyFilters = () => {
    setFilters(formFilters);
  };

  const clearFilters = () => {
    const cleared = { neighborhood: '', priceRange: '', propertyType: '' };
    setFormFilters(cleared);
    setFilters(cleared);
  };

  const removeFilter = (type) => {
    const updated = { ...formFilters, [type]: '' };
    setFormFilters(updated);
    setFilters(prev => ({ ...prev, [type]: '' }));
  };

  const hasActiveFilters = Object.values(filters).some(f => f !== '');

  const allProperties = [
    {
      id: 1,
      title: "Casa de Luxo no Setor Bueno",
      neighborhood: "Setor Bueno",
      price: "R$ 1.850.000",
      bedrooms: 4,
      bathrooms: 3,
      area: "320m²",
      type: "casa",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      features: ["Piscina", "Churrasqueira", "Garagem 4 vagas"],
      isNew: true,
      priceRange: "1800000-2500000"
    },
    {
      id: 2,
      title: "Apartamento Premium Jardim Goiás",
      neighborhood: "Jardim Goiás",
      price: "R$ 1.200.000",
      bedrooms: 3,
      bathrooms: 2,
      area: "180m²",
      type: "apartamento",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      features: ["Vista panorâmica", "Varanda gourmet", "2 vagas"],
      isNew: false,
      priceRange: "1200000-1800000"
    },
    {
      id: 3,
      title: "Cobertura Alto da Glória",
      neighborhood: "Alto da Glória",
      price: "R$ 2.400.000",
      bedrooms: 5,
      bathrooms: 4,
      area: "450m²",
      type: "cobertura",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      features: ["Terraço privativo", "Piscina", "Vista 360°"],
      isNew: true,
      priceRange: "2500000-3000000"
    },
    {
      id: 4,
      title: "Casa Moderna Setor Marista",
      neighborhood: "Setor Marista",
      price: "R$ 1.650.000",
      bedrooms: 4,
      bathrooms: 3,
      area: "280m²",
      type: "casa",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      features: ["Arquitetura moderna", "Jardim", "3 vagas"],
      isNew: false,
      priceRange: "1200000-1800000"
    },
    {
      id: 5,
      title: "Sobrado Park Lozandes",
      neighborhood: "Park Lozandes",
      price: "R$ 980.000",
      bedrooms: 3,
      bathrooms: 2,
      area: "220m²",
      type: "sobrado",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      features: ["Condomínio fechado", "Área gourmet", "2 vagas"],
      isNew: false,
      priceRange: "800000-1200000"
    },
    {
      id: 6,
      title: "Apartamento Setor Oeste",
      neighborhood: "Setor Oeste",
      price: "R$ 850.000",
      bedrooms: 2,
      bathrooms: 2,
      area: "120m²",
      type: "apartamento",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
      features: ["Mobiliado", "Sacada", "1 vaga"],
      isNew: true,
      priceRange: "800000-1200000"
    },
    {
      id: 7,
      title: "Casa Condomínio Jardim Goiás",
      neighborhood: "Jardim Goiás",
      price: "R$ 2.100.000",
      bedrooms: 4,
      bathrooms: 4,
      area: "380m²",
      type: "casa",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop",
      features: ["Condomínio de luxo", "Piscina", "4 vagas"],
      isNew: false,
      priceRange: "1800000-2500000"
    },
    {
      id: 8,
      title: "Cobertura Setor Bueno",
      neighborhood: "Setor Bueno",
      price: "R$ 3.200.000",
      bedrooms: 5,
      bathrooms: 5,
      area: "520m²",
      type: "cobertura",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      features: ["Duplex", "Piscina privativa", "6 vagas"],
      isNew: true,
      priceRange: "3000000+"
    }
  ];

  const filterProperties = (properties) => {
    return properties?.filter((property) => {
      if (filters.neighborhood && property?.neighborhood?.toLowerCase()?.replace(/\s+/g, '-') !== filters.neighborhood) {
        return false;
      }
      if (filters.priceRange && property?.priceRange !== filters.priceRange) {
        return false;
      }
      if (filters.propertyType && property?.type !== filters.propertyType) {
        return false;
      }
      return true;
    });
  };

  const filteredProperties = filterProperties(allProperties);
  const displayedProperties = showMore ? filteredProperties : filteredProperties?.slice(0, 6);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites?.has(propertyId)) {
        newFavorites?.delete(propertyId);
      } else {
        newFavorites?.add(propertyId);
      }
      return newFavorites;
    });
  };

  const handleWhatsAppClick = (property) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${property?.title} - ${property?.price}. Gostaria de agendar uma visita.`);
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <section id="listagem" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Imóveis em Destaque
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Seleção exclusiva de propriedades premium nos melhores bairros de Goiânia, 
            próximos ao Flamboyant Shopping e principais centros comerciais
          </p>
        {filteredProperties?.length > 0 && (
          <p className="text-sm text-primary font-medium mt-2">
            {filteredProperties?.length} {filteredProperties?.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </p>
        )}
      </div>

        <div className="mb-12 w-full p-6 rounded-2xl">
          <div className="mb-6 grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(3,1fr)_auto]">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="MapPin" size={16} className="mr-2 inline" />
                Bairro
              </label>
              <select
                value={formFilters.neighborhood}
                onChange={(e) => handleFilterChange('neighborhood', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              >
                {neighborhoods.map((neighborhood) => (
                  <option key={neighborhood.value} value={neighborhood.value}>
                    {neighborhood.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="DollarSign" size={16} className="mr-2 inline" />
                Faixa de Preço
              </label>
              <select
                value={formFilters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="Home" size={16} className="mr-2 inline" />
                Tipo de Imóvel
              </label>
              <select
                value={formFilters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-center">
              <Button className="h-12 px-6" variant="default" iconName="Search" iconPosition="left" onClick={applyFilters}>
                Buscar Imóveis
              </Button>
            </div>
          </div>

          {hasActiveFilters && (
            <>
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.neighborhood && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {neighborhoods.find((n) => n.value === filters.neighborhood)?.label}
                    <button onClick={() => removeFilter('neighborhood')} className="ml-2 hover:text-primary/80">
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                )}
                {filters.priceRange && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {priceRanges.find((p) => p.value === filters.priceRange)?.label}
                    <button onClick={() => removeFilter('priceRange')} className="ml-2 hover:text-primary/80">
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                )}
                {filters.propertyType && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {propertyTypes.find((t) => t.value === filters.propertyType)?.label}
                    <button onClick={() => removeFilter('propertyType')} className="ml-2 hover:text-primary/80">
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline" iconName="RotateCcw" iconPosition="left" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            </>
          )}
        </div>

        {filteredProperties?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou entre em contato conosco para mais opções
            </p>
            <Button
              variant="default"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => {
                const message = encodeURIComponent('Olá! Não encontrei imóveis com os filtros selecionados. Podem me ajudar a encontrar outras opções?');
                window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
              }}
              className="bg-accent hover:bg-accent/90"
            >
              Falar com Consultor
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProperties?.map((property) => (
                <div key={property?.id} className="property-card bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative">
                    <div className="h-64 overflow-hidden">
                      <Image
                        src={property?.image}
                        alt={property?.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      {property?.isNew && (
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Novo
                        </span>
                      )}
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                        {property?.neighborhood}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => toggleFavorite(property?.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Icon 
                        name="Heart" 
                        size={20} 
                        className={favorites?.has(property?.id) ? 'text-red-500 fill-current' : 'text-gray-600'} 
                      />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {property?.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Icon name="MapPin" size={16} className="mr-1" />
                      <span className="text-sm">{property?.neighborhood}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Icon name="Bed" size={16} className="mr-1" />
                          <span>{property?.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Icon name="Bath" size={16} className="mr-1" />
                          <span>{property?.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Icon name="Square" size={16} className="mr-1" />
                          <span>{property?.area}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {property?.features?.slice(0, 2)?.map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {property?.features?.length > 2 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          +{property?.features?.length - 2} mais
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">
                        {property?.price}
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="MessageCircle"
                        iconPosition="left"
                        onClick={() => handleWhatsAppClick(property)}
                        className="bg-accent hover:bg-accent/90"
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProperties?.length > 6 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  iconName={showMore ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  onClick={() => setShowMore(!showMore)}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {showMore ? 'Ver Menos Imóveis' : `Ver Mais Imóveis (${filteredProperties?.length - 6} restantes)`}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;