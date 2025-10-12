<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * An Investment records that an investor has funded a particular application.
 */
class Investment extends Model
{
    use HasFactory;

    protected $fillable = [
        'investor_id',
        'application_id',
        'amount',
        'investment_date',
        'status',
        'profit',
    ];

    /**
     * The investor who made this investment.
     */
    public function investor()
    {
        return $this->belongsTo(User::class, 'investor_id');
    }

    /**
     * The application this investment funds.
     */
    public function application()
    {
        return $this->belongsTo(BusinessApplication::class, 'application_id');
    }
}