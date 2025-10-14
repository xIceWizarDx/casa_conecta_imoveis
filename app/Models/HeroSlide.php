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
        $this->loadMissing('image');

        $image = $this->getRelation('image');

        if (! $image) {
            return null;
        }

        $url = $image->url;

        return $url !== '' ? $url : null;
    }

    public function getVideoUrlAttribute(): ?string
    {
        $this->loadMissing('video');

        $video = $this->getRelation('video');

        if (! $video) {
            return null;
        }

        $url = $video->url;

        return $url !== '' ? $url : null;
    }

}
