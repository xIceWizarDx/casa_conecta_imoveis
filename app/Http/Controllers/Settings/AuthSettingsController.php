<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;

class AuthSettingsController extends Controller
{
    public function show()
    {
        $value = Setting::firstWhere('key', 'auth')?->value ?? [];
        $open = (bool)($value['registration_open'] ?? (User::count() === 0));

        return response()->json(['auth' => ['registration_open' => $open]]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'registration_open' => ['required', 'boolean'],
        ]);

        $setting = Setting::firstOrNew(['key' => 'auth']);
        $current = $setting->value ?? [];
        $setting->value = array_merge($current, $data);
        $setting->save();

        return response()->json(['ok' => true, 'auth' => $setting->value]);
    }
}

