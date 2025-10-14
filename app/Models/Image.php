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
        $disk = $this->disk ?: config('filesystems.default');
        $path = (string) $this->path;

        if ($path === '') {
            return '';
        }

        try {
            return Storage::disk($disk)->url($path);
        } catch (\Throwable $e) {
            $normalised = ltrim($path, '/');

            if ($disk === 'public' && str_starts_with($normalised, 'public/')) {
                $normalised = substr($normalised, strlen('public/')) ?: '';
            }

            if ($normalised === '') {
                return '';
            }

            if ($disk === 'public') {
                return '/storage/' . $normalised;
            }

            return '/' . $normalised;
        }
    }
}

