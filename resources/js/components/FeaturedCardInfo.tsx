import { Bath, Bed, MapPin, MessageCircle } from 'lucide-react';
import PropertyAreaMetrics from '@/components/PropertyAreaMetrics';
import { Button } from '@/components/ui/button';

export type FeaturedCardInfoProps = {
    title?: string | null;
    neighborhood?: string | null;
    bedrooms?: number | string | null;
    bathrooms?: number | string | null;
    area?: string | null;
    built_area?: string | null;
    description?: string | null;
    price?: string | null;
};

export default function FeaturedCardInfo({ title, neighborhood, bedrooms, bathrooms, area, built_area, description, price }: FeaturedCardInfoProps) {

    const trimmedDescription = typeof description === 'string' ? description.trim() : '';

    return (
        <div className="rounded-b-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-bold text-gray-900">{title || 'Pré-visualização do destaque'}</h3>

            {(neighborhood || '').trim() && (
                <div className="mb-4 flex items-center text-gray-600">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span className="text-sm">{neighborhood}</span>
                </div>
            )}

            {(bedrooms || bathrooms || area || built_area) && (
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
                        <PropertyAreaMetrics builtArea={built_area ?? undefined} area={area ?? undefined} />
                    </div>
                </div>
            )}
            {trimmedDescription && (
                <p className="mb-4 text-sm text-gray-700 whitespace-pre-line break-words">
                    {trimmedDescription}

            {trimmedDescription && (

                <div className="mb-4 text-sm text-gray-700 whitespace-pre-line break-words">
                    {trimmedDescription}
                </div>

            )}

            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-emerald-600">{price || 'R$ 0,00'}</div>
                <Button className="w-auto bg-accent hover:bg-accent/90" variant="default">
                    <MessageCircle className="mr-2 h-4 w-4" /> Ver Detalhes
                </Button>
            </div>
        </div>
    );
}
