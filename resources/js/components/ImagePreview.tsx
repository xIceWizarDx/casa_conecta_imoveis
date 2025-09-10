import { useState } from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Icon } from './icon';

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

    return (
        <div className="relative w-full overflow-hidden rounded-md aspect-video">
            <img
                src={src}
                alt={titulo ?? ''}
                className="h-full w-full object-cover transition-transform"
                style={{ transform: `scale(${zoom})` }}
            />
            <div className="absolute inset-0 hero-overlay" />
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between">
                    {bairro && (
                        <span className="inline-flex items-center px-2 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground">
                            <Icon iconNode={MapPin} size={12} className="mr-1" />
                            {bairro}
                        </span>
                    )}
                    <div className="flex gap-1">
                        <button type="button" onClick={zoomOut} className="flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white">
                            -
                        </button>
                        <button type="button" onClick={zoomIn} className="flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white">
                            +
                        </button>
                    </div>
                </div>
                <div>
                    {titulo && <h3 className="text-lg font-bold leading-tight text-shadow">{titulo}</h3>}
                    {subtitulo && <p className="text-sm text-gray-100 text-shadow">{subtitulo}</p>}
                    {(quartos || banheiros || area) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {quartos && (
                                <div className="flex items-center space-x-1 bg-white/15 backdrop-blur-sm rounded px-2 py-1 border border-white/10">
                                    <Icon iconNode={Bed} size={12} color="white" />
                                    <span className="text-xs font-semibold">{quartos} quartos</span>
                                </div>
                            )}
                            {banheiros && (
                                <div className="flex items-center space-x-1 bg-white/15 backdrop-blur-sm rounded px-2 py-1 border border-white/10">
                                    <Icon iconNode={Bath} size={12} color="white" />
                                    <span className="text-xs font-semibold">{banheiros} banheiros</span>
                                </div>
                            )}
                            {area && (
                                <div className="flex items-center space-x-1 bg-white/15 backdrop-blur-sm rounded px-2 py-1 border border-white/10">
                                    <Icon iconNode={Square} size={12} color="white" />
                                    <span className="text-xs font-semibold">{area}</span>
                                </div>
                            )}
                        </div>
                    )}
                    {preco && <div className="mt-4 text-xl font-bold text-primary text-shadow">{preco}</div>}
                </div>
            </div>
        </div>
    );
}
