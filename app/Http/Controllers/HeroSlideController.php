<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HeroSlideController extends Controller
{
    public function publicIndex(): JsonResponse
    {
        $slides = HeroSlide::with(['image', 'video'])
            ->where('is_published', true)
            ->orderBy('position')
            ->orderBy('id')
            ->get();

        return response()->json($slides);
    }

    public function index(): JsonResponse
    {
        $slides = HeroSlide::with(['image', 'video'])
            ->orderBy('position')
            ->orderBy('id')
            ->get();

        return response()->json($slides);
    }

    public function store(Request $request): JsonResponse
    {
        Log::info('HeroSlide store request received', [
            'user_id' => $request->user()?->id,
            'image_id' => $request->input('image_id'),
            'video_id' => $request->input('video_id'),
        ]);
        $data = $request->validate([
            'image_id'     => ['nullable', 'exists:images,id'],
            'video_id'     => ['nullable', 'exists:videos,id'],
            'title'        => ['required', 'string', 'max:255'],
            'subtitle'     => ['nullable', 'string', 'max:255'],
            'price'        => ['required', 'string', 'max:100'],
            'bedrooms'     => ['nullable', 'integer', 'min:0'],
            'bathrooms'    => ['nullable', 'integer', 'min:0'],
            'area'         => ['nullable', 'string', 'max:50'],
            'neighborhood' => ['nullable', 'string', 'max:100'],
            'is_new'       => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        Log::info('HeroSlide store payload validated', [
            'user_id' => $request->user()?->id,
            'image_id' => $data['image_id'] ?? null,
            'video_id' => $data['video_id'] ?? null,
        ]);

        if (empty($data['image_id']) && empty($data['video_id'])) {
            return response()->json(['message' => 'image_id ou video_id é obrigatório'], 422);
        }

        $maxPosition = (int) HeroSlide::max('position');
        $data['position'] = $maxPosition + 1;

        try {
            $slide = HeroSlide::create($data);
            $slide->load(['image', 'video']);
        } catch (\Throwable $e) {
            Log::error('HeroSlide store failed', [
                'user_id' => $request->user()?->id,
                'image_id' => $data['image_id'] ?? null,
                'video_id' => $data['video_id'] ?? null,
                'exception' => $e->getMessage(),
            ]);

            throw $e;
        }

        return response()->json($slide, 201);
    }

    public function update(Request $request, HeroSlide $heroSlide): JsonResponse
    {
        $data = $request->validate([
            'image_id'     => ['nullable', 'exists:images,id'],
            'video_id'     => ['nullable', 'exists:videos,id'],
            'title'        => ['sometimes', 'required', 'string', 'max:255'],
            'subtitle'     => ['nullable', 'string', 'max:255'],
            'price'        => ['sometimes', 'required', 'string', 'max:100'],
            'bedrooms'     => ['nullable', 'integer', 'min:0'],
            'bathrooms'    => ['nullable', 'integer', 'min:0'],
            'area'         => ['nullable', 'string', 'max:50'],
            'neighborhood' => ['nullable', 'string', 'max:100'],
            'is_new'       => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        if (empty($data['image_id']) && empty($data['video_id'])) {
            // no media change
        }

        $heroSlide->update($data);
        $heroSlide->load(['image', 'video']);

        return response()->json($heroSlide);
    }

    public function destroy(HeroSlide $heroSlide): JsonResponse
    {
        $heroSlide->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function togglePublish(HeroSlide $heroSlide): JsonResponse
    {
        $heroSlide->is_published = ! $heroSlide->is_published;
        $heroSlide->save();
        return response()->json($heroSlide);
    }

    public function reorder(Request $request): JsonResponse
    {
        $data = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:hero_slides,id'],
        ]);

        $ids = $data['ids'];
        foreach ($ids as $idx => $id) {
            HeroSlide::where('id', $id)->update(['position' => $idx + 1]);
        }

        return response()->json(['message' => 'Reordered']);
    }
}
