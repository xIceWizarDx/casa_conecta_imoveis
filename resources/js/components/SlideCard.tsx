import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

export type Slide = {
    id: number;
    image_id?: number;
    image_url?: string | null;
    video_id?: number | null;
    video_url?: string | null;
    title: string;
    price: string;
    is_published?: boolean;
};

interface SlideCardProps {
    slide: Slide;
    onEdit: (slide: Slide) => void;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function SlideCard({ slide, onEdit, onToggle, onDelete }: SlideCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const hoverTimerRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const clearHoverTimer = () => {
        if (hoverTimerRef.current) {
            window.clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
    };

    const stopVideo = () => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        setIsVideoPlaying(false);
    };

    useEffect(() => {
        return () => {
            clearHoverTimer();
            stopVideo();
        };
    }, []);

    const scheduleVideoPlay = () => {
        if (isVideoPlaying) {
            return;
        }
        clearHoverTimer();
        hoverTimerRef.current = window.setTimeout(() => {
            const video = videoRef.current;
            if (!video) return;

            video
                .play()
                .then(() => setIsVideoPlaying(true))
                .catch(() => {
                    // Some browsers might block playback; ensure timer resets.
                    setIsVideoPlaying(false);
                });
        }, 400);
    };

    const handlePointerLeave = () => {
        clearHoverTimer();
        stopVideo();
    };

    return (
        <div
            className="relative overflow-hidden rounded-md border"
            onMouseEnter={scheduleVideoPlay}
            onMouseMove={scheduleVideoPlay}
            onMouseLeave={handlePointerLeave}
        >
            {slide.video_url ? (
                <video
                    ref={videoRef}
                    src={slide.video_url}
                    className="aspect-square w-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            ) : slide.image_url ? (
                <img src={slide.image_url} alt={slide.title} className="aspect-square w-full object-cover" />
            ) : (
                <div className="aspect-square w-full bg-muted" />
            )}
            {/* Top-right menu button */}
            <button
                type="button"
                className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black"
                aria-label="Menu"
                onClick={() => setMenuOpen((v) => !v)}
            >
                ⋮
            </button>
            {menuOpen && (
                <div className="absolute right-2 top-12 z-20 w-36 overflow-hidden rounded-lg border bg-white shadow-lg">
                    <button
                        type="button"
                        className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                        onClick={() => {
                            setMenuOpen(false);
                            onEdit(slide);
                        }}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-muted"
                        onClick={() => {
                            setMenuOpen(false);
                            onDelete(slide.id);
                        }}
                    >
                        Excluir
                    </button>
                </div>
            )}
            <div className="flex items-center justify-between gap-2 p-2">
                <div className="min-w-0">
                    <div className="truncate font-medium" title={slide.title}>
                        {slide.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{slide.price}</div>
                </div>
            </div>
        </div>
    );
}
