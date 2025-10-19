<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'funding_amount',
        'status',
        'user_id', // assuming a business belongs to a user (owner)
    ];

    // Relationship: Business belongs to a User
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
