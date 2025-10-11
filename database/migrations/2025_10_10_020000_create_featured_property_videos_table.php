<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('featured_property_videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('featured_property_id')->constrained()->cascadeOnDelete();
            $table->foreignId('video_id')->constrained('videos')->cascadeOnDelete();
            $table->unsignedInteger('position')->default(1);
            $table->timestamps();
            $table->unique(['featured_property_id', 'video_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('featured_property_videos');
    }
};

