<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeaturedPropertyGalleryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'featured_property_id',
        'image_id',
        'position',
    ];

    public function featuredProperty(): BelongsTo
    {
        return $this->belongsTo(FeaturedProperty::class);
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }
}
