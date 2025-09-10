import { Bath, Bed, MapPin, MessageCircle, Phone, Square } from 'lucide-react';
import { useState } from 'react';
import { Icon } from './icon';
import { Button } from './ui/button';

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
    const [zoom, setZoom] = useState(1);

    const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
    const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent(
            `Olá! Tenho interesse no imóvel: ${titulo ?? ''} - ${preco ?? ''}. Gostaria de mais informações.`,
        );
        window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
    };

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <img
                src={src}
                alt={titulo ?? ''}
                className="h-full w-full object-cover transition-transform"
                style={{ transform: `scale(${zoom})` }}
            />
            <div className="absolute inset-0 hero-overlay" />

            <div className="absolute inset-0 flex items-center justify-start pl-4">
                <div className="max-w-md text-white animate-fade-in-up">
                    {bairro && (
                        <div className="mb-2">
                            <span className="inline-flex items-center px-2 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground">
                                <Icon iconNode={MapPin} size={10} className="mr-1" />
                                {bairro}
                            </span>
                        </div>
                    )}

                    {titulo && (
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-balance text-shadow leading-tight">
                            {titulo}
                        </h1>
                    )}

                    {subtitulo && (
                        <p className="text-sm sm:text-base mb-4 text-gray-100 text-shadow max-w-md">{subtitulo}</p>
                    )}

                    {(quartos || banheiros || area) && (
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            {quartos && (
                                <div className="flex items-center space-x-1 bg-white/15 backdrop-blur-sm rounded-xl px-2 py-1 border border-white/10">
                                    <Icon iconNode={Bed} size={14} color="white" />
                                    <span className="text-xs font-semibold">{quartos} quartos</span>
                                </div>
                            )}
                            {banheiros && (
                                <div className="flex items-center space-x-1 bg-white/15 backdrop-blur-sm rounded-xl px-2 py-1 border border-white/10">
                                    <Icon iconNode={Bath} size={14} color="white" />
                                    <span className="text-xs font-semibold">{banheiros} banheiros</span>
                                </div>
                            )}
                            {area && (
                                <div className="flex items-center space-x-1 bg-white/15 backdrop-blur-sm rounded-xl px-2 py-1 border border-white/10">
                                    <Icon iconNode={Square} size={14} color="white" />
                                    <span className="text-xs font-semibold">{area}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        {preco && (
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{preco}</div>
                        )}
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="default"
                                onClick={handleWhatsAppClick}
                                className="bg-accent hover:bg-accent/90 text-white font-semibold px-3 py-1.5 text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <Icon iconNode={MessageCircle} size={12} className="mr-1" />
                                Detalhes
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.open('tel:+5562999999999')}
                                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-3 py-1.5 text-sm backdrop-blur-sm transition-all duration-200"
                            >
                                <Icon iconNode={Phone} size={12} className="mr-1" />
                                Ligar
                            </Button>
                        </div>
                    </div>
                </div>
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

