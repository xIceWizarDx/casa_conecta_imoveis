import { useEffect, useMemo, useState } from 'react';
import Icon from '@/main/components/AppIcon';
import PropertyAreaMetrics from '@/components/PropertyAreaMetrics';
import { cn } from '@/lib/utils';

export type PreviewImage = {
    id: number;
    url: string;
    original_name: string;
    filename: string;
    width?: number | null;
    height?: number | null;
};

export type PreviewVideo = {
    id: number;
    url: string;
    original_name?: string | null;
    filename?: string | null;
};

export type PreviewProperty = {
    title?: string | null;
    neighborhood?: string | null;
    bedrooms?: number | string | null;
    bathrooms?: number | string | null;
    area?: string | null;
    builtArea?: string | null;
    description?: string | null;
    price?: string | null;
    isNew?: boolean | null;
};

interface Props {
    images: PreviewImage[];
    selectedImageId?: number | null;
    property: PreviewProperty;
    onSelectImage?: (image: PreviewImage | null) => void;
    videos?: PreviewVideo[];
}

const FALLBACK_MESSAGE = 'Envie imagens ou vídeos para visualizar o modal como seus clientes.';

type MediaItem =
    | { type: 'image'; key: string; image: PreviewImage }
    | { type: 'video'; key: string; video: PreviewVideo };

export default function FeaturedPropertyModalPreview({
    images,
    selectedImageId,
    property,
    onSelectImage,
    videos = [],
}: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const mediaItems = useMemo<MediaItem[]>(() => {
        const imageItems = images.map<MediaItem>((image) => ({
            type: 'image',
            key: `image-${image.id}`,
            image,
        }));
        const videoItems = videos.map<MediaItem>((video) => ({
            type: 'video',
            key: `video-${video.id}`,
            video,
        }));
        return [...imageItems, ...videoItems];
    }, [images, videos]);

    useEffect(() => {
        if (mediaItems.length === 0) {
            setCurrentIndex(0);
            return;
        }

        setCurrentIndex((prev) => {
            if (typeof selectedImageId === 'number') {
                const imageIndex = mediaItems.findIndex(
                    (item) => item.type === 'image' && item.image.id === selectedImageId,
                );
                if (imageIndex >= 0) {
                    return imageIndex;
                }
            }

            const firstImageIndex = mediaItems.findIndex((item) => item.type === 'image');
            if (firstImageIndex >= 0) {
                return firstImageIndex;
            }

            if (prev >= 0 && prev < mediaItems.length) {
                return prev;
            }

            return 0;
        });
    }, [mediaItems, selectedImageId]);

    const activeItem = mediaItems[currentIndex];
    const hasGalleryNavigation = mediaItems.length > 1;

    const safeBedrooms = useMemo(() => {
        if (property.bedrooms === null || typeof property.bedrooms === 'undefined') return null;
        const value = property.bedrooms;
        return typeof value === 'string' ? value.trim() || null : value;
    }, [property.bedrooms]);

    const safeBathrooms = useMemo(() => {
        if (property.bathrooms === null || typeof property.bathrooms === 'undefined') return null;
        const value = property.bathrooms;
        return typeof value === 'string' ? value.trim() || null : value;
    }, [property.bathrooms]);

    const handleSelect = (index: number) => {
        const item = mediaItems[index];
        if (!item) return;
        setCurrentIndex(index);
        if (item.type === 'image') {
            onSelectImage?.(item.image);
        }
    };

    const handlePrev = () => {
        if (!hasGalleryNavigation) return;
        const nextIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        handleSelect(nextIndex);
    };

    const handleNext = () => {
        if (!hasGalleryNavigation) return;
        const nextIndex = (currentIndex + 1) % mediaItems.length;
        handleSelect(nextIndex);
    };

    return (
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border bg-white shadow-xl">
            <div className="relative bg-black">
                {activeItem ? (
                    activeItem.type === 'image' ? (
                        <img
                            src={activeItem.image.url}
                            alt={activeItem.image.original_name || property.title || 'Pré-visualização do imóvel'}
                            className="h-[360px] w-full object-cover"
                        />
                    ) : (
                        <div className="relative">
                            <video
                                src={activeItem.video.url}
                                className="h-[360px] w-full object-cover"
                                controls
                                playsInline
                                loop
                                muted
                            />
                            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                                <Icon name="Play" size={14} className="mr-1" />
                                Vídeo
                            </span>
                        </div>
                    )
                ) : (
                    <div className="flex h-[360px] w-full items-center justify-center bg-gray-100 px-6 text-center text-sm text-gray-500">
                        {FALLBACK_MESSAGE}
                    </div>
                )}

                {(property.isNew || property.neighborhood) && activeItem && (
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {property.isNew && (
                            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Novo</span>
                        )}
                        {(property.neighborhood ?? '').toString().trim() && (
                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
                                {property.neighborhood}
                            </span>
                        )}
                    </div>
                )}

                {hasGalleryNavigation && (
                    <>
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-900 shadow-lg transition hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                            aria-label="Imagem anterior"
                        >
                            <Icon name="ChevronLeft" size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-900 shadow-lg transition hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                            aria-label="Próxima imagem"
                        >
                            <Icon name="ChevronRight" size={20} />
                        </button>
                    </>
                )}
            </div>

            {mediaItems.length > 1 && (
                <div className="flex gap-2 overflow-x-auto bg-gray-50 px-4 py-3">
                    {mediaItems.map((item, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <button
                                type="button"
                                key={item.key}
                                onClick={() => handleSelect(index)}
                                className={cn(
                                    'relative h-20 w-20 min-w-[5rem] overflow-hidden rounded-md border transition',
                                    isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-gray-50' : 'hover:border-gray-400'
                                )}
                                aria-label={
                                    item.type === 'image'
                                        ? `Selecionar imagem ${index + 1}`
                                        : `Selecionar vídeo ${index + 1}`
                                }
                            >
                                {item.type === 'image' ? (
                                    <img
                                        src={item.image.url}
                                        alt={item.image.original_name || `Imagem ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="relative h-full w-full bg-black">
                                        <video
                                            src={item.video.url}
                                            className="h-full w-full object-cover"
                                            muted
                                            playsInline
                                            loop
                                        />
                                        <span className="absolute bottom-1 right-1 inline-flex items-center rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                                            Vídeo
                                        </span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="space-y-4 px-6 pb-6 pt-4">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {(property.title ?? '').toString().trim() || 'Título do imóvel'}
                    </h3>
                    {(property.neighborhood ?? '').toString().trim() && (
                        <p className="mt-2 flex items-center text-gray-600">
                            <Icon name="MapPin" size={18} className="mr-2" />
                            {property.neighborhood}
                        </p>
                    )}
                </div>

                {(safeBedrooms || safeBathrooms || property.area || property.builtArea) && (
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        {safeBedrooms && (
                            <span className="flex items-center">
                                <Icon name="Bed" size={16} className="mr-1" />
                                {safeBedrooms}
                            </span>
                        )}
                        {safeBathrooms && (
                            <span className="flex items-center">
                                <Icon name="Bath" size={16} className="mr-1" />
                                {safeBathrooms}
                            </span>
                        )}
                        <PropertyAreaMetrics builtArea={property.builtArea ?? undefined} area={property.area ?? undefined} />
                    </div>
                )}

                {(property.description ?? '').toString().trim() && (
                    <p className="mt-4 whitespace-pre-line break-words text-base text-gray-700">
                        {property.description}
                    </p>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    {(property.price ?? '').toString().trim() ? (
                        <span className="text-3xl font-semibold text-primary">{property.price}</span>
                    ) : (
                        <span className="text-sm text-gray-500">Defina um preço para visualizar aqui.</span>
                    )}
                    <button
                        type="button"
                        disabled
                        className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white opacity-60"
                        title="Pré-visualização desabilitada"
                    >
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        Falar no WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
