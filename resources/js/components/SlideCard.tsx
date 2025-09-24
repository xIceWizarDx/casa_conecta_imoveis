import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

export type Slide = {
    id: number;
    image_id: number;
    image_url?: string | null;
    title: string;
    price: string;
    is_published?: boolean;
};

interface SlideCardProps {
    slide: Slide;
    onEdit?: (slide: Slide) => void;
    onDelete?: (id: number) => void;
}

export default function SlideCard({ slide, onEdit, onDelete }: SlideCardProps) {
    return (
        <div className="overflow-hidden rounded-md border">
            <div className="relative">
                {slide.image_url ? (
                    <img src={slide.image_url} alt={slide.title} className="aspect-square w-full object-cover" />
                ) : (
                    <div className="aspect-square w-full bg-muted" />
                )}
                <div className="absolute right-2 top-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="secondary" aria-label="Mais ações">
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {onEdit && (
                                <DropdownMenuItem onClick={(e) => { e.preventDefault(); onEdit(slide); }}>
                                    Editar
                                </DropdownMenuItem>
                            )}
                            {onDelete && (
                                <DropdownMenuItem onClick={(e) => { e.preventDefault(); onDelete(slide.id); }}>
                                    Apagar
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
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

