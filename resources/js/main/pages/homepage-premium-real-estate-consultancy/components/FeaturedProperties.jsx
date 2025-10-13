import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Icon from '../../../components/AppIcon';
import PropertyAreaMetrics from '@/components/PropertyAreaMetrics';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PLACEHOLDER_QUALITY = '10';
const PLACEHOLDER_BLUR = '50';
const DEFAULT_PLACEHOLDER_IMAGE = '/assets/images/no_image.png';

const buildUnsplashUrl = (url, paramsToMerge = {}) => {
  if (!url) return null;

  try {
    const [path, search = ""] = url.split('?');
    const params = new URLSearchParams(search);

    Object.entries(paramsToMerge).forEach(([key, value]) => {
      if (typeof value === 'undefined' || value === null) return;
      params.set(key, String(value));
    });

    if (!params.has('auto')) {
      params.set('auto', 'format');
    }

    return `${path}?${params.toString()}`;
  } catch (error) {
    return url;
  }
};

const buildPlaceholderSrc = (url) => {
  if (!url) return null;

  const isUnsplash = url.includes('images.unsplash.com') || url.includes('unsplash.com');
  if (isUnsplash) {
    return buildUnsplashUrl(url, { q: PLACEHOLDER_QUALITY, blur: PLACEHOLDER_BLUR });
  }

  return url;
};

const buildResponsiveSrcSet = (url) => {
  if (!url) return null;

  const isUnsplash = url.includes('images.unsplash.com') || url.includes('unsplash.com');
  if (!isUnsplash) {
    return null;
  }

  const widths = [480, 768, 1024, 1440];
  const srcSet = widths
    .map((width) => `${buildUnsplashUrl(url, { w: width, q: 80 })} ${width}w`)
    .join(', ');

  return srcSet;
};

const CARD_IMAGE_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
const MODAL_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px';

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

const extractThumbnailsFromRecord = (record) => {
  if (!record) return [];

  const candidateFields = [
    'thumbnails',
    'gallery_thumbnails',
    'galleryThumbnails',
    'galleryThumbs',
    'gallery_thumbs',
    'images_thumbnails',
    'image_thumbnails',
    'thumbs',
  ];

  for (const field of candidateFields) {
    const normalized = normalizeImageArray(record?.[field]);
    if (normalized.length) {
      return normalized;
    }
  }

  return [];
};

const buildGalleryEntries = (property) => {
  if (!property) return [];

  const thumbnails = extractThumbnailsFromRecord(property);
  const fallbackImage =
    normalizeImageValue(property.image) ||
    normalizeImageValue(property.image_url) ||
    null;

  const galleryCandidates = [];

  if (Array.isArray(property.gallery) && property.gallery.length) {
    galleryCandidates.push(...property.gallery);
  } else if (Array.isArray(property.galleryEntries) && property.galleryEntries.length) {
    galleryCandidates.push(...property.galleryEntries);
  }

  if (!galleryCandidates.length) {
    const extracted = extractGalleryFromRecord(property);
    if (extracted.length) {
      galleryCandidates.push(...extracted);
    }
  }

  if (!galleryCandidates.length && fallbackImage) {
    galleryCandidates.push(fallbackImage);
  }

  const entries = galleryCandidates
    .map((candidate, index) => {
      if (candidate && typeof candidate === 'object' && typeof candidate.src === 'string') {
        const src = candidate.src;
        const placeholder =
          candidate.placeholder ||
          candidate.placeholderSrc ||
          candidate.placeholder_url ||
          candidate.placeholderUrl ||
          candidate.blurDataURL ||
          candidate.blurDataUrl ||
          thumbnails[index] ||
          thumbnails[0] ||
          buildPlaceholderSrc(src) ||
          DEFAULT_PLACEHOLDER_IMAGE;

        const srcSet =
          candidate.srcSet ||
          candidate.srcset ||
          candidate.src_set ||
          buildResponsiveSrcSet(src);

        return {
          ...candidate,
          src,
          placeholder,
          srcSet,
        };
      }

      const src = normalizeImageValue(candidate);
      if (!src) return null;

      const placeholderCandidate = thumbnails[index] || thumbnails[0];

      return {
        src,
        placeholder: placeholderCandidate || buildPlaceholderSrc(src) || DEFAULT_PLACEHOLDER_IMAGE,
        srcSet: buildResponsiveSrcSet(src),
      };
    })
    .filter(Boolean);

  if (entries.length) {
    return entries;
  }

  return [
    {
      src: DEFAULT_PLACEHOLDER_IMAGE,
      placeholder: DEFAULT_PLACEHOLDER_IMAGE,
      srcSet: null,
    },
  ];
};

const DESCRIPTION_CANDIDATE_KEYS = [
  'description',
  'descricao',
  'description_text',
  'descriptionText',
  'resumo',
  'resumo_texto',
  'resumoTexto',
  'details',
  'detalhes'
];

const extractDescription = (record) => {
  if (!record || typeof record !== 'object') return '';
  for (const key of DESCRIPTION_CANDIDATE_KEYS) {
    const value = record[key];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }
  return '';
};

const getPropertyGallery = (property) => {
  if (!property) return [];
  return buildGalleryEntries(property);
};

const GalleryThumbnails = memo(({ gallery, activeIndex, onSelect, title }) => {
  if (!Array.isArray(gallery) || !gallery.length) {
    return null;
  }

  return (
    <div className="flex gap-3 overflow-x-auto bg-white px-6 py-4">
      {gallery.map((entry, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            type="button"
            key={`${entry?.src || 'thumb'}-${index}`}
            onClick={() => onSelect(index)}
            className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 ${
              isActive ? 'border-primary' : 'border-transparent'
            }`}
            aria-label={`Ver imagem ${index + 1}`}
          >
            <Image
              src={entry?.src}
              alt={`${title} - miniatura ${index + 1}`}
              wrapperClassName="h-full w-full"
              imgClassName="h-full w-full object-cover"
              placeholderSrc={entry?.placeholder || buildPlaceholderSrc(entry?.src)}
              srcSet={entry?.srcSet}
              sizes="112px"
              loading="lazy"
              decoding="async"
            />
            {isActive && <span className="absolute inset-0 border-2 border-primary" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
});

GalleryThumbnails.displayName = 'GalleryThumbnails';

const PropertyCard = ({ property, favorites, onToggleFavorite, onOpenModal, onWhatsAppClick }) => {
  const propertyGallery = useMemo(() => getPropertyGallery(property), [property]);
  const primaryImageEntry = propertyGallery[0] || {
    src: property?.image || null,
    placeholder: property?.imagePlaceholder || buildPlaceholderSrc(property?.image || null),
    srcSet: property?.imageSrcSet || buildResponsiveSrcSet(property?.image || null),
  };

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [primaryImageEntry?.src]);

  return (
    <div className="property-card flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpenModal({ ...property, gallery: propertyGallery })}
          className="group relative block h-64 w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <div className="relative h-64 w-full">
            {!isImageLoaded && (
              <span className="absolute inset-0 z-[0] animate-pulse bg-slate-200" aria-hidden="true" />
            )}
            <Image
              src={primaryImageEntry?.src}
              alt={property?.title}
              wrapperClassName="h-64 w-full"
              imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              placeholderSrc={primaryImageEntry?.placeholder}
              srcSet={primaryImageEntry?.srcSet}
              sizes={CARD_IMAGE_SIZES}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
          <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            <Icon name="Images" size={14} className="text-white" />
            Ver galeria
          </span>
        </button>

        <div className="absolute top-4 left-4 flex gap-2">
          {property?.isNew && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Novo</span>
          )}
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
            {property?.neighborhood}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(property?.id)}
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
        <h3 className="mb-2 text-xl font-bold text-gray-900">{property?.title}</h3>

        <div className="mb-4 flex items-center text-gray-600">
          <Icon name="MapPin" size={16} className="mr-1" />
          <span className="text-sm">{property?.neighborhood}</span>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Icon name="Bed" size={16} className="mr-1" />
              {property?.bedrooms}
            </div>
            <div className="flex items-center">
              <Icon name="Bath" size={16} className="mr-1" />
              {property?.bathrooms}
            </div>
            <PropertyAreaMetrics builtArea={property?.builtAreaText} area={property?.area} />
          </div>
        </div>

        {property?.description && (
          <p className="mb-4 text-sm text-gray-700 whitespace-pre-line break-words line-clamp-4">
            {property.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">{property?.price}</div>
          <Button
            variant="default"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => onWhatsAppClick(property)}
            className="bg-accent hover:bg-accent/90"
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [filters, setFilters] = useState({
    neighborhood: '',
    priceRange: '',
    propertyType: '',
    lotAreaRange: '',
    privateAreaRange: ''
  });
  const [formFilters, setFormFilters] = useState({
    neighborhood: '',
    priceRange: '',
    propertyType: '',
    lotAreaRange: '',
    privateAreaRange: ''
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
            const galleryEntries = buildGalleryEntries(p);
            const primaryImageEntry = galleryEntries[0] || null;
            const fallbackImage =
              normalizeImageValue(p.image) ||
              normalizeImageValue(p.image_url) ||
              DEFAULT_PLACEHOLDER_IMAGE;

            // Helpers to parse numeric values from strings like "120 m²" or "R$ 1.200.000"
            const parseArea = (val) => {
              if (val == null) return null;
              const m = String(val).match(/([0-9]+([\.,][0-9]+)?)/);
              return m ? parseFloat(m[1].replace('.', '').replace(',', '.')) : null;
            };
            const parsePrice = (val) => {
              if (val == null) return null;
              const m = String(val).match(/([0-9\.\,]+)/);
              if (!m) return null;
              return Number(m[1].replace(/\./g, '').replace(',', '.')) || null;
            };
            const lotArea = parseArea(p.lot_area ?? p.lotArea ?? p.terreno ?? p.landSize ?? null);
            const privateArea = parseArea(p.built_area ?? p.private_area ?? p.privateArea ?? p.area_privativa ?? p.areaPrivativa ?? p.area ?? null);
            const priceNumber = parsePrice(p.price);
            const resolvePriceRange = () => {
              if (p.price_range) return p.price_range;
              if (typeof priceNumber !== 'number' || Number.isNaN(priceNumber)) return '';
              if (priceNumber >= 3000000) return '3000000+';
              if (priceNumber >= 2500000) return '2500000-3000000';
              if (priceNumber >= 1800000) return '1800000-2500000';
              if (priceNumber >= 1200000) return '1200000-1800000';
              if (priceNumber >= 800000) return '800000-1200000';
              return '';
            };

            const rawDescription = extractDescription(p);
            const fallbackDescription = Array.isArray(p.features)
              ? p.features.filter(Boolean).join(' · ')
              : '';

            return {
              id: p.id,
              title: p.title,
              neighborhood: p.neighborhood,
              price: p.price,
              bedrooms: p.bedrooms,
              bathrooms: p.bathrooms,
              area: p.area,
              builtAreaText: (() => {
  const M2 = 'm' + String.fromCharCode(178);
  const raw = p.built_area;
  if (raw != null) {
    const digits = String(raw).replace(/\D/g, '');
    if (digits) {
      const n = parseInt(digits, 10);
      try { return `${n.toLocaleString('pt-BR')} ${M2}`; } catch { return `${n} ${M2}`; }
    }
  }
  if (privateArea != null) {
    try { return `${privateArea.toLocaleString('pt-BR')} ${M2}`; } catch { return `${privateArea} ${M2}`; }
  }
  return null;
})(),
  lotArea,
              privateArea,
              type: p.type,
              // O backend já entrega image_url e gallery com arquivos do storage; usamos o placeholder padrão só se nada estiver cadastrado.
              image: primaryImageEntry?.src || fallbackImage,
              imagePlaceholder:
                primaryImageEntry?.placeholder ||
                buildPlaceholderSrc(fallbackImage) ||
                DEFAULT_PLACEHOLDER_IMAGE,
              imageSrcSet: primaryImageEntry?.srcSet || buildResponsiveSrcSet(fallbackImage),
              gallery: galleryEntries,
              galleryEntries,
              description: rawDescription || fallbackDescription,
              isNew: !!p.is_new,
              priceRange: resolvePriceRange(),
            };
          });
          setRemote(mapped);
        }
      } catch {}
    })();
  }, []);

  // Caso a API não retorne imóveis, preferimos exibir o estado vazio em vez de recorrer ao mock com imagens do Unsplash.

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
    { value: '', label: 'Todas as Regiões' },
    { value: 'regiao-parque-cascavel', label: 'Região – Próximo ao Parque Cascavel' },
    { value: 'aparecida-av-sao-paulo', label: 'Aparecida – Próximo à Av. São Paulo' },
    { value: 'aparecida-sitio-santa-luzia', label: 'Aparecida – Sítio Santa Luzia' },
    { value: 'aparecida-outros', label: 'Aparecida – Outros' },
    { value: 'noroeste-prox-hugol', label: 'Noroeste – Próximo ao Hugol' },
    { value: 'norte-prox-campus', label: 'Norte – Próximo ao Campus' },
    { value: 'norte-prox-passeio-das-aguas', label: 'Norte – Próximo ao Passeio das Águas' },
    { value: 'norte-prox-embrapa', label: 'Norte – Próximo à Embrapa' },
    { value: 'go020-prox-flamboyant', label: 'Região GO 020 – Próximo ao Flamboyant' },
    { value: 'go020-prox-sunset-wake-park', label: 'Região GO 020 – Próximo ao Sunset Wake Park' },
    { value: 'go020-novos-jardins', label: 'Região GO 020 – Novos Jardins' },
    { value: 'sul-saida-hidrolandia', label: 'Região Sul – Saída para Hidrolândia' },
    { value: 'sul-saida-aragoiania', label: 'Região Sul – Saída para Aragoiânia' },
    { value: 'oeste-saida-trindade', label: 'Região Oeste – Saída para Trindade' },
    { value: 'sudeste-saida-bonfinopolis-leopoldo', label: 'Região Sudeste – Saída para Bonfinópolis/Leopoldo de Bulhões' },
  ];

  const priceRanges = [
    { value: '', label: 'Qualquer valor' },
    { value: '800000-1200000', label: 'R$ 800.000 - R$ 1.200.000' },
    { value: '1200000-1800000', label: 'R$ 1.200.000 - R$ 1.800.000' },
    { value: '1800000-2500000', label: 'R$ 1.800.000 - R$ 2.500.000' },
    { value: '2500000-3000000', label: 'R$ 2.500.000 - R$ 3.000.000' },
    { value: '3000000+', label: 'Acima de R$ 3.000.000' },
  ];

  const propertyTypes = [
    { value: '', label: 'Todos os tipos' },
    { value: 'condominio-casas-sobrados', label: 'Condomínio de Casas/Sobrados' },
    { value: 'condominios-lotes', label: 'Condomínios de lotes' },
    { value: 'sitios-lazer', label: 'Sítios de lazer' },
  ];

  const lotAreaRanges = [
    { value: '', label: 'Qualquer metragem (terreno)' },
    { value: '0-200', label: 'Até 200 m²' },
    { value: '200-400', label: '200 a 400 m²' },
    { value: '400-600', label: '400 a 600 m²' },
    { value: '600+', label: 'Acima de 600 m²' },
  ];

  const privateAreaRanges = [
    { value: '', label: 'Qualquer metragem (área privativa)' },
    { value: '0-80', label: 'Até 80 m²' },
    { value: '80-120', label: '80 a 120 m²' },
    { value: '120-200', label: '120 a 200 m²' },
    { value: '200+', label: 'Acima de 200 m²' },
  ];

  const handleFilterChange = (type, value) => {
    setFormFilters((prev) => ({ ...prev, [type]: value }));
  };

  const applyFilters = () => {
    setFilters(formFilters);
  };

  const clearFilters = () => {
    const cleared = { neighborhood: '', priceRange: '', propertyType: '', lotAreaRange: '', privateAreaRange: '' };
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

  const filterProperties = (properties = []) => {
    const slugify = (s) =>
      String(s || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    const parseRange = (value) => {
      if (!value) return [null, null];
      if (value.endsWith('+')) return [Number(value.replace('+','')), null];
      const [min, max] = value.split('-').map((v) => Number(v));
      return [Number.isFinite(min) ? min : null, Number.isFinite(max) ? max : null];
    };

    const [lotMin, lotMax] = parseRange(filters.lotAreaRange);
    const [privMin, privMax] = parseRange(filters.privateAreaRange);

    return properties.filter((property) => {
      if (filters.neighborhood) {
        const pSlug = slugify(property?.neighborhood);
        if (!pSlug.includes(filters.neighborhood)) {
          return false;
        }
      }
      if (filters.priceRange && property?.priceRange !== filters.priceRange) {
        return false;
      }
      if (filters.propertyType && property?.type !== filters.propertyType) {
        return false;
      }
      if (filters.lotAreaRange) {
        const value = property?.lotArea;
        if (value == null) {
          // If data doesn't have lot area, we don't include/exclude; skip filtering by lot area
        } else {
          if (lotMin != null && value < lotMin) return false;
          if (lotMax != null && value > lotMax) return false;
        }
      }
      if (filters.privateAreaRange) {
        const value = property?.privateArea ?? (typeof property?.area === 'number' ? property.area : null);
        if (value == null) {
          // try parsing if area is a string (treat separators as thousands)
          const digitsOnly = String(property?.area ?? '').replace(/\D/g, '');
          const parsed = digitsOnly ? parseInt(digitsOnly, 10) : null;
          if (parsed != null) {
            if (privMin != null && parsed < privMin) return false;
            if (privMax != null && parsed > privMax) return false;
          }
        } else {
          if (privMin != null && value < privMin) return false;
          if (privMax != null && value > privMax) return false;
        }
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
  const activeImageEntry = activeGallery[activeImageIndex] || null;
  const hasGalleryNavigation = activeGallery.length > 1;

  const handleModalPrev = () => {
    if (!hasGalleryNavigation) return;
    setActiveImageIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);
  };

  const handleModalNext = () => {
    if (!hasGalleryNavigation) return;
    setActiveImageIndex((prev) => (prev + 1) % activeGallery.length);
  };

  useEffect(() => {
    if (!hasGalleryNavigation || typeof window === 'undefined') return;

    const preloadIndices = [
      (activeImageIndex + 1) % activeGallery.length,
      (activeImageIndex - 1 + activeGallery.length) % activeGallery.length,
    ].filter((index, pos, arr) => index !== activeImageIndex && arr.indexOf(index) === pos);

    preloadIndices.forEach((index) => {
      const entry = activeGallery[index];
      if (!entry?.src) return;

      const img = new window.Image();
      if (entry.srcSet) {
        img.srcset = entry.srcSet;
      }
      img.src = entry.src;
    });
  }, [activeGallery, activeImageIndex, hasGalleryNavigation]);

  return (
    <section id="listagem" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Diferenciais de cada imovel
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Seleção exclusiva de imóveis por região, com detalhes que vão além do básico.
            <span className="block mt-2 font-semibold italic text-gray-900">
              Quer descobrir o que ninguém te conta ou receber um filtro personalizado para as necessidades da sua família? Fale conosco.
            </span>
          </p>
          {filteredProperties?.length > 0 && (
            <p className="text-sm text-primary font-medium mt-2">
              {filteredProperties?.length}{' '}
              {filteredProperties?.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </p>
          )}
        </div>

        <div className="mb-12 w-full rounded-2xl p-6">
          <div className="mb-6 grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(5,minmax(0,1fr))_auto] md:items-end">
            <div className="space-y-2 md:self-end min-w-0">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="MapPin" size={16} className="mr-2 inline" />
                Região
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

            <div className="space-y-2 md:self-end min-w-0">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="DollarSign" size={16} className="mr-2 inline" />
                Valor
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

            <div className="space-y-2 md:self-end min-w-0">
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

            <div className="space-y-2 md:self-end min-w-0">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="Ruler" size={16} className="mr-2 inline" />
                Metragem do terreno
              </label>
              <select
                value={formFilters.lotAreaRange}
                onChange={(e) => handleFilterChange('lotAreaRange', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              >
                {lotAreaRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:self-end min-w-0">
              <label className="block text-sm font-medium text-gray-700">
                <Icon name="Ruler" size={16} className="mr-2 inline" />
                Área privativa
              </label>
              <select
                value={formFilters.privateAreaRange}
                onChange={(e) => handleFilterChange('privateAreaRange', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              >
                {privateAreaRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-end">
            <Button className="h-12 px-6" variant="default" iconName="Search" iconPosition="left" onClick={applyFilters}></Button>
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
              {filters.lotAreaRange && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {lotAreaRanges.find((r) => r.value === filters.lotAreaRange)?.label}
                  <button onClick={() => removeFilter('lotAreaRange')} className="ml-2 hover:text-primary/80">
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
              {filters.privateAreaRange && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {privateAreaRanges.find((r) => r.value === filters.privateAreaRange)?.label}
                  <button onClick={() => removeFilter('privateAreaRange')} className="ml-2 hover:text-primary/80">
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
              {filteredProperties?.map((property) => (
                <PropertyCard
                  key={property?.id}
                  property={property}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onOpenModal={openModal}
                  onWhatsAppClick={handleWhatsAppClick}
                />
              ))}
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
                  src={activeImageEntry?.src}
                  alt={`${activeProperty.title} - imagem ${activeImageIndex + 1}`}
                  wrapperClassName="block w-full"
                  imgClassName="h-[60vh] w-full object-cover"
                  placeholderSrc={activeImageEntry?.placeholder || buildPlaceholderSrc(activeImageEntry?.src)}
                  srcSet={activeImageEntry?.srcSet}
                  sizes={MODAL_IMAGE_SIZES}
                  loading="lazy"
                  decoding="async"
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
                <GalleryThumbnails
                  gallery={activeGallery}
                  activeIndex={activeImageIndex}
                  onSelect={setActiveImageIndex}
                  title={activeProperty.title}
                />
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
                  <PropertyAreaMetrics builtArea={activeProperty?.builtAreaText} area={activeProperty?.area} />
                </div>
                {activeProperty.description && (
                  <p className="mt-6 whitespace-pre-line break-words text-base text-gray-700">
                    {activeProperty.description}
                  </p>
                )}
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
