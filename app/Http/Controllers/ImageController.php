<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function index(): JsonResponse
    {
        $images = Image::query()->latest('id')->get();
        return response()->json($images);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'images'   => ['required', 'array', 'max:20'],
            'images.*' => ['file', 'image', 'mimes:jpeg,jpg,png,gif,webp', 'max:5120'], // 5MB por arquivo
        ]);

        $saved = [];
        $disk = 'public';

        foreach ($request->file('images', []) as $file) {
            $path = $file->store('images', $disk);
            $filename = basename($path);
            $size = $file->getSize();
            $mime = $file->getMimeType();

            $width = null;
            $height = null;
            try {
                $absolute = Storage::disk($disk)->path($path);
                if (is_file($absolute)) {
                    [$w, $h] = @getimagesize($absolute) ?: [null, null];
                    $width = $w; $height = $h;
                }
            } catch (\Throwable $e) {
                // ignora falhas ao ler dimensões
            }

            $image = Image::create([
                'disk'          => $disk,
                'path'          => $path,
                'filename'      => $filename,
                'original_name' => $file->getClientOriginalName(),
                'size'          => $size,
                'mime_type'     => $mime,
                'width'         => $width,
                'height'        => $height,
            ]);

            $saved[] = $image;
        }

        return response()->json($saved, 201);
    }

    public function destroy(Image $image): JsonResponse
    {
        // apaga do disco
        try {
            Storage::disk($image->disk)->delete($image->path);
        } catch (\Throwable $e) {
            // segue mesmo se já não existir no disco
        }

        $image->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

