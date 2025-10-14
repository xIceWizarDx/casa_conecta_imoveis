<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'disk',
        'path',
        'filename',
        'original_name',
        'size',
        'mime_type',
        'width',
        'height',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute(): string
    {
        $path = ltrim($this->path, '/');

        return '/storage/' . $path;
    }
}

