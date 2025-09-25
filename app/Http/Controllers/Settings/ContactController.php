<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function show()
    {
        $contact = Setting::firstWhere('key', 'contact');
        $value = $contact?->value ?? [
            'email' => null,
            'phone' => null,
            'whatsapp' => null, // E.164 sem + ou link completo
            'whatsapp_link' => null,
        ];

        return response()->json(['contact' => $value]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string', 'max:64'],
            'whatsapp' => ['nullable', 'string', 'max:64'],
            'whatsapp_link' => ['nullable', 'url'],
        ]);

        $setting = Setting::firstOrNew(['key' => 'contact']);
        $current = $setting->value ?? [];
        $setting->value = array_merge($current, $data);
        $setting->save();

        return response()->json(['ok' => true, 'contact' => $setting->value]);
    }
}

