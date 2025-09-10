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
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-black/10" />

            <div className="absolute inset-0 flex items-center">
                <div className="container-responsive">
                    <div className="max-w-3xl mx-auto text-white animate-fade-in-up">
                        {bairro && (
                            <div className="mb-4">
                                <span className="inline-flex items-center px-3 py-1.5 bg-primary/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-primary-foreground">
                                    <Icon iconNode={MapPin} size={14} className="mr-2" />
                                    {bairro}
                                </span>
                            </div>
                        )}

                        {titulo && (
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-balance text-shadow leading-tight">
                                {titulo}
                            </h1>
                        )}

                        {subtitulo && (
                            <p className="text-base sm:text-lg mb-6 text-gray-100 text-shadow max-w-2xl">{subtitulo}</p>
                        )}

                        {(quartos || banheiros || area) && (
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {quartos && (
                                    <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                                        <Icon iconNode={Bed} size={16} color="white" />
                                        <span className="text-xs sm:text-sm font-semibold">{quartos} quartos</span>
                                    </div>
                                )}
                                {banheiros && (
                                    <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                                        <Icon iconNode={Bath} size={16} color="white" />
                                        <span className="text-xs sm:text-sm font-semibold">{banheiros} banheiros</span>
                                    </div>
                                )}
                                {area && (
                                    <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                                        <Icon iconNode={Square} size={16} color="white" />
                                        <span className="text-xs sm:text-sm font-semibold">{area}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            {preco && (
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">{preco}</div>
                            )}
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                <Button
                                    variant="default"
                                    onClick={handleWhatsAppClick}
                                    className="bg-accent hover:bg-accent/90 text-white font-semibold px-5 py-2.5 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    <Icon iconNode={MessageCircle} size={14} className="mr-2" />
                                    Detalhes
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => window.open('tel:+5562999999999')}
                                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-5 py-2.5 text-sm sm:text-base backdrop-blur-sm transition-all duration-200"
                                >
                                    <Icon iconNode={Phone} size={14} className="mr-2" />
                                    Ligar
                                </Button>
                            </div>
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

