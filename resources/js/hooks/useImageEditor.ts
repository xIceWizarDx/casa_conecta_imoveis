import { useCallback, useEffect, useRef, useState } from 'react';
import { exportEditedImage as exportImage } from '../utils/exportEditedImage';

interface UseImageEditorOptions {
    src: string;
    onExport?: (blob: Blob | null) => void;
}

export function useImageEditor({ src, onExport }: UseImageEditorOptions) {
    const [zoom, setZoom] = useState(1);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);

    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
    const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const wheelHandler = (e: WheelEvent) => {
            e.preventDefault();
            setZoom((z) => Math.min(Math.max(z + (e.deltaY < 0 ? 0.25 : -0.25), 0.5), 3));
        };
        container.addEventListener('wheel', wheelHandler, { passive: false });
        return () => {
            container.removeEventListener('wheel', wheelHandler);
        };
    }, []);

    const exportEditedImage = useCallback(async (): Promise<Blob | null> => {
        if (!imgRef.current || !containerRef.current) return null;
        try {
            return await exportImage(imgRef.current, containerRef.current, {
                zoom,
                brightness,
                contrast,
                saturation,
            });
        } catch {
            return null;
        }
    }, [zoom, brightness, contrast, saturation]);

    useEffect(() => {
        if (!onExport) return;
        const img = imgRef.current;
        const container = containerRef.current;
        if (!img || !container) return;
        const hasEdits = zoom !== 1 || brightness !== 100 || contrast !== 100 || saturation !== 100;
        const exportAndSend = async () => {
            if (!hasEdits) {
                onExport(null);
                return;
            }
            const blob = await exportEditedImage();
            onExport(blob);
        };
        let timeout: ReturnType<typeof setTimeout>;
        const run = () => {
            timeout = setTimeout(exportAndSend, 300);
        };
        if (img.complete) {
            run();
        } else {
            img.onload = run;
        }
        return () => {
            clearTimeout(timeout);
            if (img) img.onload = null;
        };
    }, [zoom, brightness, contrast, saturation, src, exportEditedImage, onExport]);

    return {
        imgRef,
        containerRef,
        zoom,
        setZoom,
        brightness,
        setBrightness,
        contrast,
        setContrast,
        saturation,
        setSaturation,
        zoomIn,
        zoomOut,
        exportEditedImage,
    };
}

export type UseImageEditorReturn = ReturnType<typeof useImageEditor>;
