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
import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

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
    built_area?: string | null;
    type?: string | null;
    description?: string | null;
    features?: string[] | null;
    price_range?: string | null;
    is_new?: boolean;
    is_published?: boolean;
    position?: number;
    // Lista opcional de imagens da galeria (quando vindo da API)
    images?: Image[];
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
    onUploadVideos?: (files: FileList | null) => Promise<{ id: number; url: string }[]>;
    uploadingImages?: boolean;
    uploadingVideos?: boolean;
    editing?: FeaturedProperty | null;
}

export default function FeaturedPropertiesModal({
    open,
    onOpenChange,
    featured,
    onRefreshFeatured,
    onNotice,
    onUploadImages,
    onUploadVideos,
    uploadingImages = false,
    uploadingVideos = false,
    editing = null,
}: Props) {
    const [creating, setCreating] = useState(false);

    const [form, setForm] = useState<Partial<FeaturedProperty>>({ description: '' });
    const [_featureInputHidden, set_featureInputHidden] = useState('');
    
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [images, setImages] = useState<Image[]>([]);
    const [videos, setVideos] = useState<any[]>([]);
    const [draggedImageId, setDraggedImageId] = useState<number | null>(null);
    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    const uploadVideoRef = useRef<HTMLInputElement | null>(null);

    // Masks
    const formatCurrencyBRLInput = (value: string) => {
        const digits = value.replace(/\\D/g, '');
        if (!digits) return '';
        const number = Number(digits) / 100;
        try {
            return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        } catch {
            return `R$ ${number.toFixed(2)}`;
        }
    };

    const formatAreaNumber = (value: string) => {
        const digits = value.replace(/\\D/g, '');
        if (!digits) return '';
        const n = parseInt(digits, 10);
        try {
            return n.toLocaleString('pt-BR');
        } catch {
            return String(n);
        }
    };

    const buildAreaWithSuffix = (value?: string | null) => {
    const digits = (value ?? '').replace(/\D/g, '');
    if (!digits) return null;
    const n = parseInt(digits, 10);
    const formatted = (() => {
        try { return n.toLocaleString('pt-BR'); } catch { return String(n); }
    })();
    const M2 = 'm' + String.fromCharCode(178);
    return `${formatted} ${M2}`;
};

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

    // Preenche dados quando em modo de ediÃ§Ã£o (capa + galeria)
    useEffect(() => {
        if (!open || !editing) return;
        const cover: Image | null = editing.image_id && editing.image_url
            ? { id: editing.image_id, url: editing.image_url, original_name: '', filename: '' }
            : null;
        const gallery: Image[] = Array.isArray(editing.images)
            ? (editing.images as any[])
                .map((img) => ({
                    id: Number(img?.id),
                    url: String(img?.url ?? img?.image_url ?? ''),
                    original_name: String(img?.original_name ?? ''),
                    filename: String(img?.filename ?? ''),
                    width: typeof img?.width === 'number' ? img.width : undefined,
                    height: typeof img?.height === 'number' ? img.height : undefined,
                }))
                .filter((i) => i.id && i.url)
            : [];
        const ordered = cover ? [cover, ...gallery] : gallery;
        setImages(ordered);
        const vids: any[] = Array.isArray((editing as any).videos)
            ? ((editing as any).videos as any[]).map((v) => ({ id: Number(v?.id), url: String(v?.url ?? v?.video_url ?? ''), filename: String(v?.filename ?? ''), original_name: String(v?.original_name ?? '') })).filter((v) => v.id && v.url)
            : [];
        setVideos(vids);
        setSelectedImageAndForm(ordered[0] ?? null);
        setForm({
            id: editing.id,
            image_id: editing.image_id,
            title: editing.title,
            neighborhood: editing.neighborhood ?? undefined,
            price: editing.price,
            bedrooms: editing.bedrooms ?? undefined,
            bathrooms: editing.bathrooms ?? undefined,
            area: editing.area ?? undefined,
            built_area: (editing as any).built_area ?? undefined,
            type: editing.type ?? undefined,
            description: (editing as any).description ?? '',
            price_range: editing.price_range ?? undefined,
            is_new: !!editing.is_new,
            is_published: !!editing.is_published,
        });
        setShowEmojis(false);
    }, [open, editing]);

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

    const handleVideoUploadChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!onUploadVideos) return;
        const uploaded = await onUploadVideos(event.target.files);
        event.target.value = '';
        if (uploaded.length > 0) {
            setVideos((prev) => {
                const existingIds = new Set(prev.map((v) => v.id));
                const additions = uploaded.filter((v) => !existingIds.has(v.id));
                return [...prev, ...additions];
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
                area: buildAreaWithSuffix(form.area),
                built_area: buildAreaWithSuffix((form as any).built_area),
                type: form.type ?? null,
                description: (form as any).description ?? null,
                price_range: form.price_range ?? null,
                is_new: !!form.is_new,
                is_published: editing?.id ? !!form.is_published : true,
                gallery_image_ids: images.slice(1).map((img) => img.id),
                gallery_video_ids: videos.map((v) => v.id),
            });
            if (editing?.id) {
                await apiFetch(FeaturedActions.update({ featuredProperty: editing.id }), { body, headers: { 'Content-Type': 'application/json' } });
                onNotice?.({ type: 'success', title: 'Destaque atualizado' });
            } else {
                await apiFetch(FeaturedActions.store(), { body, headers: { 'Content-Type': 'application/json' } });
                onNotice?.({ type: 'success', title: 'Destaque adicionado' });
            }
            setForm({ description: '' });
            setSelectedImageAndForm(null);
            setImages([]);
            await onRefreshFeatured();
            onOpenChange(false);
        } finally {
            setCreating(false);
        }
    };

    const listCount = useMemo(() => featured.length, [featured]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-full max-h-[85vh] overflow-y-auto sm:max-w-5xl"
                aria-describedby="featured-desc"
            >
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>Imóveis em Destaque</DialogTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{`${listCount} itens`}</span>
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription id="featured-desc">
                    Configure os campos e escolha uma imagem para publicar um imÃ³vel em destaque.
                </DialogDescription>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <Label>Título</Label>
                            <Input
                                value={form.title ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                                placeholder="Ex: Apartamento premium no Jardim GoiÃ¡s"
                            />
                        </div>
                        <div>
                            <Label>Bairro</Label>
                            <Input
                                value={form.neighborhood ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, neighborhood: e.target.value }))}
                                placeholder="Ex: Jardim GoiÃ¡s"
                            />
                        </div>
                        <div>
                            <Label>Preço</Label>
                            <Input
                                value={form.price ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, price: formatCurrencyBRLInput(e.target.value) }))}
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
                            <Label>Metragem total (terreno)</Label>
                            <div className="relative">
                                <Input
                                    className="pr-10"
                                    value={form.area ?? ''}
                                    onChange={(e) => setForm((s) => ({ ...s, area: formatAreaNumber(e.target.value) }))}
                                    inputMode="numeric"
                                    placeholder="Ex: 300"
                                />
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{'m' + String.fromCharCode(178)}</span>
                            </div>
                        </div>
                        <div>
                            <Label>Área construída</Label>
                            <div className="relative">
                                <Input
                                    className="pr-10"
                                    value={form.built_area ?? ''}
                                    onChange={(e) => setForm((s) => ({ ...s, built_area: formatAreaNumber(e.target.value) }))}
                                    inputMode="numeric"
                                    placeholder="Ex: 180"
                                />
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{'m' + String.fromCharCode(178)}</span>
                            </div>
                        </div>
                        <div>
                            <Label>Tipo</Label>
                            <select
                                className="mt-1 w-full rounded-md border bg-background p-2"
                                value={form.type ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
                            >
                                <option value="">Selecione</option>
                                <option value="casa">Casa</option>
                                <option value="apartamento">Apartamento</option>
                                <option value="sobrado">Sobrado</option>
                                <option value="cobertura">Cobertura</option>
                            </select>
                        </div>
                        {/* CaracterÃ­sticas ao lado do campo de Tipo */}
                        <div className="md:col-span-1 lg:col-span-2 hidden">
                            <Label>CaracterÃ­sticas (features)</Label>
                            <div className="mt-2 flex items-center gap-2">
                                <Input className="flex-1" value={_featureInputHidden} onChange={(e) => set_featureInputHidden(e.target.value)} placeholder="Ex: Piscina" />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="w-auto bg-black text-white hover:bg-black/80"
                                    onClick={() => {
                                        const v = _featureInputHidden.trim();
                                        if (!v) return;
                                        setForm((s) => ({ ...s, features: [...(s.features ?? []), v] }));
                                        set_featureInputHidden('');
                                    }}
                                    title="Adicionar"
                                >
                                    +
                                </Button>
                            </div>
                            {false && ([]).length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {([]).map((f, idx) => (
                                        <span key={`${f}-${idx}`} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                                            {f}
                                            <button
                                                type="button"
                                                className="rounded-full bg-black px-1 text-white hover:bg-black/80"
                                                onClick={() => setForm((s) => ({ ...s, features: (s.features ?? []).filter((_, i) => i !== idx) }))}
                                            >
                                                Ã—
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={!!form.is_new} onChange={(e) => setForm((s) => ({ ...s, is_new: e.target.checked }))} />
                            Novo
                        </label>
                        {/* Checkbox "Publicado" removido: novas publicaÃ§Ãµes serÃ£o publicadas automaticamente */}
                    </div>
                    {/* SeÃ§Ã£o de caracterÃ­sticas movida ao lado do campo de Tipo */}
                    <div>
                        <Label>Imagens</Label>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Arraste para ordenar as imagens. A primeira imagem serÃ¡ usada como capa.
                        </p>
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-2 w-auto bg-black text-white hover:bg-black/80"
                            onClick={() => uploadInputRef.current?.click()}
                            disabled={uploadingImages}
                        >
                            {uploadingImages ? 'Enviando...' : 'Escolher imagens'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-2 ml-2 w-auto bg-black text-white hover:bg-black/80"
                            onClick={() => uploadVideoRef.current?.click()}
                            disabled={uploadingVideos}
                        >
                            {uploadingVideos ? 'Enviando...' : 'Escolher vídeos'}
                        </Button>
                        <input
                            ref={uploadInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleUploadChange}
                        />
                        <input
                            ref={uploadVideoRef}
                            type="file"
                            multiple
                            accept="video/*"
                            className="hidden"
                            onChange={handleVideoUploadChange}
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
                                            area={buildAreaWithSuffix(form.area) ?? undefined}
                                            built_area={buildAreaWithSuffix((form as any).built_area) ?? undefined}
                                            description={(form as any).description ?? ''}
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
                                                    Ã—
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
                    <div>
                        <Label>Descrição do imóvel</Label>
                        <div className="mt-2 flex items-start gap-2">
                            <textarea
                                ref={descriptionRef}
                                className="min-h-[110px] w-full resize-y rounded-md border bg-background p-2 text-sm"
                                placeholder={"Ex: Casa térrea no Jardim Goiânia 🏡 com 3 quartos, suíte, área gourmet com piscina 🏊 e 2 vagas de garagem. Localização excelente, próxima ao parque."}
                                value={(form as any).description ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                            />
                            <div className="relative">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="w-10 px-0 bg-accent text-white hover:bg-accent/90"
                                    onClick={() => setShowEmojis((v) => !v)}
                                    title="Emojis (estilo WhatsApp)"
                                >
                                    🙂
                                </Button>
                                {showEmojis && (
                                    <div className="absolute right-0 z-10 mt-2 w-52 rounded-md border bg-white p-2 shadow-lg">
                                        {[
                                            '😀','😃','😄','😁','😆','😊','😍','🤩','🥰','😉','😎','🤗','🙌','👍','👏','✅','✨','🌟',
                                            '🏡','🏠','🏘️','🏢','🏗️','🌇','🌆','🌳','🌴','🌺','🪴','🏊‍♂️','🏋️‍♀️','🚗','🚙','🛵','🅿️','🛏️','🛁','🚿','🧖‍♀️','🍷','🔥','💡','💎','🎯','🧭','📍','📐','📏','📸','🔑','🛠️'
                                        ].map((emo) => (
                                            <button
                                                key={emo}
                                                type="button"
                                                className="m-0.5 inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted"
                                                onClick={() => {
                                                    const el = descriptionRef.current;
                                                    const toInsert = emo;
                                                    if (el) {
                                                        const start = el.selectionStart ?? el.value.length;
                                                        const end = el.selectionEnd ?? el.value.length;
                                                        const text = el.value;
                                                        const next = text.slice(0, start) + toInsert + text.slice(end);
                                                        el.value = next;
                                                        setForm((s) => ({ ...s, description: next }));
                                                        const pos = start + toInsert.length;
                                                        requestAnimationFrame(() => {
                                                            el.focus();
                                                            el.setSelectionRange(pos, pos);
                                                        });
                                                    }
                                                }}
                                            >
                                                {emo}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Escreva à vontade e use emojis. O botão 🙂 abre um painel rápido (estilo WhatsApp).</p>
                    </div>
                </div>
                {false && videos.length > 0 && (
                    <>
                        <Label className="mt-6 block">Vídeos</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {videos.map((vid) => (
                                <div key={vid.id} className="relative h-20 w-20 overflow-hidden rounded-md border">
                                    <video src={vid.url} className="h-full w-full object-cover" muted loop playsInline />
                                    <button
                                        type="button"
                                        className="absolute right-1 top-1 rounded-full bg-black/70 px-1 text-xs text-white hover:bg-black"
                                        onClick={() => setVideos((prev) => prev.filter((v) => v.id !== vid.id))}
                                        aria-label="Remover vÃ­deo"
                                    >
                                        Ã—
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <DialogFooter>
                    <Button className="w-auto bg-black text-white hover:bg-black/80" variant="secondary" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                    <Button
                        className="w-auto"
                        onClick={submit}
                        disabled={creating}
                        title={editing?.id ? 'Atualizar destaque' : 'Publicar destaque'}
                    >
                        {editing?.id ? (creating ? 'Atualizando...' : 'Atualizar') : (creating ? 'Publicando...' : 'Publicar')}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}










