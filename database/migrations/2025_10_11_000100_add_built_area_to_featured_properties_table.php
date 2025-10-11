<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('featured_properties', function (Blueprint $table) {
            $table->string('built_area')->nullable()->after('area');
        });
    }

    public function down(): void
    {
        Schema::table('featured_properties', function (Blueprint $table) {
            $table->dropColumn('built_area');
        });
    }
};

