<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function index(): JsonResponse
    {
        $videos = Video::query()->latest('id')->get();
        return response()->json($videos);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'videos'   => ['required', 'array', 'max:20'],
            'videos.*' => ['file', 'mimetypes:video/mp4,video/webm,video/ogg,image/gif', 'max:102400'], // up to ~100MB
        ]);

        $saved = [];
        $disk = 'public';

        foreach ($request->file('videos', []) as $file) {
            $width = null;
            $height = null;
            $duration = null;

            $path = $file->store('videos', $disk);
            $filename = basename($path);
            $size = $file->getSize();
            $mime = $file->getMimeType();

            $video = Video::create([
                'disk'          => $disk,
                'path'          => $path,
                'filename'      => $filename,
                'original_name' => $file->getClientOriginalName(),
                'size'          => $size,
                'mime_type'     => $mime,
                'width'         => $width,
                'height'        => $height,
                'duration'      => $duration,
            ]);

            $saved[] = $video;
        }

        return response()->json($saved, 201);
    }

    public function destroy(Video $video): JsonResponse
    {
        try {
            Storage::disk($video->disk)->delete($video->path);
        } catch (\Throwable $e) {
            // ignore
        }

        $video->delete();
        return response()->json(['message' => 'Deleted']);
    }
}

