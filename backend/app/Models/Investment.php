<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    use HasFactory;

    protected $fillable = [
        'investor_id',
        'application_id',
        'business_id',
        'amount',
        'investment_date',
        'status',
        'profit',
    ];

    public function investor()
    {
        return $this->belongsTo(User::class, 'investor_id');
    }

    public function business()
    {
        return $this->belongsTo(Business::class, 'business_id');
    }

    public function application()
    {
        return $this->belongsTo(BusinessApplication::class, 'application_id');
    }
}
