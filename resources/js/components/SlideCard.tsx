import { Button } from '@/components/ui/button';
import { useState } from 'react';

export type Slide = {
    id: number;
    image_id?: number;
    image_url?: string | null;
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
    return (
        <div className="relative overflow-hidden rounded-md border">
            {slide.image_url ? (
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
