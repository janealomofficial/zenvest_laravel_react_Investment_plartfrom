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
        'proof_file',
        'status', // pending, approved, rejected
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
