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

export default function ImagePreview({ src, titulo, subtitulo, preco, quartos, banheiros, area, bairro }: ImagePreviewProps) {
    const [zoom, setZoom] = useState(1);

    const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
    const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${titulo ?? ''} - ${preco ?? ''}. Gostaria de mais informações.`);
        window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
    };
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <img src={src} alt={titulo ?? ''} className="h-full w-full object-cover transition-transform" style={{ transform: `scale(${zoom})` }} />
            <div className="hero-overlay absolute inset-0" />

            <div className="absolute inset-0 flex items-center justify-start pl-16">
                <div className="px-8">
                    <div className="animate-fade-in-up max-w-3xl origin-left scale-50 transform text-white">
                        {bairro && (
                            <div className="mb-4">
                                <span className="inline-flex items-center rounded-full bg-[#22c55e]/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                                    <Icon iconNode={MapPin} size={16} className="mr-2" />
                                    {bairro}
                                </span>
                            </div>
                        )}

                        {titulo && (
                            <h1 className="text-shadow mb-6 text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">{titulo}</h1>
                        )}

                        {subtitulo && <p className="text-shadow mb-8 max-w-2xl text-xl text-gray-100 sm:text-2xl">{subtitulo}</p>}

                        {(quartos || banheiros || area) && (
                            <div className="mb-10 flex flex-wrap items-center gap-4">
                                {quartos && (
                                    <div className="flex items-center space-x-2 rounded-xl border border-white/10 bg-white/15 px-4 py-3 backdrop-blur-sm">
                                        <Icon iconNode={Bed} size={20} color="white" />
                                        <span className="text-sm font-semibold">{quartos} quartos</span>
                                    </div>
                                )}
                                {banheiros && (
                                    <div className="flex items-center space-x-2 rounded-xl border border-white/10 bg-white/15 px-4 py-3 backdrop-blur-sm">
                                        <Icon iconNode={Bath} size={20} color="white" />
                                        <span className="text-sm font-semibold">{banheiros} banheiros</span>
                                    </div>
                                )}
                                {area && (
                                    <div className="flex items-center space-x-2 rounded-xl border border-white/10 bg-white/15 px-4 py-3 backdrop-blur-sm">
                                        <Icon iconNode={Square} size={20} color="white" />
                                        <span className="text-sm font-semibold">{area}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                            {preco && <div className="text-3xl font-bold text-green-500 sm:text-4xl lg:text-5xl">{preco}</div>}
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="default"
                                    onClick={handleWhatsAppClick}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    <Icon iconNode={MessageCircle} size={16} className="mr-2" />
                                    Detalhes
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => window.open('tel:+5562999999999')}
                                    className="border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold px-6 py-3 text-base backdrop-blur-sm transition-all duration-200"
                                >
                                    <Icon iconNode={Phone} size={16} className="mr-2" />
                                    Ligar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-1">
                <button type="button" onClick={zoomOut} className="flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white">
                    -
                </button>
                <button type="button" onClick={zoomIn} className="flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white">
                    +
                </button>
            </div>
        </div>
    );
}
