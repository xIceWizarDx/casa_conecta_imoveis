import { useImageEditor } from '@/hooks/useImageEditor';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import ImageFilters from './ImageFilters';

interface ImageEditorProps {
    src: string;
    children?: ReactNode;
    sizeClass?: string;
    aspect?: string;
    aspectClass?: string;
}

export default function ImageEditor({
    src,
    children,
    sizeClass = 'w-full max-w-[600px]',
    aspect,
    aspectClass,
}: ImageEditorProps) {
    const { brightness, contrast, saturation, setBrightness, setContrast, setSaturation } = useImageEditor();

    const resolvedAspectClass = aspectClass
        ? aspectClass
        : aspect
          ? aspect.startsWith('aspect-')
              ? aspect
              : `aspect-${aspect}`
          : 'aspect-square';

    return (
        <div className={cn('relative mx-auto overflow-hidden rounded-md', sizeClass, resolvedAspectClass)}>
            <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition-transform"
                style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                }}
            />
            {children}
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
