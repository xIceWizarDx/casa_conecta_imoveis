import ImageEditor from '@/components/ImageEditor';
import ImageGallery from '@/components/ImageGallery';
import FeaturedCardInfo from '@/components/FeaturedCardInfo';
// Heart icon removed
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';
import * as FeaturedActions from '@/actions/App/Http/Controllers/FeaturedPropertyController';
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
    images: Image[];
    featured: FeaturedProperty[];
    onRefreshFeatured: () => Promise<void>;
    onNotice?: (n: Notice) => void;
}

export default function FeaturedPropertiesModal({ open, onOpenChange, images, featured, onRefreshFeatured, onNotice }: Props) {
    const [creating, setCreating] = useState(false);
    const [featuredLoading, setFeaturedLoading] = useState(false);

    const [form, setForm] = useState<Partial<FeaturedProperty>>({ features: [] });
    const [featureInput, setFeatureInput] = useState('');
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [editedBlob, setEditedBlob] = useState<Blob | null>(null);
    const [imagePickerOpen, setImagePickerOpen] = useState(false);
    const [imagePickerFor, setImagePickerFor] = useState<'main' | 'gallery' | null>(null);
    const [gallery, setGallery] = useState<Image[]>([]);

    const [list, setList] = useState<FeaturedProperty[]>([]);

    useEffect(() => {
        if (open) setList(featured);
    }, [open, featured]);

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
                gallery_image_ids: gallery.map((g) => g.id),
            });
            await apiFetch(FeaturedActions.store(), { body, headers: { 'Content-Type': 'application/json' } });
            setForm({ features: [] });
            setFeatureInput('');
            setSelectedImage(null);
            setEditedBlob(null);
            setGallery([]);
            onNotice?.({ type: 'success', title: 'Destaque adicionado' });
            await onRefreshFeatured();
        } finally {
            setCreating(false);
        }
    };

    const togglePublish = async (id: number) => {
        await apiFetch(FeaturedActions.togglePublish({ featuredProperty: id }));
        await onRefreshFeatured();
    };

    const removeItem = async (id: number) => {
        if (!confirm('Excluir este destaque?')) return;
        await apiFetch(FeaturedActions.destroy({ featuredProperty: id }));
        await onRefreshFeatured();
    };

    const move = async (id: number, dir: -1 | 1) => {
        const idx = list.findIndex((s) => s.id === id);
        if (idx < 0) return;
        const target = idx + dir;
        if (target < 0 || target >= list.length) return;
        const next = list.slice();
        const [item] = next.splice(idx, 1);
        next.splice(target, 0, item);
        setList(next);
        const ids = next.map((s) => s.id);
        await apiFetch(FeaturedActions.reorder.patch(), {
            body: JSON.stringify({ ids }),
            headers: { 'Content-Type': 'application/json' },
        });
        await onRefreshFeatured();
    };

    const listCount = useMemo(() => list.length, [list]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-5xl" aria-describedby="featured-desc">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>Imóveis em Destaque</DialogTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{featuredLoading ? 'Carregando…' : `${listCount} itens`}</span>
                            <Button
                                className="w-auto hidden"
                                variant="secondary"
                                onClick={async () => {
                                    setFeaturedLoading(true);
                                    try {
                                        await onRefreshFeatured();
                                    } finally {
                                        setFeaturedLoading(false);
                                    }
                                }}
                                disabled={featuredLoading}
                                title="Atualizar"
                            >
                                ↻
                            </Button>
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
                                className="w-auto"
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
                                            className="text-muted-foreground hover:text-foreground"
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
                        <Label>Imagem</Label>
                        <p className="mt-2 text-sm text-muted-foreground">Selecione uma imagem clicando no botão abaixo.</p>
                        <Button
                            type="button"
                            variant="default"
                            className="mt-2 w-auto bg-black text-white hover:bg-black/90"
                            onClick={() => {
                                setImagePickerFor('main');
                                setImagePickerOpen(true);
                            }}
                        >
                            Selecionar da galeria
                        </Button>
                        <div className={cn('mt-4 w-full', !selectedImage && 'border-2 border-dashed')}>
                            {selectedImage && (
                                <div
                                    className="w-full"
                                    style={{
                                        // Alinhado às cores da home (main/styles/tailwind.css)
                                        ['--color-primary' as any]: '#22C55E',
                                        ['--color-accent' as any]: '#25D366',
                                        ['--color-muted' as any]: '#F9FAFB',
                                        ['--color-muted-foreground' as any]: '#6B7280',
                                        ['--color-foreground' as any]: '#111827',
                                        ['--color-card' as any]: '#FFFFFF',
                                        ['--color-border' as any]: '#E5E7EB',
                                    }}
                                >
                                    <div className="relative">
                                        <ImageEditor src={selectedImage.url} onExport={setEditedBlob} sizeClass="w-full" aspect="square">
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
                            )}
                        </div>
                    </div>
                    <div className="flex items-end gap-2">
                        <Button className="w-auto" onClick={submit} disabled={creating} title="Adicionar Destaque">
                            {creating ? '…' : '+'}
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {list.map((f) => (
                            <div key={f.id} className="overflow-hidden rounded-md border">
                                {f.image_url ? (
                                    <img src={f.image_url} alt={f.title} className="h-40 w-full object-cover" />
                                ) : (
                                    <div className="h-40 w-full bg-muted" />
                                )}
                                <div className="flex items-center justify-between gap-2 p-2">
                                    <div className="min-w-0">
                                        <div className="truncate font-medium" title={f.title}>
                                            {f.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground">{f.price}</div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1">
                                        <Button className="w-auto" variant="secondary" onClick={() => move(f.id, -1)} title="Subir">
                                            ↑
                                        </Button>
                                        <Button className="w-auto" variant="secondary" onClick={() => move(f.id, 1)} title="Descer">
                                            ↓
                                        </Button>
                                        <Button
                                            className="w-auto"
                                            variant={f.is_published ? 'default' : 'secondary'}
                                            onClick={() => togglePublish(f.id)}
                                            title="Publicar/Despublicar"
                                        >
                                            {f.is_published ? 'Publicado' : 'Rascunho'}
                                        </Button>
                                        <Button className="w-auto" variant="destructive" onClick={() => removeItem(f.id)} title="Excluir">
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <Button className="w-auto" variant="secondary" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                </DialogFooter>

                {/* Image Picker (principal ou galeria) */}
                <Dialog open={imagePickerOpen} onOpenChange={setImagePickerOpen}>
                    <DialogContent aria-describedby="image-picker-featured-desc">
                        <DialogHeader>
                            <DialogTitle>Selecionar imagem</DialogTitle>
                        </DialogHeader>
                        <DialogDescription id="image-picker-featured-desc">
                            {imagePickerFor === 'gallery' ? 'Escolha uma ou mais imagens na lista abaixo' : 'Escolha uma imagem na lista abaixo'}
                        </DialogDescription>
                        <ImageGallery
                            images={images}
                            multiple={imagePickerFor === 'gallery'}
                            selected={imagePickerFor === 'gallery' ? gallery.map((g) => g.id) : selectedImage?.id ? [selectedImage.id] : []}
                            onChangeSelected={(_ids, imgs) => {
                                if (imagePickerFor === 'gallery') {
                                    setGallery(imgs);
                                } else {
                                    setSelectedImage(imgs[0] ?? null);
                                    setForm((s) => ({ ...s, image_id: imgs[0]?.id ?? s.image_id }));
                                    setImagePickerOpen(false);
                                }
                            }}
                            onSelect={(img) => {
                                if (imagePickerFor === 'gallery') {
                                    // fallback: toggle handled by onChangeSelected
                                } else {
                                    setSelectedImage(img);
                                    setForm((s) => ({ ...s, image_id: img.id }));
                                    setImagePickerOpen(false);
                                }
                            }}
                            showFooter={imagePickerFor === 'gallery'}
                            onConfirm={() => setImagePickerOpen(false)}
                            confirmLabel="Concluir"
                        />
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    );
}
