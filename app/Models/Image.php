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

        $normalised = ltrim($path, '/');

        if (str_starts_with($normalised, 'storage/')) {
            $normalised = substr($normalised, strlen('storage/')) ?: '';
        }

        if ($disk === 'public' && str_starts_with($normalised, 'public/')) {
            $normalised = substr($normalised, strlen('public/')) ?: '';
        }

        if ($disk === 'public' && $normalised !== '') {
            return '/storage/' . ltrim($normalised, '/');
        }

        try {
            return Storage::disk($disk)->url($path);
        } catch (\Throwable $e) {
            if ($normalised === '') {
                return '';
            }

            if ($disk === 'public') {
                return '/storage/' . ltrim($normalised, '/');
            }

            return '/' . $normalised;
        }
    }
}

