<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestorProfit extends Model
{
    use HasFactory;

    protected $fillable = [
        'investor_id',
        'business_id',
        'monthly_profit_id',
        'amount',
        'status',
        'month',
        'year',
    ];

    /**
     * Relationship: Each profit belongs to an investor (user)
     */
    public function investor()
    {
        return $this->belongsTo(User::class, 'investor_id');
    }

    /**
     * Relationship: Each profit belongs to a business
     */
    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    /**
     * Relationship: Each profit is tied to one monthly profit submission
     */
    public function monthlyProfit()
    {
        return $this->belongsTo(MonthlyProfit::class, 'monthly_profit_id');
    }
}
