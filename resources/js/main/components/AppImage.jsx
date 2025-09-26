import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from "../utils/cn";
import {
  fetchAndCacheImage,
  getCachedImageUrl,
  hasImageCacheConsent,
  IMAGE_CACHE_CONSENT_EVENT,
  removeImageCacheEntry,
} from "@/lib/imageCache";

const FALLBACK_SRC = "/assets/images/no_image.png";

/**
 * AppImage centralises progressive image loading for the marketing pages.
 *
 * ```jsx
 * <AppImage
 *   src="/hero/full-res.jpg"
 *   placeholderSrc="/hero/placeholder.jpg"
 *   srcSet="/hero/full-res.jpg 1920w, /hero/full-res@2x.jpg 2880w"
 *   sizes="(min-width: 1024px) 100vw, 100vw"
 *   fetchPriority="high"
 *   loading="eager"
 * />
 * ```
 *
 * - `placeholderSrc` renders beneath the main image and fades out once the
 *   full asset loads.
 * - Pass `srcSet` and `sizes` to take advantage of responsive images without
 *   duplicating logic in each consumer.
 * - Non-critical images default to `loading="lazy"` and `decoding="async"`
 *   to keep hero assets responsive while they stream in.
 *
 * Historically this component only orchestrated placeholders/responsive
 * sources, forcing every visit to re-download heavy hero/gallery assets. The
 * implementation now integrates with `imageCache` so that, once visitors grant
 * consent for cookie/localStorage usage, high-resolution payloads are persisted
 * and reused across sessions without disrupting the fade-in placeholder flow.
 */
const AppImage = forwardRef(function AppImage({
  src,
  alt = "Image Name",
  className = "",
  wrapperClassName,
  imgClassName,
  placeholderSrc,
  placeholderClassName = "",
  onLoad: onLoadProp,
  onError: onErrorProp,
  srcSet,
  sizes,
  fetchPriority,
  loading = "lazy",
  decoding = "async",
  ...props
}, ref) {
  const [currentSrc, setCurrentSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [hasConsent, setHasConsent] = useState(() => hasImageCacheConsent());
  const objectUrlRef = useRef(null);
  const internalImgRef = useRef(null);

  const setImgRefs = useCallback(
    (node) => {
      internalImgRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        ref.current = node;
      }
    },
    [ref]
  );

  const updateObjectUrl = useCallback((nextUrl) => {
    if (typeof window === "undefined") return;
    if (typeof URL === "undefined" || typeof URL.revokeObjectURL !== "function") {
      objectUrlRef.current = nextUrl ?? null;
      return;
    }
    const currentUrl = objectUrlRef.current;
    if (currentUrl && currentUrl !== nextUrl) {
      URL.revokeObjectURL(currentUrl);
    }
    objectUrlRef.current = nextUrl ?? null;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleConsentChange = (event) => {
      const consent = event?.detail?.consent;
      setHasConsent(consent === "granted");
    };

    window.addEventListener(IMAGE_CACHE_CONSENT_EVENT, handleConsentChange);

    return () => {
      window.removeEventListener(IMAGE_CACHE_CONSENT_EVENT, handleConsentChange);
    };
  }, []);

  useEffect(() => () => updateObjectUrl(null), [updateObjectUrl]);

  useEffect(() => {
    setIsLoaded(false);
    setHasTriedFallback(false);
  }, [src]);

  useEffect(() => {
    let isMounted = true;

    updateObjectUrl(null);
    setCurrentSrc(undefined);

    if (!src) {
      return () => {
        isMounted = false;
      };
    }

    if (typeof window === "undefined" || !hasConsent) {
      setCurrentSrc(src);
      return () => {
        isMounted = false;
      };
    }

    (async () => {
      try {
        const cachedUrl = await getCachedImageUrl(src);
        if (!isMounted) {
          if (cachedUrl) {
            updateObjectUrl(null);
            if (typeof URL !== "undefined" && typeof URL.revokeObjectURL === "function") {
              URL.revokeObjectURL(cachedUrl);
            }
          }
          return;
        }

        if (cachedUrl) {
          updateObjectUrl(cachedUrl);
          setCurrentSrc(cachedUrl);
          return;
        }

        const objectUrl = await fetchAndCacheImage(src);
        if (!isMounted) {
          if (typeof URL !== "undefined" && typeof URL.revokeObjectURL === "function") {
            URL.revokeObjectURL(objectUrl);
          }
          return;
        }

        updateObjectUrl(objectUrl);
        setCurrentSrc(objectUrl);
      } catch (error) {
        updateObjectUrl(null);
        setCurrentSrc(src);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [src, hasConsent, updateObjectUrl]);

  const handleLoad = useCallback(
    (event) => {
      if (isLoaded) return;

      setIsLoaded(true);

      if (event) {
        onLoadProp?.(event);
        return;
      }

      if (typeof onLoadProp === "function") {
        const imageElement = internalImgRef.current;
        onLoadProp({
          type: "load",
          target: imageElement,
          currentTarget: imageElement,
        });
      }
    },
    [isLoaded, onLoadProp]
  );

  const handleError = (event) => {
    if (!hasTriedFallback) {
      if (currentSrc && currentSrc.startsWith("blob:") && src) {
        setHasTriedFallback(true);
        updateObjectUrl(null);
        removeImageCacheEntry(src).catch(() => {});
        setCurrentSrc(src);
        setIsLoaded(false);
        return;
      }

      if (currentSrc !== FALLBACK_SRC) {
        setHasTriedFallback(true);
        updateObjectUrl(null);
        setCurrentSrc(FALLBACK_SRC);
        setIsLoaded(false);
        return;
      }
    }

    onErrorProp?.(event);
  };

  const resolvedWrapperClassName = cn(
    "relative block overflow-hidden",
    wrapperClassName ?? className
  );

  const resolvedImgClassName = cn(
    "h-full w-full object-cover transition-all duration-500",
    imgClassName ?? className,
    isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
  );

  const resolvedPlaceholderClassName = cn(
    "absolute inset-0 z-[1] h-full w-full object-cover blur-sm transition-opacity duration-500",
    isLoaded ? "opacity-0" : "opacity-100",
    placeholderClassName
  );

  useEffect(() => {
    const imageElement = internalImgRef.current;

    if (!imageElement || !currentSrc || isLoaded) {
      return;
    }

    if (imageElement.complete && imageElement.naturalWidth > 0) {
      handleLoad();
    }
  }, [currentSrc, handleLoad, isLoaded]);

  return (
    <span className={resolvedWrapperClassName}>
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className={resolvedPlaceholderClassName}
          loading="lazy"
          decoding="async"
        />
      )}

      <img
        ref={setImgRefs}
        src={currentSrc ?? undefined}
        alt={alt}
        className={cn("relative z-[2]", resolvedImgClassName)}
        onLoad={handleLoad}
        onError={handleError}
        srcSet={srcSet}
        sizes={sizes}
        fetchPriority={fetchPriority}
        loading={loading}
        decoding={decoding}
        {...props}
      />
    </span>
  );
});

export default AppImage;
