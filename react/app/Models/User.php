<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\User\AddToCart;
use App\Models\User\Favorite;
use App\Models\User\Order;
use App\Models\User\Review;
use App\Models\User\UserProfile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }


    public function cart(){
        return $this->hasMany(AddToCart::class);
    }
    public function favorites(){
        return $this->hasMany(Favorite::class);
    }
    public function profile(){
        return $this->hasOne(UserProfile::class);
    }
    public function reviews(){
        return $this->hasMany(Review::class);
    }
    public function orders(){
        return $this->hasMany(Order::class);
    }
}
