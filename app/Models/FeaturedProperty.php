<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class FeaturedProperty extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_id', 'title', 'neighborhood', 'price', 'bedrooms', 'bathrooms', 'area', 'type', 'features', 'price_range', 'is_new', 'is_published', 'position',
    ];

    protected $casts = [
        'is_new' => 'bool',
        'is_published' => 'bool',
        'features' => 'array',
    ];

    // Ensure non-null default for features when not provided
    protected $attributes = [
        'features' => '[]',
    ];

    protected $appends = ['image_url', 'gallery'];

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }

    public function galleryImages(): HasMany
    {
        return $this->hasMany(FeaturedPropertyGalleryImage::class)->orderBy('position');
    }

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->relationLoaded('image')) {
            $this->load('image');
        }
        $image = $this->getRelation('image');
        if (!$image) return null;
        return Storage::disk($image->disk)->url($image->path);
    }

    public function getGalleryAttribute(): array
    {
        $gallery = [];

        $primary = $this->image_url;
        if ($primary) {
            $gallery[] = $primary;
        }

        $galleryImages = $this->relationLoaded('galleryImages')
            ? $this->galleryImages
            : $this->galleryImages()->with('image')->get();

        foreach ($galleryImages as $galleryImage) {
            $url = $galleryImage->image?->url;
            if ($url && !in_array($url, $gallery, true)) {
                $gallery[] = $url;
            }
        }

        return $gallery;
    }
}
