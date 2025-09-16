export type GalleryImage = {
    id: number;
    url: string;
    original_name: string;
    filename: string;
    width?: number | null;
    height?: number | null;
};

interface ImageGalleryProps {
    images: GalleryImage[];
    // Single select callback (legacy behavior). Used when multiple=false.
    onSelect?: (image: GalleryImage) => void;
    // Multiple selection mode
    multiple?: boolean;
    selected?: number[]; // selected image ids
    onChangeSelected?: (ids: number[], images: GalleryImage[]) => void;
    showFooter?: boolean; // when multiple, show a small footer with confirm
    onConfirm?: () => void;
    confirmLabel?: string;
}

export default function ImageGallery({
    images,
    onSelect,
    multiple = false,
    selected = [],
    onChangeSelected,
    showFooter = false,
    onConfirm,
    confirmLabel = 'Concluir',
}: ImageGalleryProps) {
    const selectedSet = new Set(selected);

    const toggle = (img: GalleryImage) => {
        if (!multiple) {
            onSelect?.(img);
            return;
        }
        if (!onChangeSelected) return;
        const next = new Set(selectedSet);
        if (next.has(img.id)) next.delete(img.id); else next.add(img.id);
        const nextIds = Array.from(next);
        const nextImages = images.filter((i) => next.has(i.id));
        onChangeSelected(nextIds, nextImages);
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {images.map((img) => {
                    const isSel = multiple && selectedSet.has(img.id);
                    return (
                        <button
                            key={img.id}
                            type="button"
                            className={`relative overflow-hidden rounded-md border focus:outline-none focus:ring-2 focus:ring-ring ${isSel ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => toggle(img)}
                        >
                            <img src={img.url} alt={img.original_name} className="aspect-square w-full object-cover" />
                            {multiple && (
                                <div className={`absolute right-2 top-2 rounded-full border bg-white/90 px-2 py-0.5 text-xs ${isSel ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'}`}>
                                    {isSel ? 'Selecionada' : 'Selecionar'}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
            {multiple && showFooter && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{selectedSet.size} selecionada(s)</span>
                    {onConfirm && (
                        <button type="button" className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-black/90" onClick={onConfirm}>
                            {confirmLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
