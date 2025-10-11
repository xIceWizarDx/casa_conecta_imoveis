<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('hero_slides', function (Blueprint $table) {
            // Drop existing foreign key to alter column
            try { $table->dropForeign(['image_id']); } catch (\Throwable $e) {}
        });

        Schema::table('hero_slides', function (Blueprint $table) {
            // Make column nullable (requires doctrine/dbal for change on some DBs)
            $table->unsignedBigInteger('image_id')->nullable()->change();
        });

        Schema::table('hero_slides', function (Blueprint $table) {
            // Re-add foreign key with null on delete
            $table->foreign('image_id')->references('id')->on('images')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('hero_slides', function (Blueprint $table) {
            try { $table->dropForeign(['image_id']); } catch (\Throwable $e) {}
        });

        Schema::table('hero_slides', function (Blueprint $table) {
            $table->unsignedBigInteger('image_id')->nullable(false)->change();
        });

        Schema::table('hero_slides', function (Blueprint $table) {
            $table->foreign('image_id')->references('id')->on('images')->cascadeOnDelete();
        });
    }
};

