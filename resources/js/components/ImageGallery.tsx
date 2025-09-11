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
    onSelect: (image: GalleryImage) => void;
}

export default function ImageGallery({ images, onSelect }: ImageGalleryProps) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {images.map((img) => (
                <button
                    key={img.id}
                    type="button"
                    className="overflow-hidden rounded-md border focus:outline-none focus:ring-2 focus:ring-ring"
                    onClick={() => onSelect(img)}
                >
                    <img src={img.url} alt={img.original_name} className="h-28 w-full object-cover" />
                </button>
            ))}
        </div>
    );
}
