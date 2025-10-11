<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

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
        return Storage::disk($image->disk)->url($image->path);
    }

    public function getVideoUrlAttribute(): ?string
    {
        if (!$this->relationLoaded('video')) {
            $this->load('video');
        }
        $video = $this->getRelation('video');
        if (!$video) return null;
        return Storage::disk($video->disk)->url($video->path);
    }

}
