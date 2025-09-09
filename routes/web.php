<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\HeroSlideController;
use App\Http\Controllers\FeaturedPropertyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('site');
})->name('home');

// Rotas públicas do SPA antigo para suportar navegação direta
Route::get('/faq-comprehensive-buyer-education', function () {
    return Inertia::render('site');
});
Route::get('/about-brand-story-credentials', function () {
    return Inertia::render('site');
});
Route::get('/homepage-premium-real-estate-consultancy', function () {
    return Inertia::render('site');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Página do painel (antes: imagens)
    Route::get('painel', function () {
        return Inertia::render('painel');
    })->name('painel');

    // Redirecionamentos para evitar links quebrados
    Route::redirect('imagens', 'painel');

    // Endpoints JSON protegidos para gerenciamento de imagens
    Route::prefix('api')->group(function () {
        Route::get('images', [ImageController::class, 'index'])->name('images.index');
        Route::post('images', [ImageController::class, 'store'])->name('images.store');
        Route::delete('images/{image}', [ImageController::class, 'destroy'])->name('images.destroy');
    });

    // Endpoints admin para Hero Slides
    Route::prefix('api/admin')->group(function () {
        Route::get('hero-slides', [HeroSlideController::class, 'index']);
        Route::post('hero-slides', [HeroSlideController::class, 'store']);
        Route::put('hero-slides/{heroSlide}', [HeroSlideController::class, 'update']);
        Route::delete('hero-slides/{heroSlide}', [HeroSlideController::class, 'destroy']);
        Route::patch('hero-slides/{heroSlide}/publish', [HeroSlideController::class, 'togglePublish']);
        Route::patch('hero-slides/reorder', [HeroSlideController::class, 'reorder']);

        // Admin Featured Properties
        Route::get('featured-properties', [FeaturedPropertyController::class, 'index']);
        Route::post('featured-properties', [FeaturedPropertyController::class, 'store']);
        Route::put('featured-properties/{featuredProperty}', [FeaturedPropertyController::class, 'update']);
        Route::delete('featured-properties/{featuredProperty}', [FeaturedPropertyController::class, 'destroy']);
        Route::patch('featured-properties/{featuredProperty}/publish', [FeaturedPropertyController::class, 'togglePublish']);
        Route::patch('featured-properties/reorder', [FeaturedPropertyController::class, 'reorder']);
    });
});

// Endpoint público para consumir os slides publicados no Hero
Route::get('api/hero-slides', [HeroSlideController::class, 'publicIndex']);
// Endpoint público para imóveis em destaque
Route::get('api/featured-properties', [FeaturedPropertyController::class, 'publicIndex']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
