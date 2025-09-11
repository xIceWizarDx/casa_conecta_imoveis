import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyFilters = ({ onFiltersChange }) => {
    const [activeFilters, setActiveFilters] = useState({
        neighborhood: '',
        priceRange: '',
        propertyType: '',
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

    const handleFilterChange = (filterType, value) => {
        const newFilters = {
            ...activeFilters,
            [filterType]: value,
        };
        setActiveFilters(newFilters);
        onFiltersChange?.(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            neighborhood: '',
            priceRange: '',
            propertyType: '',
        };
        setActiveFilters(clearedFilters);
        onFiltersChange?.(clearedFilters);
    };

    const hasActiveFilters = Object.values(activeFilters)?.some((filter) => filter !== '');

    return (
        <section className="border-b border-gray-200 bg-white py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Encontre Seu Imóvel Ideal</h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Use nossos filtros inteligentes para descobrir propriedades premium nos melhores bairros de Goiânia
                    </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-6">
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                        {/* Neighborhood Filter */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <Icon name="MapPin" size={16} className="mr-2 inline" />
                                Bairro
                            </label>
                            <select
                                value={activeFilters?.neighborhood}
                                onChange={(e) => handleFilterChange('neighborhood', e?.target?.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
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
                                <Icon name="DollarSign" size={16} className="mr-2 inline" />
                                Faixa de Preço
                            </label>
                            <select
                                value={activeFilters?.priceRange}
                                onChange={(e) => handleFilterChange('priceRange', e?.target?.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
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
                                <Icon name="Home" size={16} className="mr-2 inline" />
                                Tipo de Imóvel
                            </label>
                            <select
                                value={activeFilters?.propertyType}
                                onChange={(e) => handleFilterChange('propertyType', e?.target?.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                            >
                                {propertyTypes?.map((type) => (
                                    <option key={type?.value} value={type?.value}>
                                        {type?.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end">
                            <Button variant="default" iconName="Search" iconPosition="left" onClick={() => onFiltersChange?.(activeFilters)}>
                                Buscar Imóveis
                            </Button>
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {activeFilters?.neighborhood && (
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                                        {neighborhoods?.find((n) => n?.value === activeFilters?.neighborhood)?.label}
                                        <button onClick={() => handleFilterChange('neighborhood', '')} className="ml-2 hover:text-primary/80">
                                            <Icon name="X" size={14} />
                                        </button>
                                    </span>
                                )}
                                {activeFilters?.priceRange && (
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                                        {priceRanges?.find((p) => p?.value === activeFilters?.priceRange)?.label}
                                        <button onClick={() => handleFilterChange('priceRange', '')} className="ml-2 hover:text-primary/80">
                                            <Icon name="X" size={14} />
                                        </button>
                                    </span>
                                )}
                                {activeFilters?.propertyType && (
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                                        {propertyTypes?.find((t) => t?.value === activeFilters?.propertyType)?.label}
                                        <button onClick={() => handleFilterChange('propertyType', '')} className="ml-2 hover:text-primary/80">
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
            </div>
        </section>
    );
};

export default PropertyFilters;
