import { Button } from '@/components/ui/button';

export type Slide = {
    id: number;
    image_url?: string | null;
    title: string;
    price: string;
    is_published?: boolean;
};

interface SlideCardProps {
    slide: Slide;
    onMove: (id: number, dir: -1 | 1) => void;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function SlideCard({ slide, onMove, onToggle, onDelete }: SlideCardProps) {
    return (
        <div className="overflow-hidden rounded-md border">
            {slide.image_url ? (
                <img src={slide.image_url} alt={slide.title} className="h-40 w-full object-cover" />
            ) : (
                <div className="h-40 w-full bg-muted" />
            )}
            <div className="flex items-center justify-between gap-2 p-2">
                <div className="min-w-0">
                    <div className="truncate font-medium" title={slide.title}>
                        {slide.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{slide.price}</div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                    <Button className="w-auto" variant="secondary" onClick={() => onMove(slide.id, -1)} title="Subir">
                        ↑
                    </Button>
                    <Button className="w-auto" variant="secondary" onClick={() => onMove(slide.id, 1)} title="Descer">
                        ↓
                    </Button>
                    <Button
                        className="w-auto"
                        variant={slide.is_published ? 'default' : 'secondary'}
                        onClick={() => onToggle(slide.id)}
                        title="Publicar/Despublicar"
                    >
                        {slide.is_published ? 'Publicado' : 'Rascunho'}
                    </Button>
                    <Button className="w-auto" variant="destructive" onClick={() => onDelete(slide.id)} title="Excluir">
                        Excluir
                    </Button>
                </div>
            </div>
        </div>
    );
}
