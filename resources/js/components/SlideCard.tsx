import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';

export type Slide = {
    id: number;
    image_id?: number;
    image_url?: string | null;
    title: string;
    price: string;
    is_published?: boolean;
};

export interface SlideCardProps<TSlide extends Slide = Slide> {
    slide: TSlide;
    onEdit: (slide: TSlide) => void;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function SlideCard<TSlide extends Slide>({
    slide,
    onEdit,
    onToggle,
    onDelete,
}: SlideCardProps<TSlide>) {
    return (
        <div className="relative overflow-hidden rounded-md border">
            <div className="absolute left-2 top-2 z-10 flex gap-2">
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-white/60 text-black backdrop-blur-sm hover:bg-white"
                    onClick={() => onEdit(slide)}
                    aria-label="Editar slide"
                    title="Editar"
                >
                    <Pencil className="size-4" />
                </Button>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-white/60 text-black backdrop-blur-sm hover:bg-white"
                    onClick={() => onDelete(slide.id)}
                    aria-label="Excluir slide"
                    title="Excluir"
                >
                    <Trash2 className="size-4" />
                </Button>
            </div>
            <Badge
                asChild
                className={`absolute right-2 top-2 z-10 cursor-pointer border-transparent rounded-full backdrop-blur-sm ${
                    slide.is_published
                        ? 'bg-emerald-500/90 text-white hover:bg-emerald-500'
                        : 'bg-white/70 text-black hover:bg-white'
                }`}
            >
                <button
                    type="button"
                    onClick={() => onToggle(slide.id)}
                    aria-pressed={slide.is_published}
                    title={slide.is_published ? 'Marcar como rascunho' : 'Publicar slide'}
                    className="flex items-center gap-1 bg-transparent text-current"
                >
                    {slide.is_published ? 'Publicado' : 'Rascunho'}
                </button>
            </Badge>
            {slide.image_url ? (
                <img src={slide.image_url} alt={slide.title} className="aspect-square w-full object-cover" />
            ) : (
                <div className="aspect-square w-full bg-muted" />
            )}
            <div className="p-2">
                <div className="truncate font-medium" title={slide.title}>
                    {slide.title}
                </div>
                <div className="text-xs text-muted-foreground">{slide.price}</div>
            </div>
        </div>
    );
}
