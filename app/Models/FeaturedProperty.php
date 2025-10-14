<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class FeaturedProperty extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_id', 'title', 'neighborhood', 'price', 'bedrooms', 'bathrooms', 'area', 'built_area', 'type', 'description', 'features', 'price_range', 'is_new', 'is_published', 'position',
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

    public function getImageUrlAttribute(): ?string
    {
        $this->loadMissing('image');

        $image = $this->getRelation('image');

        if (! $image) {
            return null;
        }

        $url = $image->url;

        return $url !== '' ? $url : null;
    }

    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class, 'featured_property_images')
            ->withPivot('position')
            ->orderBy('featured_property_images.position')
            ->withTimestamps();
    }

    public function videos(): BelongsToMany
    {
        return $this->belongsToMany(Video::class, 'featured_property_videos')
            ->withPivot('position')
            ->orderBy('featured_property_videos.position')
            ->withTimestamps();
    }

    public function getGalleryAttribute(): array
    {
        $this->loadMissing('image', 'images');

        $urls = [];

        $cover = $this->getRelation('image');
        if ($cover && $cover->url !== '') {
            $urls[] = $cover->url;
        }

        foreach ($this->getRelation('images') as $image) {
            if ($cover && $image->getKey() === $cover->getKey()) {
                continue;
            }

            if ($image->url !== '') {
                $urls[] = $image->url;
            }
        }

        return array_values(array_unique($urls));
    }
}
