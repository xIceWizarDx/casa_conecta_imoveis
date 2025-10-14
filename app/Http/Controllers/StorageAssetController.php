<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class StorageAssetController extends Controller
{
    public function __invoke(Request $request, string $path): BinaryFileResponse
    {
        if (str_contains($path, '..')) {
            abort(404);
        }

        $disk = Storage::disk('public');

        if (! $disk->exists($path)) {
            abort(404);
        }

        $absolutePath = $disk->path($path);
        $mimeType = $disk->mimeType($path) ?? 'application/octet-stream';

        return response()->file($absolutePath, [
            'Cache-Control' => 'public, max-age=604800, immutable',
            'Content-Type' => $mimeType,
        ]);
    }
}
