import ImageEditor from '@/components/ImageEditor';
import ImageGallery from '@/components/ImageGallery';
import ImagePreviewOverlay from '@/components/ImagePreviewOverlay';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';
import * as HeroActions from '@/actions/App/Http/Controllers/HeroSlideController';
import * as ImageActions from '@/actions/App/Http/Controllers/ImageController';
import { useEffect, useMemo, useState } from 'react';

type Image = {
    id: number;
    url: string;
    original_name: string;
    filename: string;
    width?: number | null;
    height?: number | null;
};

export type HeroSlide = {
    id: number;
    image_id: number;
    image_url?: string | null;
    title: string;
    subtitle?: string | null;
    price: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    area?: string | null;
    neighborhood?: string | null;
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
    images: Image[];
    slides: HeroSlide[];
    onRefreshSlides: () => Promise<void>;
    onNotice?: (n: Notice) => void;
    editingSlide?: HeroSlide | null;
}

export default function HeroSlidesModal({ open, onOpenChange, images, slides, onRefreshSlides, onNotice, editingSlide }: Props) {
    const [creating, setCreating] = useState(false);
    const [slidesLoading, setSlidesLoading] = useState(false);

    const [form, setForm] = useState<Partial<HeroSlide>>({});
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [editedBlob, setEditedBlob] = useState<Blob | null>(null);
    const [imagePickerOpen, setImagePickerOpen] = useState(false);

    // Prefill when editing
    useEffect(() => {
        if (open && editingSlide) {
            setForm(editingSlide);
            setSelectedImage(
                editingSlide.image_id && editingSlide.image_url
                    ? { id: editingSlide.image_id, url: editingSlide.image_url, original_name: '', filename: '' }
                    : null,
            );
            setEditedBlob(null);
        }
        if (open && !editingSlide) {
            // New entry
            setForm({});
            setSelectedImage(null);
            setEditedBlob(null);
        }
    }, [open, editingSlide]);

    const submit = async () => {
        if (!selectedImage?.id || !form.title || !form.price) {
            alert('Selecione uma imagem, título e preço.');
            return;
        }
        setCreating(true);
        try {
            let image_id = selectedImage.id;
            if (editedBlob) {
                const fd = new FormData();
                fd.append('images[]', editedBlob, 'preview-editada.png');
                const uploaded = await apiFetch<Image[]>(ImageActions.store(), { body: fd });
                if (uploaded[0]?.id) image_id = uploaded[0].id;
            }
            const body = JSON.stringify({
                image_id,
                title: form.title,
                subtitle: form.subtitle ?? null,
                price: form.price,
                bedrooms: form.bedrooms ?? null,
                bathrooms: form.bathrooms ?? null,
                area: form.area ?? null,
                neighborhood: form.neighborhood ?? null,
                is_new: !!form.is_new,
                is_published: !!form.is_published,
            });
            if (form.id) {
                await apiFetch(HeroActions.update({ heroSlide: form.id }), {
                    body,
                    headers: { 'Content-Type': 'application/json' },
                });
                onNotice?.({ type: 'success', title: 'Slide atualizado' });
            } else {
                await apiFetch(HeroActions.store(), {
                    body,
                    headers: { 'Content-Type': 'application/json' },
                });
                onNotice?.({ type: 'success', title: 'Slide adicionado' });
            }
            setForm({});
            setSelectedImage(null);
            setEditedBlob(null);
            await onRefreshSlides();
        } finally {
            setCreating(false);
        }
    };

    const slidesCount = useMemo(() => slides.length, [slides]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-5xl" aria-describedby="hero-slides-desc">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>Hero Slides</DialogTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{slidesLoading ? 'Carregando…' : `${slidesCount} itens`}</span>
                            <Button
                                className="w-auto"
                                variant="secondary"
                                onClick={async () => {
                                    setSlidesLoading(true);
                                    try {
                                        await onRefreshSlides();
                                    } finally {
                                        setSlidesLoading(false);
                                    }
                                }}
                                disabled={slidesLoading}
                                title="Atualizar"
                            >
                                ↻
                            </Button>
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription id="hero-slides-desc">
                    Preencha os dados e selecione uma imagem para criar ou editar um slide do hero.
                </DialogDescription>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <Label>Título</Label>
                            <Input
                                value={form.title ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                                placeholder="Ex: Casa moderna no Setor Marista"
                            />
                        </div>
                        <div>
                            <Label>Subtítulo</Label>
                            <Input
                                value={form.subtitle ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, subtitle: e.target.value }))}
                                placeholder="Ex: Próximo ao Flamboyant"
                            />
                        </div>
                        <div>
                            <Label>Bairro</Label>
                            <Input
                                value={form.neighborhood ?? ''}
                                onChange={(e) => setForm((s) => ({ ...s, neighborhood: e.target.value }))}
                                placeholder="Ex: Setor Marista"
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
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                        <Label>Imagem</Label>
                        <p className="mt-2 text-sm text-muted-foreground">Selecione uma imagem clicando no botão abaixo.</p>
                        <Button type="button" variant="default" className="mt-2 w-auto bg-black text-white hover:bg-black/90" onClick={() => setImagePickerOpen(true)}>
                            Selecionar da galeria
                        </Button>
                        <div className={cn('mt-4 w-full rounded-2xl shadow-lg overflow-hidden', !selectedImage && 'border-2 border-dashed')}>
                            {selectedImage && (
                                <ImageEditor src={selectedImage.url} onExport={setEditedBlob} sizeClass="w-full" aspect="video">
                                    <ImagePreviewOverlay
                                        titulo={form.title}
                                        subtitulo={form.subtitle}
                                        preco={form.price}
                                        quartos={form.bedrooms}
                                        banheiros={form.bathrooms}
                                        area={form.area}
                                        bairro={form.neighborhood}
                                    />
                                </ImageEditor>
                            )}
                        </div>
                    </div>
                    <div className="flex items-end gap-2">
                        <Button className="w-auto" onClick={submit} disabled={creating} title={form.id ? 'Salvar' : 'Adicionar Slide'}>
                            {creating ? '…' : form.id ? 'Salvar' : '+'}
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button className="w-auto" variant="secondary" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                </DialogFooter>

                {/* Image Picker */}
                <Dialog open={imagePickerOpen} onOpenChange={setImagePickerOpen}>
                    <DialogContent aria-describedby="image-picker-slide-desc">
                        <DialogHeader>
                            <DialogTitle>Selecionar imagem</DialogTitle>
                        </DialogHeader>
                        <DialogDescription id="image-picker-slide-desc">Escolha uma imagem na lista abaixo</DialogDescription>
                        <ImageGallery
                            images={images}
                            onSelect={(img) => {
                                setSelectedImage(img);
                                setForm((s) => ({ ...s, image_id: img.id }));
                                setImagePickerOpen(false);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    );
}
