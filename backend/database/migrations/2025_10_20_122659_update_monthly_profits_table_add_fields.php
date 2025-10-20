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
        Schema::table('monthly_profits', function (Blueprint $table) {
            $table->unsignedBigInteger('business_id')->nullable()->after('id');
            $table->integer('year')->nullable()->after('month');
            $table->string('proof_file')->nullable()->after('platform_fee_amount');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->after('proof_file');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('monthly_profits', function (Blueprint $table) {
            $table->dropColumn(['business_id', 'year', 'proof_file', 'status']);
        });
    }
};
