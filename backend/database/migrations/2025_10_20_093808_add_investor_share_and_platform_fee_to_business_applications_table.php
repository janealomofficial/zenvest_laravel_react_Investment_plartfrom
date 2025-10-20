<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('business_applications', function (Blueprint $table) {
            $table->decimal('investor_share', 5, 2)->default(0); // percentage the business owner gives to investor
            $table->decimal('platform_fee', 5, 2)->default(2.00); // small % admin earns on every profit
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('business_applications', function (Blueprint $table) {
            $table->dropColumn(['investor_share', 'platform_fee']);
        });
    }
};
