<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Setting;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        if (! $this->isRegistrationOpen()) {
            // Evita exibir a tela se cadastro estiver bloqueado
            return Inertia::render('auth/login');
        }
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        if (! $this->isRegistrationOpen()) {
            return redirect()->route('login');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::min(8)->mixedCase()->symbols()],
            // Contato obrigatório
            'contact_email' => ['required','email'],
            'contact_phone' => ['required','string','max:64'],
            'contact_whatsapp' => ['required','regex:/^\d{12,14}$/'],
            'contact_whatsapp_link' => ['required','url'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Salva/mescla configurações de contato globais
        try {
            Setting::query()->updateOrCreate(
                ['key' => 'contact'],
                ['value' => [
                    'email' => $validated['contact_email'] ?? null,
                    'phone' => $validated['contact_phone'] ?? null,
                    'whatsapp' => $validated['contact_whatsapp'] ?? null,
                    'whatsapp_link' => $validated['contact_whatsapp_link'] ?? (isset($validated['contact_whatsapp']) ? 'https://wa.me/'.preg_replace('/\D+/','',$validated['contact_whatsapp']) : null),
                ]]
            );
        } catch (\Throwable $e) {}

        // Após criar o primeiro usuário, bloqueia cadastros por padrão
        try {
            if (User::count() === 1) {
                Setting::query()->updateOrCreate(
                    ['key' => 'auth'],
                    ['value' => ['registration_open' => false]],
                );
            }
        } catch (\Throwable $e) {}

        Auth::login($user);

        return redirect()->intended(route('painel', absolute: false));
    }

    private function isRegistrationOpen(): bool
    {
        $value = Setting::firstWhere('key', 'auth')?->value ?? [];
        return (bool)($value['registration_open'] ?? (User::count() === 0));
    }
}
