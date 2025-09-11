<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
        return Storage::disk($this->disk)->url($this->path);
    }
}

