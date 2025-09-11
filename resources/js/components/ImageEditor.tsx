import { ReactNode } from 'react';
import { useImageEditor } from '@/hooks/useImageEditor';
import ImageFilters from './ImageFilters';

interface ImageEditorProps {
    src: string;
    onExport?: (blob: Blob | null) => void;
    children?: ReactNode;
}

export default function ImageEditor({ src, onExport, children }: ImageEditorProps) {
    const {
        imgRef,
        containerRef,
        zoom,
        brightness,
        contrast,
        saturation,
        setBrightness,
        setContrast,
        setSaturation,
        zoomIn,
        zoomOut,
    } = useImageEditor({ src, onExport });

    return (
        <div ref={containerRef} className="relative aspect-video w-full overflow-hidden rounded-md">
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
            <ImageFilters
                brightness={brightness}
                contrast={contrast}
                saturation={saturation}
                setBrightness={setBrightness}
                setContrast={setContrast}
                setSaturation={setSaturation}
            />
        </div>
    );
}
