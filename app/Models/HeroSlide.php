<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HeroSlide extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_id',
        'video_id',
        'title',
        'subtitle',
        'price',
        'bedrooms',
        'bathrooms',
        'area',
        'neighborhood',
        'is_new',
        'is_published',
        'position',
    ];

    protected $casts = [
        'is_new' => 'bool',
        'is_published' => 'bool',
    ];

    protected $appends = [
        'image_url',
        'video_url',
    ];

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }

    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }


    public function getImageUrlAttribute(): ?string
    {
        if (!$this->relationLoaded('image')) {
            $this->load('image');
        }
        $image = $this->getRelation('image');
        if (!$image) return null;
        $path = ltrim($image->path, '/');

        return '/storage/' . $path;
    }

    public function getVideoUrlAttribute(): ?string
    {
        if (!$this->relationLoaded('video')) {
            $this->load('video');
        }
        $video = $this->getRelation('video');
        if (!$video) return null;
        $path = ltrim($video->path, '/');

        return '/storage/' . $path;
    }

}
