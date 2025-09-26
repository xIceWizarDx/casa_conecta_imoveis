import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const normalizeImageValue = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return (
      value.url ||
      value.image_url ||
      value.imageUrl ||
      value.src ||
      value.source ||
      value.path ||
      null
    );
  }
  return null;
};

const normalizeImageArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeImageValue(item))
      .filter((item) => typeof item === 'string' && item.length > 0);
  }
  return [];
};

const extractGalleryFromRecord = (record) => {
  if (!record) return [];

  const candidateFields = [
    'gallery',
    'gallery_images',
    'galleryImages',
    'imageGallery',
    'images',
    'image_urls',
    'photos',
    'media',
  ];

  for (const field of candidateFields) {
    const normalized = normalizeImageArray(record?.[field]);
    if (normalized.length) {
      return normalized;
    }
  }

  return [];
};

const getPropertyGallery = (property) => {
  if (!property) return [];
  const gallery = extractGalleryFromRecord(property);
  if (gallery.length) {
    return gallery;
  }
  const primary = normalizeImageValue(property.image) || normalizeImageValue(property.image_url);
  return primary ? [primary] : [];
};

const FeaturedProperties = () => {
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
  const [remote, setRemote] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeGallery = useMemo(() => getPropertyGallery(activeProperty), [activeProperty]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/featured-properties');
        if (res.ok) {
          const data = await res.json();
          const mapped = (data || []).map((p) => {
            const galleryFromRecord = extractGalleryFromRecord(p);
            const fallbackImage = normalizeImageValue(p.image) || p.image_url || null;
            const gallery = galleryFromRecord.length
              ? galleryFromRecord
              : fallbackImage
                ? [fallbackImage]
                : [];

            return {
              id: p.id,
              title: p.title,
              neighborhood: p.neighborhood,
              price: p.price,
              bedrooms: p.bedrooms,
              bathrooms: p.bathrooms,
              area: p.area,
              type: p.type,
              image: gallery[0] || fallbackImage,
              gallery,
              features: Array.isArray(p.features) ? p.features : [],
              isNew: !!p.is_new,
              priceRange: p.price_range || '',
            };
          });
          setRemote(mapped);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (!isModalOpen || typeof document === 'undefined') {
      return undefined;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setActiveProperty(null);
    setActiveImageIndex(0);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const galleryLength = activeGallery.length;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      } else if (event.key === 'ArrowLeft' && galleryLength > 1) {
        event.preventDefault();
        setActiveImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
      } else if (event.key === 'ArrowRight' && galleryLength > 1) {
        event.preventDefault();
        setActiveImageIndex((prev) => (prev + 1) % galleryLength);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, activeGallery.length, closeModal]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeProperty]);

  useEffect(() => {
    if (!activeGallery.length) return;
    setActiveImageIndex((prev) => Math.min(prev, activeGallery.length - 1));
  }, [activeGallery.length]);

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
    setFormFilters((prev) => ({ ...prev, [type]: value }));
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
    setFilters((prev) => ({ ...prev, [type]: '' }));
  };

  const hasActiveFilters = Object.values(filters).some((f) => f !== '');

  const list = Array.isArray(remote) ? remote : [];

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

  const filteredProperties = filterProperties(list);

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const handleWhatsAppClick = (property) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${property?.title} - ${property?.price}. Gostaria de agendar uma visita.`);
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  const openModal = (property) => {
    setActiveProperty(property);
    setActiveImageIndex(0);
    setIsModalOpen(true);
  };
  const hasGalleryNavigation = activeGallery.length > 1;

  const handleModalPrev = () => {
    if (!hasGalleryNavigation) return;
    setActiveImageIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);
  };

  const handleModalNext = () => {
    if (!hasGalleryNavigation) return;
    setActiveImageIndex((prev) => (prev + 1) % activeGallery.length);
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
              {filteredProperties?.length}{' '}
              {filteredProperties?.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </p>
          )}
        </div>

        <div className="mb-12 w-full rounded-2xl p-6">
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
          <div className="py-12 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Nenhum imóvel encontrado
            </h3>
            <p className="mb-6 text-gray-600">
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
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProperties?.map((property) => {
                const propertyGallery = property.gallery?.length
                  ? property.gallery
                  : getPropertyGallery(property);
                const primaryImage = property.image || propertyGallery[0] || '';

                return (
                  <div key={property?.id} className="property-card flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => openModal({ ...property, gallery: propertyGallery })}
                        className="group relative block h-64 w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        <Image
                          src={primaryImage}
                          alt={property?.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                          <Icon name="Images" size={14} className="text-white" />
                          Ver galeria
                        </span>
                      </button>

                      <div className="absolute top-4 left-4 flex gap-2">
                        {property?.isNew && (
                          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                            Novo
                          </span>
                        )}
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
                          {property?.neighborhood}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(property?.id)}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-colors hover:bg-white"
                        aria-label={favorites?.has(property?.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      >
                        <Icon
                          name="Heart"
                          size={20}
                          className={favorites?.has(property?.id) ? 'fill-current text-red-500' : 'text-gray-600'}
                        />
                      </button>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {property?.title}
                      </h3>

                      <div className="mb-4 flex items-center text-gray-600">
                        <Icon name="MapPin" size={16} className="mr-1" />
                        <span className="text-sm">{property?.neighborhood}</span>
                      </div>

                      <div className="mb-4 flex items-center justify-between">
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

                      <div className="mb-4 flex flex-wrap gap-1">
                        {property?.features?.slice(0, 2)?.map((feature, index) => (
                          <span key={index} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            {feature}
                          </span>
                        ))}
                        {property?.features?.length > 2 && (
                          <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            +{property?.features?.length - 2} mais
                          </span>
                        )}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
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
                );
              })}
            </div>
          </>
        )}
      </div>

      {isModalOpen && activeProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          <div className="absolute inset-0 bg-black/80" onClick={closeModal} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-5xl">
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="Fechar galeria"
              >
                <Icon name="X" size={20} />
              </button>

              <div className="relative bg-black">
                <Image
                  src={activeGallery[activeImageIndex]}
                  alt={`${activeProperty.title} - imagem ${activeImageIndex + 1}`}
                  className="h-[60vh] w-full object-cover"
                />

                {hasGalleryNavigation && (
                  <>
                    <button
                      type="button"
                      onClick={handleModalPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-900 transition hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      aria-label="Imagem anterior"
                    >
                      <Icon name="ChevronLeft" size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={handleModalNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-900 transition hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      aria-label="Próxima imagem"
                    >
                      <Icon name="ChevronRight" size={22} />
                    </button>
                  </>
                )}
              </div>

              {hasGalleryNavigation && (
                <div className="flex gap-3 overflow-x-auto bg-white px-6 py-4">
                  {activeGallery.map((thumb, index) => (
                    <button
                      type="button"
                      key={thumb + index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 ${
                        index === activeImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                      aria-label={`Ver imagem ${index + 1}`}
                    >
                      <Image
                        src={thumb}
                        alt={`${activeProperty.title} - miniatura ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      {index === activeImageIndex && (
                        <span className="absolute inset-0 border-2 border-primary" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="px-6 pb-6 pt-4">
                <h3 className="text-2xl font-bold text-gray-900">{activeProperty.title}</h3>
                <p className="mt-2 flex items-center text-gray-600">
                  <Icon name="MapPin" size={18} className="mr-2" />
                  {activeProperty.neighborhood}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Icon name="Bed" size={16} className="mr-1" />
                    {activeProperty.bedrooms}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Bath" size={16} className="mr-1" />
                    {activeProperty.bathrooms}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Square" size={16} className="mr-1" />
                    {activeProperty.area}
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeProperty.features?.map((feature, index) => (
                    <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-3xl font-semibold text-primary">{activeProperty.price}</span>
                  <Button
                    variant="default"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => handleWhatsAppClick(activeProperty)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Falar no WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;
