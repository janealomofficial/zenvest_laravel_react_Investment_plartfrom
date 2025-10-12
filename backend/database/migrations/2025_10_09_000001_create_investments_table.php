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
        Schema::create('investments', function (Blueprint $table) {
            $table->id();
            // References the investor who made this investment. Note that only users
            // with a role of 'investor' should create investments.
            $table->foreignId('investor_id')->constrained('users')->onDelete('cascade');
            // References the business application being funded.
            $table->foreignId('application_id')->constrained('business_applications')->onDelete('cascade');
            $table->decimal('amount', 15, 2);
            $table->date('investment_date');
            // The status of the investment: e.g. active, completed, cancelled.
            $table->string('status')->default('active');
            // Recorded profit or returns for this investment. Nullable until realized.
            $table->decimal('profit', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investments');
    }
};