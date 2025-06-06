<?php

namespace App\Models\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'avatar',
        'birthdate',
        'address',
        'city',
        'state',
        'country',
        'bio',
    ];
    protected $hidden = [
        "created_at",
        "updated_at"
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
