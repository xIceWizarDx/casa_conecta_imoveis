import React, { forwardRef, useEffect, useState } from 'react';
import { cn } from "../utils/cn";

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
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasTriedFallback(false);
  }, [src]);

  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoadProp?.(event);
  };

  const handleError = (event) => {
    if (!hasTriedFallback && currentSrc !== FALLBACK_SRC) {
      setHasTriedFallback(true);
      setCurrentSrc(FALLBACK_SRC);
      setIsLoaded(false);
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
        ref={ref}
        src={currentSrc}
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
