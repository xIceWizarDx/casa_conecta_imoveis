import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DEFAULT_SIZES = '(min-width: 1024px) 100vw, 100vw';
const UNSPLASH_HOST = 'images.unsplash.com';
const FALLBACK_IMAGE = '/assets/images/no_image.png';

const ensureUrl = (rawUrl) => {
  try {
    return new URL(
      rawUrl,
      typeof window !== 'undefined' ? window.location.origin : 'https://example.com'
    );
  } catch (error) {
    return null;
  }
};

const buildUnsplashUrl = (rawUrl, params = {}) => {
  const url = ensureUrl(rawUrl);

  if (!url) return rawUrl;

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  if (!url.searchParams.has('auto')) {
    url.searchParams.set('auto', 'format');
  }

  return url.toString();
};

const buildPlaceholderSrc = (rawUrl, fallback) => {
  if (fallback) return fallback;
  if (!rawUrl) return null;

  const url = ensureUrl(rawUrl);

  if (!url) return rawUrl;

  if (url.hostname.includes(UNSPLASH_HOST)) {
    return buildUnsplashUrl(url.toString(), { q: 10, blur: 50 });
  }

  return fallback ?? rawUrl;
};

const buildResponsiveSrcSet = (rawUrl) => {
  if (!rawUrl) return undefined;

  const url = ensureUrl(rawUrl);

  if (!url) return undefined;

  if (url.hostname.includes(UNSPLASH_HOST)) {
    const aspectRatio = 1080 / 1920;
    const widths = [640, 1280, 1920];

    return widths
      .map((width) => {
        const height = Math.round(width * aspectRatio);
        return `${buildUnsplashUrl(rawUrl, { w: width, h: height })} ${width}w`;
      })
      .join(', ');
  }

  return undefined;
};

const HERO_SLIDES_CACHE_TTL = 1000 * 60 * 5;

const heroSlidesCache = {
  data: null,
  fetchedAt: 0,
  promise: null,
};

const mapHeroSlides = (data = []) =>
  data.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    // HeroSlide::image_url já carrega a foto enviada pelo painel de administração,
    // evitando a necessidade de recorrer a imagens fictícias.
    image: s.image_url,
    video: s.video_url,
    price: s.price,
    bedrooms: s.bedrooms,
    bathrooms: s.bathrooms,
    area: s.area,
    neighborhood: s.neighborhood,
    isNew: !!s.is_new,
    placeholder: s.placeholder_url || s.thumbnail_url,
  }));

const shouldUseFreshCache = () =>
  !!heroSlidesCache.data && Date.now() - heroSlidesCache.fetchedAt < HERO_SLIDES_CACHE_TTL;

const fetchHeroSlides = async () => {
  const res = await fetch('/api/hero-slides');
  if (!res.ok) {
    throw new Error('Failed to fetch hero slides');
  }

  const data = await res.json();
  return mapHeroSlides(data || []);
};

const getHeroSlides = () => {
  if (shouldUseFreshCache()) {
    return Promise.resolve(heroSlidesCache.data);
  }

  if (heroSlidesCache.promise) {
    return heroSlidesCache.promise;
  }

  heroSlidesCache.promise = fetchHeroSlides()
    .then((slides) => {
      heroSlidesCache.data = slides;
      heroSlidesCache.fetchedAt = Date.now();
      return slides;
    })
    .catch((error) => {
      if (heroSlidesCache.data) {
        return heroSlidesCache.data;
      }

      throw error;
    })
    .finally(() => {
      heroSlidesCache.promise = null;
    });

  return heroSlidesCache.promise;
};

const HeroCarousel = ({ onFirstSlideReady }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroProperties, setHeroProperties] = useState([]);
  const [loadedSlides, setLoadedSlides] = useState({});
  const [isLoadingSlides, setIsLoadingSlides] = useState(true);
  const firstSlideReadyRef = useRef(false);

  const notifyFirstSlideReady = useCallback(() => {
    if (firstSlideReadyRef.current) return;
    firstSlideReadyRef.current = true;
    if (typeof onFirstSlideReady === 'function') {
      onFirstSlideReady();
    }
  }, [onFirstSlideReady]);

  useEffect(() => {
    let isMounted = true;

    if (heroSlidesCache.data) {
      setHeroProperties(heroSlidesCache.data);
      setIsLoadingSlides(false);
    } else {
      setIsLoadingSlides(true);
    }

    getHeroSlides()
      .then((slides) => {
        if (!isMounted) return;
        setHeroProperties(slides);
        setIsLoadingSlides(false);
      })
      .catch(() => {
        if (!isMounted) return;
        // Já tentamos usar o cache acima; se a requisição falhar e não houver
        // dados anteriores não podemos fazer muito além de manter o fallback.
        setIsLoadingSlides(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const slides = useMemo(() => {
    // Quando a API não retorna slides publicados não devemos recorrer à antiga
    // lista heroPropertiesStatic com URLs do Unsplash, pois isso reintroduz
    // conteúdo fictício no carrossel.
    return heroProperties.map((slide) => {
      const placeholder = buildPlaceholderSrc(slide?.image, slide?.placeholder);
      const srcSet = buildResponsiveSrcSet(slide?.image);

      return {
        ...slide,
        placeholder,
        srcSet,
        sizes: srcSet ? DEFAULT_SIZES : undefined,
      };
    });
  }, [heroProperties]);

  useEffect(() => {
    setLoadedSlides({});
  }, [slides]);

  useEffect(() => {
    if (!isLoadingSlides && !slides.length) {
      notifyFirstSlideReady();
    }
  }, [isLoadingSlides, slides.length, notifyFirstSlideReady]);

  // Avanço automático: imagem avança por tempo; vídeo só ao terminar
  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const current = slides[currentSlide];
    if (!current) return undefined;

    // Se for vídeo, ouvimos o evento "ended"; senão, usamos timer
    if (current.video) {
      // Seleciona o elemento de vídeo do slide atual
      const videoEl = document.querySelector(`video[data-hero-slide="${current.id}"]`);
      if (!videoEl) return undefined;

      const onEnded = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      };
      videoEl.addEventListener('ended', onEnded);
      // Garante reprodução (em alguns navegadores pode precisar do play())
      try { videoEl.play(); } catch {}

      return () => {
        videoEl.removeEventListener('ended', onEnded);
      };
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, slides]);

  useEffect(() => {
    if (currentSlide >= slides.length && slides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

  useEffect(() => {
    if (typeof window === 'undefined' || slides.length <= 1) return undefined;

    const preloadIndices = [
      (currentSlide + 1) % slides.length,
      (currentSlide - 1 + slides.length) % slides.length,
    ];

    const preloaded = preloadIndices
      .filter((index) => index !== currentSlide && slides[index]?.image)
      .map((index) => {
        const img = new window.Image();
        img.decoding = 'async';
        img.src = slides[index].image;
        if (slides[index].srcSet) {
          img.srcset = slides[index].srcSet;
          if (slides[index].sizes) {
            img.sizes = slides[index].sizes;
          }
        }
        return img;
      });

    return () => {
      preloaded.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [currentSlide, slides]);

  const nextSlide = () => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleImageLoad = (index) => () => {
    setLoadedSlides((prev) => ({
      ...prev,
      [index]: true,
    }));
    if (index === 0) {
      notifyFirstSlideReady();
    }
  };

  const handleWhatsAppClick = (property) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${property?.title} - ${property?.price}. Gostaria de mais informações.`);
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  if (!slides.length) {
    return (
      <section className="relative w-full hero-carousel bg-gray-900 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={FALLBACK_IMAGE}
            alt="Banner institucional"
            wrapperClassName="w-full h-full"
            imgClassName="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 hero-overlay z-10" />
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container-responsive">
              <div className="max-w-2xl text-white space-y-6">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Nenhum destaque publicado no momento
                </h1>
                <p className="text-lg sm:text-xl text-gray-100">
                  Assim que novos imóveis forem destacados aqui, você verá as fotos reais cadastradas pelo time Casa Conecta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const hasMultipleSlides = slides.length > 1;

  return (
    <section className="relative w-full hero-carousel bg-gray-900 overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((property, index) => (
          <div
            key={property?.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="relative w-full h-full">
              {property?.video ? (
                <video
                  src={property.video}
                  className="w-full h-full object-cover object-center"
                  autoPlay
                  muted
                  playsInline
                  data-hero-slide={property.id}
                  onLoadedData={handleImageLoad(index)}
                />
              ) : (
                <Image
                  src={property?.image}
                  alt={property?.title}
                  wrapperClassName="w-full h-full"
                  imgClassName="w-full h-full object-cover object-center"
                  placeholderSrc={property?.placeholder}
                  srcSet={property?.srcSet}
                  sizes={property?.sizes}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onLoad={handleImageLoad(index)}
                />
              )}
              <div
                className={`absolute inset-0 hero-overlay transition-all duration-700 z-10 ${
                  loadedSlides[index] ? 'opacity-90 blur-0' : 'opacity-70 blur-sm'
                }`}
              />

              {/* Volta a posição anterior (centrado verticalmente) */}
              <div className="absolute inset-0 flex items-center z-20">
                <div className="container-responsive">
                  <div
                    className={`max-w-3xl text-white transition-all duration-700 ${
                      loadedSlides[index] ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-2'
                    }`}
                  >
                    <div className="mb-4">
                      <span className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary-foreground">
                        <Icon name="MapPin" size={16} className="mr-2" />
                        {property?.neighborhood}
                      </span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance text-shadow leading-tight">
                      {property?.title}
                    </h1>
                    
                    <p className="text-xl sm:text-2xl mb-8 text-gray-100 text-shadow max-w-2xl">
                      {property?.subtitle}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-10">
                      <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                        <Icon name="Bed" size={20} color="white" />
                        <span className="text-sm font-semibold">{property?.bedrooms} quartos</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                        <Icon name="Bath" size={20} color="white" />
                        <span className="text-sm font-semibold">{property?.bathrooms} banheiros</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                        <Icon name="Square" size={20} color="white" />
                        <span className="text-sm font-semibold">{property?.area}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      {/* Preço sem contorno */}
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                        {property?.price}
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <Button
                          variant="default"
                          iconName="MessageCircle"
                          iconPosition="left"
                          onClick={() => handleWhatsAppClick(property)}
                          className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          iconName="Phone"
                          iconPosition="left"
                          onClick={() => window.open('tel:+5562999999999')}
                          className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 text-base backdrop-blur-sm transition-all duration-200"
                        >
                          Ligar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edge gradients to keep navigation controls readable */}
      {hasMultipleSlides && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black/55 via-black/30 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black/55 via-black/30 to-transparent z-10" />
        </>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 shadow-2xl backdrop-blur-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 ${
          hasMultipleSlides
            ? 'bg-slate-950/70 border border-white/40 hover:bg-slate-950/80 hover:scale-110'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Previous slide"
        disabled={slides.length <= 1}
      >
        <Icon name="ChevronLeft" size={28} color="white" />
      </button>

      <button
        onClick={nextSlide}
        className={`absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 shadow-2xl backdrop-blur-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 ${
          hasMultipleSlides
            ? 'bg-slate-950/70 border border-white/40 hover:bg-slate-950/80 hover:scale-110'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Next slide"
        disabled={slides.length <= 1}
      >
        <Icon name="ChevronRight" size={28} color="white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-3 bg-white' :'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={slides.length <= 1}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full gradient-primary transition-all duration-300"
          style={{
            width: `${slides.length ? ((currentSlide + 1) / slides.length) * 100 : 0}%`
          }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;
