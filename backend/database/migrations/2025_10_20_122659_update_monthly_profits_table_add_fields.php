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
    Schema::table('monthly_profits', function (Blueprint $table) {
        // ✅ Only add columns that don't already exist
        if (!Schema::hasColumn('monthly_profits', 'platform_fee_amount')) {
            $table->decimal('platform_fee_amount', 10, 2)->nullable()->after('profit_amount');
        }

        if (!Schema::hasColumn('monthly_profits', 'owner_share_amount')) {
            $table->decimal('owner_share_amount', 10, 2)->nullable()->after('platform_fee_amount');
        }

        if (!Schema::hasColumn('monthly_profits', 'remarks')) {
            $table->text('remarks')->nullable()->after('status');
        }
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('monthly_profits', function (Blueprint $table) {
        $table->dropColumn(['platform_fee_amount','owner_share_amount','remarks']);
    });
}

};
