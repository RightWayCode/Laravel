<?php

namespace App\Models\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'comment',
    ];
    protected $hidden = [
        "created_at",
        "updated_at"
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
