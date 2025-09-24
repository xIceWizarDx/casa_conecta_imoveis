import { useImageEditor } from '@/hooks/useImageEditor';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import ImageFilters from './ImageFilters';

interface ImageEditorProps {
    src: string;
    onExport?: (blob: Blob | null) => void;
    children?: ReactNode;
    sizeClass?: string;
    aspectClass?: string;
}

export default function ImageEditor({
    src,
    onExport,
    children,
    sizeClass = 'w-full max-w-[600px]',
    aspectClass = 'aspect-square',
}: ImageEditorProps) {
    const { imgRef, containerRef, zoom, brightness, contrast, saturation, setBrightness, setContrast, setSaturation, zoomIn, zoomOut } =
        useImageEditor({ src, onExport });

    return (
        <div ref={containerRef} className={cn('relative mx-auto overflow-hidden rounded-md', sizeClass, aspectClass)}>

            <img
                ref={imgRef}
                src={src}
                alt=""
                className="h-full w-full object-cover transition-transform"
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center',
                    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                }}
            />
            {children}
            <div className="absolute top-4 right-4 z-20 flex gap-1">
                <button type="button" onClick={zoomOut} className="flex h-7 w-7 items-center justify-center rounded bg-black/60 text-white">
                    -
                </button>
                <button type="button" onClick={zoomIn} className="flex h-7 w-7 items-center justify-center rounded bg-black/60 text-white">
                    +
                </button>
            </div>
            <div className="absolute bottom-4 left-4 z-20">
                <ImageFilters
                    brightness={brightness}
                    contrast={contrast}
                    saturation={saturation}
                    setBrightness={setBrightness}
                    setContrast={setContrast}
                    setSaturation={setSaturation}
                />
            </div>
        </div>
    );
}
