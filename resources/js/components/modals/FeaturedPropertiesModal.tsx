import ImageEditor from '@/components/ImageEditor';
import FeaturedCardInfo from '@/components/FeaturedCardInfo';
// Heart icon removed
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';
import * as FeaturedActions from '@/actions/App/Http/Controllers/FeaturedPropertyController';
import { ChangeEvent, DragEvent, useMemo, useRef, useState, type CSSProperties } from 'react';

type Image = {
    id: number;
    url: string;
    original_name: string;
    filename: string;
    width?: number | null;
    height?: number | null;
};

export type FeaturedProperty = {
    id: number;
    image_id: number;
    image_url?: string | null;
    title: string;
    neighborhood?: string | null;
    price: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    area?: string | null;
    type?: string | null;
    features?: string[];
    price_range?: string | null;
    is_new?: boolean;
    is_published?: boolean;
    position?: number;
};

export interface Notice {
    type: 'success' | 'error';
    title: string;
    message?: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    featured: FeaturedProperty[];
    onRefreshFeatured: () => Promise<void>;
    onNotice?: (n: Notice) => void;
    onUploadImages: (files: FileList | null) => Promise<Image[]>;
    uploadingImages?: boolean;
}

export default function FeaturedPropertiesModal({
    open,
    onOpenChange,
    featured,
    onRefreshFeatured,
    onNotice,
    onUploadImages,
    uploadingImages = false,
}: Props) {
    const [creating, setCreating] = useState(false);

    const [form, setForm] = useState<Partial<FeaturedProperty>>({ features: [] });
    const [featureInput, setFeatureInput] = useState('');
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [images, setImages] = useState<Image[]>([]);
    const [draggedImageId, setDraggedImageId] = useState<number | null>(null);
    const uploadInputRef = useRef<HTMLInputElement | null>(null);

    const setSelectedImageAndForm = (image: Image | null) => {
        setSelectedImage(image);
        setForm((s) => {
            if (image) {
                return { ...s, image_id: image.id };
            }
            const { image_id, ...rest } = s;
            return rest;
        });
    };

    const handleUploadChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const uploaded = await onUploadImages(event.target.files);
        event.target.value = '';
        if (uploaded.length > 0) {
            setImages((prev) => {
                const existingIds = new Set(prev.map((img) => img.id));
                const additions = uploaded.filter((img) => !existingIds.has(img.id));
                const merged = [...prev, ...additions];
                if ((merged[0]?.id ?? null) !== (selectedImage?.id ?? null)) {
                    setSelectedImageAndForm(merged[0] ?? null);
                }
                return merged;
            });
        }
    };

    const handleRemoveImage = (id: number) => {
        setImages((prev) => {
            const filtered = prev.filter((img) => img.id !== id);
            if ((filtered[0]?.id ?? null) !== (selectedImage?.id ?? null)) {
                setSelectedImageAndForm(filtered[0] ?? null);
            }
            return filtered;
        });
    };

    const handleDragStart = (image: Image) => (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', image.id.toString());
        setDraggedImageId(image.id);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (targetImage: Image) => (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const data = event.dataTransfer.getData('text/plain');
        const sourceId = Number.parseInt(data || '', 10);
        if (!Number.isFinite(sourceId) || sourceId === targetImage.id) {
            setDraggedImageId(null);
            return;
        }

        setImages((prev) => {
            const next = [...prev];
            const fromIndex = next.findIndex((img) => img.id === sourceId);
            const toIndex = next.findIndex((img) => img.id === targetImage.id);

            if (fromIndex === -1 || toIndex === -1) {
                return next;
            }

            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);

            if ((next[0]?.id ?? null) !== (selectedImage?.id ?? null)) {
                setSelectedImageAndForm(next[0] ?? null);
            }

            return next;
        });

        setDraggedImageId(null);
    };

    const handleDragEnd = () => {
        setDraggedImageId(null);
    };

    const handleContainerDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const sourceId = Number.parseInt(data || '', 10);

        if (!Number.isFinite(sourceId)) {
            setDraggedImageId(null);
            return;
        }

        setImages((prev) => {
            const next = [...prev];
            const fromIndex = next.findIndex((img) => img.id === sourceId);

            if (fromIndex === -1) {
                return next;
            }

            const [moved] = next.splice(fromIndex, 1);
            next.push(moved);

            if ((next[0]?.id ?? null) !== (selectedImage?.id ?? null)) {
                setSelectedImageAndForm(next[0] ?? null);
            }

            return next;
        });

        setDraggedImageId(null);
    };

    const previewThemeVariables = {
        '--color-primary': '#22C55E',
        '--color-accent': '#25D366',
        '--color-muted': '#F9FAFB',
        '--color-muted-foreground': '#6B7280',
        '--color-foreground': '#111827',
        '--color-card': '#FFFFFF',
        '--color-border': '#E5E7EB',
    } as CSSProperties;

    const submit = async () => {
        if (!selectedImage?.id || !form.title || !form.price) {
            alert('Selecione uma imagem, título e preço.');
            return;
        }
        setCreating(true);
        try {
            const body = JSON.stringify({
                image_id: selectedImage.id,
                title: form.title,
                neighborhood: form.neighborhood ?? null,
                price: form.price,
                bedrooms: form.bedrooms ?? null,
                bathrooms: form.bathrooms ?? null,
                area: form.area ?? null,
                type: form.type ?? null,
                features: [
                    ...((form.features ?? []) as string[]),
                    ...(featureInput.trim() ? [featureInput.trim()] : []),
                ],
                price_range: form.price_range ?? null,
                is_new: !!form.is_new,
                is_published: !!form.is_published,
                gallery_image_ids: images.slice(1).map((img) => img.id),
            });
            await apiFetch(FeaturedActions.store(), { body, headers: { 'Content-Type': 'application/json' } });
            setForm({ features: [] });
            setFeatureInput('');
            setSelectedImageAndForm(null);
            setImages([]);
            onNotice?.({ type: 'success', title: 'Destaque adicionado' });
            await onRefreshFeatured();
        } finally {
            setCreating(false);
        }
    };

    const listCount = useMemo(() => featured.length, [featured]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-5xl" aria-describedby="featured-desc">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>Imóveis em Destaque</DialogTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{`${listCount} itens`}</span>
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription id="featured-desc">
                    Configure os campos e escolha uma imagem para publicar um imóvel em destaque.
                </DialogDescription>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <Label>Título</Label>
                            <Input
                                value={form.title ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                                placeholder="Ex: Apartamento premium no Jardim Goiás"
                            />
                        </div>
                        <div>
                            <Label>Bairro</Label>
                            <Input
                                value={form.neighborhood ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, neighborhood: e.target.value }))}
                                placeholder="Ex: Jardim Goiás"
                            />
                        </div>
                        <div>
                            <Label>Preço</Label>
                            <Input
                                value={form.price ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                                inputMode="numeric"
                                placeholder="Ex: R$ 1.250.000,00"
                            />
                        </div>
                        <div>
                            <Label>Quartos</Label>
                            <Input
                                type="number"
                                min={0}
                                value={form.bedrooms ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, bedrooms: Number(e.target.value || 0) }))}
                                inputMode="numeric"
                                placeholder="Ex: 3"
                            />
                        </div>
                        <div>
                            <Label>Banheiros</Label>
                            <Input
                                type="number"
                                min={0}
                                value={form.bathrooms ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, bathrooms: Number(e.target.value || 0) }))}
                                inputMode="numeric"
                                placeholder="Ex: 2"
                            />
                        </div>
                        <div>
                            <Label>Área</Label>
                            <Input
                                value={form.area ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, area: e.target.value }))}
                                inputMode="numeric"
                                placeholder="Ex: 120 m²"
                            />
                        </div>
                        <div>
                            <Label>Tipo</Label>
                            <select
                                className="mt-1 w-full rounded-md border bg-background p-2"
                                value={form.type ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
                            >
                                <option value="">Selecione…</option>
                                <option value="casa">Casa</option>
                                <option value="apartamento">Apartamento</option>
                                <option value="sobrado">Sobrado</option>
                                <option value="cobertura">Cobertura</option>
                            </select>
                        </div>
                        <div>
                            <Label>Faixa de preço</Label>
                            <Input
                                value={form.price_range ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, price_range: e.target.value }))}
                                placeholder="Ex: 800000-1200000"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={!!form.is_new} onChange={(e) => setForm((s) => ({ ...s, is_new: e.target.checked }))} />
                            Novo
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={!!form.is_published}
                                onChange={(e) => setForm((s) => ({ ...s, is_published: e.target.checked }))}
                            />
                            Publicado
                        </label>
                    </div>
                    <div>
                        <Label>Características (features)</Label>
                        <div className="mt-2 flex items-center gap-2">
                            <Input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="Ex: Piscina" />
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-auto bg-black text-white hover:bg-black/80"
                                onClick={() => {
                                    const v = featureInput.trim();
                                    if (!v) return;
                                    setForm((s) => ({ ...s, features: [...(s.features ?? []), v] }));
                                    setFeatureInput('');
                                }}
                                title="Adicionar"
                            >
                                +
                            </Button>
                        </div>
                        {(form.features ?? []).length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {(form.features ?? []).map((f, idx) => (
                                    <span key={`${f}-${idx}`} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                                        {f}
                                        <button
                                            type="button"
                                            className="rounded-full bg-black px-1 text-white hover:bg-black/80"
                                            onClick={() => setForm((s) => ({ ...s, features: (s.features ?? []).filter((_, i) => i !== idx) }))}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <Label>Imagens</Label>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Arraste para ordenar as imagens. A primeira imagem será usada como capa.
                        </p>
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-2 w-auto bg-black text-white hover:bg-black/80"
                            onClick={() => uploadInputRef.current?.click()}
                            disabled={uploadingImages}
                        >
                            {uploadingImages ? 'Enviando…' : 'Escolher imagens'}
                        </Button>
                        <input
                            ref={uploadInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleUploadChange}
                        />
                        <div
                            className={cn(
                                'mt-4 w-full max-w-md mx-auto',
                                !selectedImage && 'border-2 border-dashed'
                            )}
                        >
                            {selectedImage && (
                                <div className="w-full" style={previewThemeVariables}>
                                    <div className="relative">
                                        <ImageEditor
                                            src={selectedImage.url}
                                            sizeClass="w-full max-w-[300px]"
                                            aspect="square"
                                        >
                                            <div className="absolute left-4 top-4 flex gap-2">
                                                {!!form.is_new && (
                                                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Novo</span>
                                                )}
                                                {(form.neighborhood || '').trim() && (
                                                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
                                                        {form.neighborhood}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Heart overlay removido */}
                                        </ImageEditor>
                                    </div>
                                    <div className="mx-auto mt-4 w-full max-w-[300px]">
                                        <FeaturedCardInfo
                                            title={form.title}
                                            neighborhood={form.neighborhood}
                                            bedrooms={form.bedrooms}
                                            bathrooms={form.bathrooms}
                                            area={form.area}
                                            features={[
                                                ...((form.features ?? []) as string[]),
                                                ...(featureInput.trim() ? [featureInput.trim()] : []),
                                            ]}
                                            price={form.price}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        {images.length > 0 ? (
                            <>
                                <div
                                    className="mt-2 flex flex-wrap gap-2"
                                    onDragOver={handleDragOver}
                                    onDrop={handleContainerDrop}
                                >
                                    {images.map((img, index) => {
                                        const isDragged = draggedImageId === img.id;
                                        const isCover = index === 0;
                                        return (
                                            <div
                                                key={img.id}
                                                className={cn(
                                                    'relative h-20 w-20 cursor-move overflow-hidden rounded-md border',
                                                    isDragged && 'opacity-60'
                                                )}
                                                draggable
                                                onDragStart={handleDragStart(img)}
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop(img)}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <img src={img.url} alt={img.original_name} className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    className="absolute right-1 top-1 rounded-full bg-black/70 px-1 text-xs text-white hover:bg-black"
                                                    onClick={() => handleRemoveImage(img.id)}
                                                    aria-label="Remover imagem"
                                                >
                                                    ×
                                                </button>
                                                {isCover && (
                                                    <span className="absolute bottom-1 left-1 rounded bg-primary px-1 text-[10px] font-medium text-white">
                                                        Principal
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <p className="mt-4 text-sm text-muted-foreground">Nenhuma imagem selecionada.</p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button className="w-auto bg-black text-white hover:bg-black/80" variant="secondary" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                    <Button
                        className="w-auto"
                        onClick={submit}
                        disabled={creating}
                        title="Publicar destaque"
                    >
                        {creating ? 'Publicando…' : 'Publicar'}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
