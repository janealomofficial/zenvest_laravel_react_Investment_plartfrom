<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlyProfit extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id',
        'month',
        'year',
        'profit_amount',
        'platform_fee_amount',
        'owner_share_amount',
        'proof_file',
        'status',
        'remarks',
        'approved_at', // Add this field if you use timestamps for approval
    ];

    /**
     * Relationship: A monthly profit belongs to one business.
     */
    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    /**
     * Relationship: A monthly profit can generate many investor profits.
     */
    public function investorProfits()
    {
        return $this->hasMany(InvestorProfit::class, 'monthly_profit_id');
    }
}
