<?php

namespace App\Http\Controllers;

use App\Models\FeaturedProperty;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeaturedPropertyController extends Controller
{
    public function publicIndex(): JsonResponse
    {
        $items = FeaturedProperty::with(['image', 'images', 'videos'])
            ->where('is_published', true)
            ->orderBy('position')
            ->orderBy('id')
            ->get();
        return response()->json($items);
    }

    public function index(): JsonResponse
    {
        $items = FeaturedProperty::with(['image', 'images', 'videos'])
            ->orderBy('position')
            ->orderBy('id')
            ->get();
        return response()->json($items);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'image_id'     => ['required', 'exists:images,id'],
            'title'        => ['required', 'string', 'max:255'],
            'neighborhood' => ['nullable', 'string', 'max:100'],
            'price'        => ['required', 'string', 'max:100'],
            'bedrooms'     => ['nullable', 'integer', 'min:0'],
            'bathrooms'    => ['nullable', 'integer', 'min:0'],
            'area'         => ['nullable', 'string', 'max:50'],
            'built_area'   => ['nullable', 'string', 'max:50'],
            'type'         => ['nullable', 'string', 'max:30'],
            'description'  => ['nullable', 'string'],
            'features'     => ['nullable', 'array'],
            'features.*'   => ['string', 'max:50'],
            'price_range'  => ['nullable', 'string', 'max:50'],
            'is_new'       => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'gallery_image_ids' => ['nullable', 'array'],
            'gallery_image_ids.*' => ['integer', 'exists:images,id'],
            'gallery_video_ids' => ['nullable', 'array'],
            'gallery_video_ids.*' => ['integer', 'exists:videos,id'],
        ]);

        $data['features'] = $data['features'] ?? [];
        $data['position'] = (int) FeaturedProperty::max('position') + 1;
        $item = FeaturedProperty::create($data);

        // Attach gallery images (excluding the cover image) preserving order
        $galleryIds = collect($request->input('gallery_image_ids', []))
            ->filter(fn ($id) => (int) $id !== (int) $data['image_id'])
            ->values();
        if ($galleryIds->count() > 0) {
            $attach = [];
            foreach ($galleryIds as $idx => $imgId) {
                $attach[$imgId] = ['position' => $idx + 1];
            }
            $item->images()->attach($attach);
        }

        // Attach gallery videos preserving order
        $videoIds = collect($request->input('gallery_video_ids', []))->values();
        if ($videoIds->count() > 0) {
            $vattach = [];
            foreach ($videoIds as $idx => $vid) {
                $vattach[$vid] = ['position' => $idx + 1];
            }
            $item->videos()->attach($vattach);
        }


        $item->load(['image', 'images', 'videos']);
        return response()->json($item, 201);
    }

    public function update(Request $request, FeaturedProperty $featuredProperty): JsonResponse
    {
        $data = $request->validate([
            'image_id'     => ['sometimes', 'required', 'exists:images,id'],
            'title'        => ['sometimes', 'required', 'string', 'max:255'],
            'neighborhood' => ['nullable', 'string', 'max:100'],
            'price'        => ['sometimes', 'required', 'string', 'max:100'],
            'bedrooms'     => ['nullable', 'integer', 'min:0'],
            'bathrooms'    => ['nullable', 'integer', 'min:0'],
            'area'         => ['nullable', 'string', 'max:50'],
            'built_area'   => ['nullable', 'string', 'max:50'],
            'type'         => ['nullable', 'string', 'max:30'],
            'description'  => ['nullable', 'string'],
            'features'     => ['nullable', 'array'],
            'features.*'   => ['string', 'max:50'],
            'price_range'  => ['nullable', 'string', 'max:50'],
            'is_new'       => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'gallery_image_ids' => ['nullable', 'array'],
            'gallery_image_ids.*' => ['integer', 'exists:images,id'],
            'gallery_video_ids' => ['nullable', 'array'],
            'gallery_video_ids.*' => ['integer', 'exists:videos,id'],
        ]);
        $featuredProperty->update($data);

        // Sync gallery when provided (excluding the cover image)
        if ($request->has('gallery_image_ids')) {
            $coverId = (int) ($data['image_id'] ?? $featuredProperty->image_id);
            $galleryIds = collect($request->input('gallery_image_ids', []))
                ->filter(fn ($id) => (int) $id !== $coverId)
                ->values();
            $sync = [];
            foreach ($galleryIds as $idx => $imgId) {
                $sync[$imgId] = ['position' => $idx + 1];
            }
            $featuredProperty->images()->sync($sync);
        }

        // Sync videos when provided
        if ($request->has('gallery_video_ids')) {
            $videoIds = collect($request->input('gallery_video_ids', []))->values();
            $vsync = [];
            foreach ($videoIds as $idx => $vid) {
                $vsync[$vid] = ['position' => $idx + 1];
            }
            $featuredProperty->videos()->sync($vsync);
        }


        $featuredProperty->load(['image', 'images', 'videos']);
        return response()->json($featuredProperty);
    }

    public function destroy(FeaturedProperty $featuredProperty): JsonResponse
    {
        $featuredProperty->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function togglePublish(FeaturedProperty $featuredProperty): JsonResponse
    {
        $featuredProperty->is_published = ! $featuredProperty->is_published;
        $featuredProperty->save();
        return response()->json($featuredProperty);
    }

    public function reorder(Request $request): JsonResponse
    {
        $data = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:featured_properties,id'],
        ]);
        foreach ($data['ids'] as $idx => $id) {
            FeaturedProperty::where('id', $id)->update(['position' => $idx + 1]);
        }
        return response()->json(['message' => 'Reordered']);
    }
}
