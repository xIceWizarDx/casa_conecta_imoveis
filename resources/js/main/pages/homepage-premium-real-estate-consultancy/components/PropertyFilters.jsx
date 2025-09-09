import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyFilters = ({ onFiltersChange }) => {
  const [activeFilters, setActiveFilters] = useState({
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
    { value: 'park-lozandes', label: 'Park Lozandes' }
  ];

  const priceRanges = [
    { value: '', label: 'Qualquer Valor' },
    { value: '800000-1200000', label: 'R$ 800.000 - R$ 1.200.000' },
    { value: '1200000-1800000', label: 'R$ 1.200.000 - R$ 1.800.000' },
    { value: '1800000-2500000', label: 'R$ 1.800.000 - R$ 2.500.000' },
    { value: '2500000-3000000', label: 'R$ 2.500.000 - R$ 3.000.000' },
    { value: '3000000+', label: 'Acima de R$ 3.000.000' }
  ];

  const propertyTypes = [
    { value: '', label: 'Todos os Tipos' },
    { value: 'casa', label: 'Casa' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'cobertura', label: 'Cobertura' },
    { value: 'sobrado', label: 'Sobrado' },
    { value: 'terreno', label: 'Terreno' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value
    };
    setActiveFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      neighborhood: '',
      priceRange: '',
      propertyType: ''
    };
    setActiveFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(filter => filter !== '');

  return (
    <section className="bg-white py-8 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Encontre Seu Imóvel Ideal
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use nossos filtros inteligentes para descobrir propriedades premium nos melhores bairros de Goiânia
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Neighborhood Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="MapPin" size={16} className="inline mr-2" />
                Bairro
              </label>
              <select
                value={activeFilters?.neighborhood}
                onChange={(e) => handleFilterChange('neighborhood', e?.target?.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                {neighborhoods?.map((neighborhood) => (
                  <option key={neighborhood?.value} value={neighborhood?.value}>
                    {neighborhood?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="DollarSign" size={16} className="inline mr-2" />
                Faixa de Preço
              </label>
              <select
                value={activeFilters?.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e?.target?.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                {priceRanges?.map((range) => (
                  <option key={range?.value} value={range?.value}>
                    {range?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="Home" size={16} className="inline mr-2" />
                Tipo de Imóvel
              </label>
              <select
                value={activeFilters?.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e?.target?.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                {propertyTypes?.map((type) => (
                  <option key={type?.value} value={type?.value}>
                    {type?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {hasActiveFilters && (
                <>
                  {activeFilters?.neighborhood && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      {neighborhoods?.find(n => n?.value === activeFilters?.neighborhood)?.label}
                      <button
                        onClick={() => handleFilterChange('neighborhood', '')}
                        className="ml-2 hover:text-primary/80"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </span>
                  )}
                  {activeFilters?.priceRange && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      {priceRanges?.find(p => p?.value === activeFilters?.priceRange)?.label}
                      <button
                        onClick={() => handleFilterChange('priceRange', '')}
                        className="ml-2 hover:text-primary/80"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </span>
                  )}
                  {activeFilters?.propertyType && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      {propertyTypes?.find(t => t?.value === activeFilters?.propertyType)?.label}
                      <button
                        onClick={() => handleFilterChange('propertyType', '')}
                        className="ml-2 hover:text-primary/80"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-3">
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={clearFilters}
                >
                  Limpar Filtros
                </Button>
              )}
              <Button
                variant="default"
                iconName="Search"
                iconPosition="left"
                onClick={() => onFiltersChange?.(activeFilters)}
              >
                Buscar Imóveis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFilters;