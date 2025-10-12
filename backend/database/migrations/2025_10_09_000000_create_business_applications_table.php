<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('business_applications', function (Blueprint $table) {
            $table->id();
            // The user who submitted this application. References the users table.
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('business_name');
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->decimal('revenue', 15, 2)->nullable();
            $table->decimal('profit', 15, 2)->nullable();
            $table->decimal('funding_amount', 15, 2);
            // Store the uploaded pitch deck filename. The file itself will live in storage/app/pitch_decks
            $table->string('pitch_deck')->nullable();
            // Application status: pending, approved, or rejected
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_applications');
    }
};