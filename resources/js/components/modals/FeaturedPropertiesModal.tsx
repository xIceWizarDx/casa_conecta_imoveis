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
import { ChangeEvent, useMemo, useRef, useState, type CSSProperties } from 'react';

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
    const [gallery, setGallery] = useState<Image[]>([]);
    const mainUploadInputRef = useRef<HTMLInputElement | null>(null);
    const galleryUploadInputRef = useRef<HTMLInputElement | null>(null);

    const handleMainUploadChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const uploaded = await onUploadImages(event.target.files);
        event.target.value = '';
        if (uploaded.length > 0) {
            const [first] = uploaded;
            setSelectedImage(first);
            setForm((s) => ({ ...s, image_id: first.id }));
        }
    };

    const handleGalleryUploadChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const uploaded = await onUploadImages(event.target.files);
        event.target.value = '';
        if (uploaded.length > 0) {
            setGallery((prev) => {
                const existingIds = new Set(prev.map((img) => img.id));
                const additions = uploaded.filter((img) => !existingIds.has(img.id));
                return [...prev, ...additions];
            });
        }
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
                gallery_image_ids: gallery.map((g) => g.id),
            });
            await apiFetch(FeaturedActions.store(), { body, headers: { 'Content-Type': 'application/json' } });
            setForm({ features: [] });
            setFeatureInput('');
            setSelectedImage(null);
            setGallery([]);
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
                        <p className="mt-2 text-sm text-muted-foreground">
                            Envie a imagem principal do destaque utilizando o botão abaixo.
                        </p>
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-2 w-auto"
                            onClick={() => mainUploadInputRef.current?.click()}
                            disabled={uploadingImages}
                        >
                            {uploadingImages ? 'Enviando…' : 'Enviar imagem principal'}
                        </Button>
                        <input
                            ref={mainUploadInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleMainUploadChange}
                        />
                        <div className={cn('mt-4 w-full', !selectedImage && 'border-2 border-dashed')}>
                            {selectedImage && (
                                <div className="w-full" style={previewThemeVariables}>
                                    <div className="relative">
                                        <ImageEditor src={selectedImage.url} sizeClass="w-full" aspect="square">
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
                    <div>
                        <Label>Galeria de imagens</Label>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Adicione imagens extras para compor a galeria do imóvel.
                        </p>
                        {gallery.length > 0 ? (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {gallery.map((img) => (
                                    <div key={img.id} className="relative h-16 w-16 overflow-hidden rounded-md border">
                                        <img src={img.url} alt={img.original_name} className="h-full w-full object-cover" />
                                        <button
                                            type="button"
                                            className="absolute right-1 top-1 rounded-full bg-black/70 px-1 text-xs text-white hover:bg-black"
                                            onClick={() => setGallery((prev) => prev.filter((item) => item.id !== img.id))}
                                            aria-label="Remover imagem da galeria"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-2 text-sm text-muted-foreground">Nenhuma imagem selecionada.</p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-auto"
                                onClick={() => galleryUploadInputRef.current?.click()}
                                disabled={uploadingImages}
                            >
                                {uploadingImages ? 'Enviando…' : 'Enviar imagens da galeria'}
                            </Button>
                        </div>
                        <input
                            ref={galleryUploadInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleGalleryUploadChange}
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <Button className="w-auto" onClick={submit} disabled={creating} title="Adicionar Destaque">
                            {creating ? '…' : '+'}
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button className="w-auto" variant="secondary" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
