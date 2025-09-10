import { useState } from 'react';

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
        <div className="relative inline-block">
            <div className="h-40 w-64 overflow-hidden rounded-md">
                <img
                    src={src}
                    alt={titulo ?? ''}
                    className="h-full w-full object-cover transition-transform"
                    style={{ transform: `scale(${zoom})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                    <div>
                        {bairro && <span className="rounded bg-black/50 px-2 py-1 text-xs">{bairro}</span>}
                        {titulo && <h3 className="mt-2 text-lg leading-tight font-bold">{titulo}</h3>}
                        {subtitulo && <p className="text-sm">{subtitulo}</p>}
                    </div>
                    <div>
                        {preco && <div className="text-xl font-bold">{preco}</div>}
                        {(quartos || banheiros || area) && (
                            <div className="mt-1 flex gap-2 text-xs">
                                {quartos && <span>{quartos}q</span>}
                                {banheiros && <span>{banheiros}b</span>}
                                {area && <span>{area}</span>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute right-2 bottom-2 flex gap-1">
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
