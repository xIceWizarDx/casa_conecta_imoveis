// Heart icon removed
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';
import type { Notice } from '@/types/notice';
import * as FeaturedActions from '@/actions/App/Http/Controllers/FeaturedPropertyController';
import FeaturedPropertyModalPreview from '@/components/FeaturedPropertyModalPreview';
import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from 'react';

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

type UploadedVideo = {
    id: number;
    url: string;
    original_name?: string | null;
    filename?: string | null;
};

type MediaItem =
    | { type: 'image'; item: Image }
    | { type: 'video'; item: UploadedVideo };

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    featured: FeaturedProperty[];
    onRefreshFeatured: () => Promise<void>;
    onUpsertFeatured?: (property: FeaturedProperty) => void;
    onNotice?: (n: Notice) => void;
    onUploadImages: (files: FileList | null) => Promise<Image[]>;
    onUploadVideos?: (files: FileList | null) => Promise<UploadedVideo[]>;
    uploadingImages?: boolean;
    uploadingVideos?: boolean;
    uploadProgressImages?: number;
    uploadProgressVideos?: number;
    editing?: FeaturedProperty | null;
}

export default function FeaturedPropertiesModal({
    open,
    onOpenChange,
    featured,
    onRefreshFeatured,
    onUpsertFeatured,
    onNotice,
    onUploadImages,
    onUploadVideos,
    uploadingImages = false,
    uploadingVideos = false,
    uploadProgressImages = 0,
    uploadProgressVideos = 0,
    editing = null,
}: Props) {
    const [creating, setCreating] = useState(false);

    const [form, setForm] = useState<Partial<FeaturedProperty>>({ description: '' });
    const [_featureInputHidden, set_featureInputHidden] = useState('');
    
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [draggedMediaKey, setDraggedMediaKey] = useState<string | null>(null);
    const uploadMediaRef = useRef<HTMLInputElement | null>(null);


    const images = useMemo(() => {
        return mediaItems
            .filter((media): media is { type: 'image'; item: Image } => media.type === 'image')
            .map((media) => media.item);
    }, [mediaItems]);

    const videos = useMemo(() => {
        return mediaItems
            .filter((media): media is { type: 'video'; item: UploadedVideo } => media.type === 'video')
            .map((media) => media.item);
    }, [mediaItems]);

    const buildMediaKey = (type: MediaItem['type'], id: number) => `${type}:${id}`;


    // Masks
    const formatCurrencyBRLInput = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (!digits) return '';
        const number = Number(digits) / 100;
        try {
            return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        } catch {
            return `R$ ${number.toFixed(2)}`;
        }
    };

    const formatAreaNumber = (value: string) => {
        const digits = value.replace(/\D/g, '');
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

    // Preenche dados quando em modo de edição (capa + galeria)
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
        const vids: UploadedVideo[] = Array.isArray((editing as any).videos)
            ? ((editing as any).videos as any[])
                  .map((v) => ({
                      id: Number(v?.id),
                      url: String(v?.url ?? v?.video_url ?? ''),
                      filename: typeof v?.filename === 'string' ? v.filename : undefined,
                      original_name: typeof v?.original_name === 'string' ? v.original_name : undefined,
                  }))
                  .filter((v) => v.id && v.url)
            : [];
        const ordered = cover ? [cover, ...gallery] : gallery;
        const initialMedia: MediaItem[] = [
            ...ordered.map<MediaItem>((image) => ({ type: 'image', item: image })),
            ...vids.map<MediaItem>((video) => ({ type: 'video', item: video })),
        ];
        setMediaItems(initialMedia);
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

    const mergeUploadedImages = (uploaded: Image[]) => {
        if (uploaded.length === 0) return;
        setMediaItems((prev) => {
            const existingIds = new Set(
                prev.filter((media) => media.type === 'image').map((media) => media.item.id)
            );
            const additions = uploaded.filter((img) => !existingIds.has(img.id));
            if (additions.length === 0) {
                return prev;
            }
            const additionMedia: MediaItem[] = additions.map((img) => ({ type: 'image', item: img }));
            const next = [...prev, ...additionMedia];
            const nextImages = next
                .filter((media) => media.type === 'image')
                .map((media) => media.item);

            const selectedId = selectedImage?.id ?? null;
            const stillExists = selectedId !== null && nextImages.some((img) => img.id === selectedId);

            if (selectedId === null) {
                setSelectedImageAndForm(additions[0] ?? null);
            } else if (!stillExists) {
                setSelectedImageAndForm(nextImages[0] ?? null);
            }

            return next;
        });
    };

    const mergeUploadedVideos = (uploaded: UploadedVideo[]) => {
        if (uploaded.length === 0) return;
        setMediaItems((prev) => {
            const existingIds = new Set(
                prev.filter((media) => media.type === 'video').map((media) => media.item.id)
            );
            const additions = uploaded
                .filter((video) => !existingIds.has(video.id))
                .map<MediaItem>((video) => ({ type: 'video', item: video }));
            if (additions.length === 0) {
                return prev;
            }
            return [...prev, ...additions];
        });
    };

    const toFileList = (files: File[]) => {
        if (files.length === 0) return null;
        if (typeof DataTransfer !== 'undefined') {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            return dataTransfer.files;
        }
        const fallback: any = { length: files.length, item: (index: number) => files[index] ?? null };
        files.forEach((file, index) => {
            fallback[index] = file;
        });
        return fallback as FileList;
    };

    const handleMediaUploadChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
        event.target.value = '';
        if (selectedFiles.length === 0) return;

        const imageFiles: File[] = [];
        const videoFiles: File[] = [];
        const invalidFiles: File[] = [];

        selectedFiles.forEach((file) => {
            if (file.type.startsWith('video/')) {
                videoFiles.push(file);
            } else if (file.type.startsWith('image/')) {
                imageFiles.push(file);
            } else {
                invalidFiles.push(file);
            }
        });

        if (invalidFiles.length > 0) {
            onNotice?.({
                type: 'error',
                title: 'Formato nao suportado',
                message: 'Escolha imagens (JPG, PNG, WEBP, GIF) ou videos (MP4, MOV, WEBM).',
            });
        }

        if (imageFiles.length > 0) {
            const uploaded = await onUploadImages(toFileList(imageFiles));
            mergeUploadedImages(uploaded);
        }

        if (videoFiles.length > 0) {
            if (!onUploadVideos) {
                onNotice?.({ type: 'error', title: 'Envio de vídeos não suportado neste painel.' });
            } else {
                const uploaded = await onUploadVideos(toFileList(videoFiles));
                mergeUploadedVideos(uploaded);
            }
        }
    };

    const parseMediaKey = (
        value: string
    ): { type: MediaItem['type']; id: number } | null => {
        const [type, rawId] = value.split(':');
        if ((type !== 'image' && type !== 'video') || !rawId) {
            return null;
        }
        const id = Number.parseInt(rawId, 10);
        if (!Number.isFinite(id)) {
            return null;
        }
        return { type: type as MediaItem['type'], id };
    };

    const handleRemoveImage = (id: number) => {
        setMediaItems((prev) => {
            const filtered = prev.filter(
                (media) => !(media.type === 'image' && media.item.id === id)
            );
            const nextImages = filtered
                .filter((media) => media.type === 'image')
                .map((media) => media.item);
            if ((nextImages[0]?.id ?? null) !== (selectedImage?.id ?? null)) {
                setSelectedImageAndForm(nextImages[0] ?? null);
            }
            return filtered;
        });
    };

    const handleRemoveVideo = (id: number) => {
        setMediaItems((prev) =>
            prev.filter((media) => !(media.type === 'video' && media.item.id === id))
        );
    };

    const handleDragStart = (media: MediaItem) => (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.effectAllowed = 'move';
        const key = buildMediaKey(media.type, media.item.id);
        event.dataTransfer.setData('text/plain', key);
        setDraggedMediaKey(key);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (target: MediaItem) => (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const data = event.dataTransfer.getData('text/plain');
        const parsed = parseMediaKey(data);
        if (!parsed) {
            setDraggedMediaKey(null);
            return;
        }
        const targetKey = buildMediaKey(target.type, target.item.id);
        const sourceKey = buildMediaKey(parsed.type, parsed.id);
        if (sourceKey === targetKey) {
            setDraggedMediaKey(null);
            return;
        }

        setMediaItems((prev) => {
            const next = [...prev];
            const fromIndex = next.findIndex(
                (media) => media.type === parsed.type && media.item.id === parsed.id
            );
            const toIndex = next.findIndex((media) => buildMediaKey(media.type, media.item.id) === targetKey);

            if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
                return next;
            }

            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);

            const nextImages = next
                .filter((media) => media.type === 'image')
                .map((media) => media.item);
            if ((nextImages[0]?.id ?? null) !== (selectedImage?.id ?? null)) {
                setSelectedImageAndForm(nextImages[0] ?? null);
            }

            return next;
        });

        setDraggedMediaKey(null);
    };

    const handleDragEnd = () => {
        setDraggedMediaKey(null);
    };

    const handleContainerDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const parsed = parseMediaKey(data);

        if (!parsed) {
            setDraggedMediaKey(null);
            return;
        }

        setMediaItems((prev) => {
            const next = [...prev];
            const fromIndex = next.findIndex(
                (media) => media.type === parsed.type && media.item.id === parsed.id
            );

            if (fromIndex === -1) {
                return next;
            }

            const [moved] = next.splice(fromIndex, 1);
            next.push(moved);

            const nextImages = next
                .filter((media) => media.type === 'image')
                .map((media) => media.item);
            if ((nextImages[0]?.id ?? null) !== (selectedImage?.id ?? null)) {
                setSelectedImageAndForm(nextImages[0] ?? null);
            }

            return next;
        });

        setDraggedMediaKey(null);
    };

    const submit = async () => {
        if (!selectedImage?.id || !form.title || !form.price) {
            alert('Selecione uma imagem, título e preço.');
            return;
        }
        setCreating(true);
        let successNotice: Notice | null = null;
        try {
            const payload = {
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
            };
            const body = JSON.stringify(payload);
            let response: FeaturedProperty;
            if (editing?.id) {
                response = await apiFetch<FeaturedProperty>(FeaturedActions.update({ featuredProperty: editing.id }), {
                    body,
                    headers: { 'Content-Type': 'application/json' },
                });
                successNotice = { type: 'success', title: 'Destaque atualizado' };
            } else {
                response = await apiFetch<FeaturedProperty>(FeaturedActions.store(), {
                    body,
                    headers: { 'Content-Type': 'application/json' },
                });
                successNotice = { type: 'success', title: 'Destaque adicionado' };
            }
            onUpsertFeatured?.(response);
            setForm({ description: '' });
            set_featureInputHidden('');
            setSelectedImageAndForm(null);
            setMediaItems([]);
            setDraggedMediaKey(null);
            onOpenChange(false);
            await onRefreshFeatured();
            if (successNotice) {
                const notice = successNotice;
                setTimeout(() => onNotice?.(notice), 200);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            onNotice?.({
                type: 'error',
                title: editing?.id ? 'Falha ao atualizar destaque' : 'Falha ao publicar destaque',
                message,
            });
        } finally {
            setCreating(false);
        }
    };

    const listCount = useMemo(() => featured.length, [featured]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex max-h-[85vh] w-full flex-col overflow-hidden sm:max-w-5xl"

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
                    Configure os campos e escolha uma imagem para publicar um imóvel em destaque.
                </DialogDescription>
                <div className="mt-4 flex-1 overflow-y-auto pr-1">
                    <div className="space-y-4 pb-4">
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
                        {/* Características ao lado do campo de Tipo */}
                        <div className="md:col-span-1 lg:col-span-2 hidden">
                            <Label>Características (features)</Label>
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
                                                ×
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
                        {/* Checkbox "Publicado" removido: novas publicações serão publicadas automaticamente */}
                    </div>
                    {/* Seção de características movida ao lado do campo de Tipo */}
                    <div>
                        <Label>Mídia</Label>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Arraste para ordenar as imagens. A primeira imagem será usada como capa. Use o botão abaixo para
                            enviar novas imagens ou vídeos.
                        </p>
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-2 w-auto bg-black text-white hover:bg-black/80"
                            onClick={() => uploadMediaRef.current?.click()}
                            disabled={uploadingImages || uploadingVideos}
                        >
                            {uploadingImages || uploadingVideos ? 'Enviando...' : 'Escolher mídia'}
                        </Button>
                        <input
                            ref={uploadMediaRef}
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleMediaUploadChange}
                        />
                        <span className="ml-3 align-middle text-xs text-muted-foreground">Formatos aceitos: JPG, PNG, WEBP, GIF; MP4, MOV, WEBM</span>
                        {(uploadingImages || uploadingVideos) && (
                            <div className="mt-3 h-2 w-full overflow-hidden rounded bg-muted">
                                <div
                                    className="h-2 bg-primary transition-all"
                                    style={{ width: `${Math.max(uploadProgressImages ?? 0, uploadProgressVideos ?? 0)}%` }}
                                />
                                <div className="mt-1 text-right text-xs text-muted-foreground">
                                    {Math.max(uploadProgressImages ?? 0, uploadProgressVideos ?? 0)}%
                                </div>
                            </div>
                        )}
                        <div className="mt-4 w-full">
                            <FeaturedPropertyModalPreview
                                images={images}
                                selectedImageId={selectedImage?.id ?? null}
                                onSelectImage={setSelectedImageAndForm}
                                property={{
                                    title: form.title ?? '',
                                    neighborhood: form.neighborhood ?? '',
                                    bedrooms: form.bedrooms ?? undefined,
                                    bathrooms: form.bathrooms ?? undefined,
                                    area: buildAreaWithSuffix(form.area),
                                    builtArea: buildAreaWithSuffix((form as any).built_area),
                                    description: (form as any).description ?? '',
                                    price: form.price ?? '',
                                    isNew: !!form.is_new,
                                }}
                                videos={videos}

                            />
                        </div>
                        {mediaItems.length > 0 ? (
                            <div
                                className="mt-2 flex flex-wrap gap-2"
                                onDragOver={handleDragOver}
                                onDrop={handleContainerDrop}
                            >
                                {mediaItems.map((media) => {
                                    if (media.type === 'image') {
                                        const img = media.item;
                                        const imageIndex = images.findIndex((image) => image.id === img.id);

                                        const mediaKey = buildMediaKey('image', img.id);
                                        const isDragged = draggedMediaKey === mediaKey;

                                        const isCover = imageIndex === 0;
                                        return (
                                            <div
                                                key={`image-${img.id}`}
                                                className={cn(
                                                    'relative h-20 w-20 cursor-move overflow-hidden rounded-md border',
                                                    isDragged && 'opacity-60'
                                                )}
                                                draggable
                                                onDragStart={handleDragStart(media)}
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop(media)}
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
                                    }

                                    const vid = media.item;

                                    const mediaKey = buildMediaKey('video', vid.id);
                                    const isDragged = draggedMediaKey === mediaKey;
                                    return (
                                        <div
                                            key={`video-${vid.id}`}
                                            className={cn(
                                                'relative h-20 w-20 cursor-move overflow-hidden rounded-md border',
                                                isDragged && 'opacity-60'
                                            )}
                                            draggable
                                            onDragStart={handleDragStart(media)}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop(media)}
                                            onDragEnd={handleDragEnd}

                                        >
                                            <video
                                                src={vid.url}
                                                className="h-full w-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                            />
                                            <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 text-[10px] font-medium uppercase tracking-wide text-white">
                                                Vídeo
                                            </span>
                                            <button
                                                type="button"
                                                className="absolute right-1 top-1 rounded-full bg-black/70 px-1 text-xs text-white hover:bg-black"

                                                onClick={() => handleRemoveVideo(vid.id)}

                                                aria-label="Remover vídeo"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-muted-foreground">Nenhuma mídia selecionada.</p>
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

                </div>
                {uploadingVideos && (
                    <p className="mt-6 text-xs text-muted-foreground">Enviando vídeos…</p>
                )}
                <DialogFooter className="mt-4">
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




