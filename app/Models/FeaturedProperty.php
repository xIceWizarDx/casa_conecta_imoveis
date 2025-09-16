<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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

    // Additional gallery images associated with this property
    public function gallery(): BelongsToMany
    {
        return $this->belongsToMany(Image::class, 'featured_property_images', 'featured_property_id', 'image_id')
            ->withPivot('position')
            ->orderBy('featured_property_images.position');
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
        if (!$this->relationLoaded('gallery')) {
            $this->load('gallery');
        }
        $items = $this->getRelation('gallery');
        if (!$items) return [];
        return $items->map(function ($img) {
            return [
                'id' => $img->id,
                'url' => Storage::disk($img->disk)->url($img->path),
            ];
        })->values()->all();
    }
}
