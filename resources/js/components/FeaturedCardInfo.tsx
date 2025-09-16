import { Bath, Bed, MapPin, MessageCircle, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type FeaturedCardInfoProps = {
    title?: string | null;
    neighborhood?: string | null;
    bedrooms?: number | string | null;
    bathrooms?: number | string | null;
    area?: string | null;
    features?: string[];
    price?: string | null;
};

export default function FeaturedCardInfo({ title, neighborhood, bedrooms, bathrooms, area, features, price }: FeaturedCardInfoProps) {
    const shown = (features ?? []).slice(0, 2);
    const extra = Math.max((features?.length ?? 0) - shown.length, 0);

    return (
        <div className="rounded-b-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-bold text-gray-900">{title || 'Pré-visualização do destaque'}</h3>

            {(neighborhood || '').trim() && (
                <div className="mb-4 flex items-center text-gray-600">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span className="text-sm">{neighborhood}</span>
                </div>
            )}

            {(bedrooms || bathrooms || area) && (
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {(bedrooms ?? '') !== '' && (
                            <div className="flex items-center">
                                <Bed className="mr-1 h-4 w-4" />
                                <span>{bedrooms}</span>
                            </div>
                        )}
                        {(bathrooms ?? '') !== '' && (
                            <div className="flex items-center">
                                <Bath className="mr-1 h-4 w-4" />
                                <span>{bathrooms}</span>
                            </div>
                        )}
                        {(area || '').trim() && (
                            <div className="flex items-center">
                                <Square className="mr-1 h-4 w-4" />
                                <span>{area}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {(shown.length > 0 || extra > 0) && (
                <div className="mb-4 flex flex-wrap gap-1">
                    {shown.map((f, i) => (
                        <span key={`${f}-${i}`} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            {f}
                        </span>
                    ))}
                    {extra > 0 && <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">+{extra} mais</span>}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">{price || 'R$ 0,00'}</div>
                <Button className="w-auto bg-accent hover:bg-accent/90" variant="default">
                    <MessageCircle className="mr-2 h-4 w-4" /> Ver Detalhes
                </Button>
            </div>
        </div>
    );
}

