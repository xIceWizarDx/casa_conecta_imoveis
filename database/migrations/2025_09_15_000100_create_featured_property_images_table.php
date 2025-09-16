<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('featured_property_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('featured_property_id')->constrained('featured_properties')->cascadeOnDelete();
            $table->foreignId('image_id')->constrained('images')->cascadeOnDelete();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();

            $table->unique(['featured_property_id', 'image_id']);
            $table->index(['featured_property_id', 'position']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('featured_property_images');
    }
};

