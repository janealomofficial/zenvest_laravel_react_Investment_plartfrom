<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

// Import JWTSubject contract so we can return token identifiers and claims.
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

// Import related models for relationships. These imports are not strictly
// required because Laravel can resolve them via the global namespace, but
// importing them explicitly helps IDEs and static analysers.
use App\Models\BusinessApplication;
use App\Models\Investment;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        // role is used to determine what permissions a user has. Valid
        // values include 'admin', 'investor' and 'business_owner'.
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Relationship: a business owner can have many applications.
     */
    public function applications()
    {
        return $this->hasMany(BusinessApplication::class);
    }

    /**
     * Relationship: an investor can have many investments.
     */
    public function investments()
    {
        return $this->hasMany(Investment::class, 'investor_id');
    }
}
