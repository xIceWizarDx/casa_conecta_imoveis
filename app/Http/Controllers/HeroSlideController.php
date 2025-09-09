<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HeroSlideController extends Controller
{
    public function publicIndex(): JsonResponse
    {
        $slides = HeroSlide::with('image')
            ->where('is_published', true)
            ->orderBy('position')
            ->orderBy('id')
            ->get();

        return response()->json($slides);
    }

    public function index(): JsonResponse
    {
        $slides = HeroSlide::with('image')
            ->orderBy('position')
            ->orderBy('id')
            ->get();

        return response()->json($slides);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'image_id'     => ['required', 'exists:images,id'],
            'title'        => ['required', 'string', 'max:255'],
            'subtitle'     => ['nullable', 'string', 'max:255'],
            'price'        => ['required', 'string', 'max:100'],
            'bedrooms'     => ['nullable', 'integer', 'min:0', 'max:99'],
            'bathrooms'    => ['nullable', 'integer', 'min:0', 'max:99'],
            'area'         => ['nullable', 'string', 'max:50'],
            'neighborhood' => ['nullable', 'string', 'max:100'],
            'is_new'       => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $maxPosition = (int) HeroSlide::max('position');
        $data['position'] = $maxPosition + 1;

        $slide = HeroSlide::create($data);
        $slide->load('image');

        return response()->json($slide, 201);
    }

    public function update(Request $request, HeroSlide $heroSlide): JsonResponse
    {
        $data = $request->validate([
            'image_id'     => ['sometimes', 'required', 'exists:images,id'],
            'title'        => ['sometimes', 'required', 'string', 'max:255'],
            'subtitle'     => ['nullable', 'string', 'max:255'],
            'price'        => ['sometimes', 'required', 'string', 'max:100'],
            'bedrooms'     => ['nullable', 'integer', 'min:0', 'max:99'],
            'bathrooms'    => ['nullable', 'integer', 'min:0', 'max:99'],
            'area'         => ['nullable', 'string', 'max:50'],
            'neighborhood' => ['nullable', 'string', 'max:100'],
            'is_new'       => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $heroSlide->update($data);
        $heroSlide->load('image');

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

