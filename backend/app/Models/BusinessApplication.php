<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * A BusinessApplication represents a funding request from a small business
 * owner. Each application belongs to a user with a role of 'business_owner'.
 */
class BusinessApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'description',
        'category',
        'revenue',
        'profit',
        'funding_amount',
        'pitch_deck',
        'status',
    ];

    /**
     * The business application belongs to a user (the business owner).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Approved applications may have many investments from investors.
     */
    public function investments()
    {
        return $this->hasMany(Investment::class, 'application_id');
    }
}