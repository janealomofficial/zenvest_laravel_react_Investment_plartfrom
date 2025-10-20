<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('monthly_profits', function (Blueprint $table) {
            if (!Schema::hasColumn('monthly_profits', 'business_id')) {
                $table->unsignedBigInteger('business_id')->nullable()->after('id');
            }
            if (!Schema::hasColumn('monthly_profits', 'year')) {
                $table->integer('year')->nullable()->after('month');
            }
            if (!Schema::hasColumn('monthly_profits', 'proof_file')) {
                $table->string('proof_file')->nullable()->after('platform_fee_amount');
            }
            if (!Schema::hasColumn('monthly_profits', 'status')) {
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->after('proof_file');
            }
        });
    }

    public function down()
    {
        Schema::table('monthly_profits', function (Blueprint $table) {
            $table->dropColumn(['business_id', 'year', 'proof_file', 'status']);
        });
    }
};
