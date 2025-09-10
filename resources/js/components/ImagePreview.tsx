import { useState } from 'react';
import HeroSlide from '@/main/pages/homepage-premium-real-estate-consultancy/components/HeroSlide';

interface ImagePreviewProps {
    src: string;
    titulo?: string | null;
    subtitulo?: string | null;
    preco?: string | null;
    quartos?: number | string | null;
    banheiros?: number | string | null;
    area?: string | null;
    bairro?: string | null;
}

export default function ImagePreview({
    src,
    titulo,
    subtitulo,
    preco,
    quartos,
    banheiros,
    area,
    bairro,
}: ImagePreviewProps) {
    const [zoom, setZoom] = useState(0.5);

    const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
    const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.25));

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent(
            `Olá! Tenho interesse no imóvel: ${titulo ?? ''} - ${preco ?? ''}. Gostaria de mais informações.`,
        );
        window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
    };

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-md flex items-center justify-start">
            <div
                className="h-full w-full transition-transform ml-4"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
            >
                <HeroSlide
                    image={src}
                    title={titulo}
                    subtitle={subtitulo}
                    price={preco}
                    bedrooms={quartos}
                    bathrooms={banheiros}
                    area={area}
                    neighborhood={bairro}
                    onWhatsAppClick={handleWhatsAppClick}
                    onCallClick={() => window.open('tel:+5562999999999')}
                />
            </div>

            <div className="absolute top-4 right-4 flex gap-1">
                <button
                    type="button"
                    onClick={zoomOut}
                    className="flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white"
                >
                    -
                </button>
                <button
                    type="button"
                    onClick={zoomIn}
                    className="flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white"
                >
                    +
                </button>
            </div>
        </div>
    );
}

