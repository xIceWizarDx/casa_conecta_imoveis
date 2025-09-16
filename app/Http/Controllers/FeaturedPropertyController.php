<?php

namespace App\Http\Controllers;

use App\Models\FeaturedProperty;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeaturedPropertyController extends Controller
{
    public function publicIndex(): JsonResponse
    {
        $items = FeaturedProperty::with('image')
            ->where('is_published', true)
            ->orderBy('position')
            ->orderBy('id')
            ->get();
        return response()->json($items);
    }

    public function index(): JsonResponse
    {
        $items = FeaturedProperty::with('image')
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
            'bedrooms'     => ['nullable', 'integer', 'min:0', 'max:99'],
            'bathrooms'    => ['nullable', 'integer', 'min:0', 'max:99'],
            'area'         => ['nullable', 'string', 'max:50'],
            'type'         => ['nullable', 'string', 'max:30'],
            'features'     => ['nullable', 'array'],
            'features.*'   => ['string', 'max:50'],
            'price_range'  => ['nullable', 'string', 'max:50'],
            'is_new'       => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $data['features'] = $data['features'] ?? [];
        $data['position'] = (int) FeaturedProperty::max('position') + 1;
        $item = FeaturedProperty::create($data);
        $item->load('image');
        return response()->json($item, 201);
    }

    public function update(Request $request, FeaturedProperty $featuredProperty): JsonResponse
    {
        $data = $request->validate([
            'image_id'     => ['sometimes', 'required', 'exists:images,id'],
            'title'        => ['sometimes', 'required', 'string', 'max:255'],
            'neighborhood' => ['nullable', 'string', 'max:100'],
            'price'        => ['sometimes', 'required', 'string', 'max:100'],
            'bedrooms'     => ['nullable', 'integer', 'min:0', 'max:99'],
            'bathrooms'    => ['nullable', 'integer', 'min:0', 'max:99'],
            'area'         => ['nullable', 'string', 'max:50'],
            'type'         => ['nullable', 'string', 'max:30'],
            'features'     => ['nullable', 'array'],
            'features.*'   => ['string', 'max:50'],
            'price_range'  => ['nullable', 'string', 'max:50'],
            'is_new'       => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
        ]);
        $featuredProperty->update($data);
        $featuredProperty->load('image');
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

