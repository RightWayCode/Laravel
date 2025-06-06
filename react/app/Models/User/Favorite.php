<?php

namespace App\Models\User;

use App\Models\Product\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
    ];
    protected $hidden = [
        "created_at",
        "updated_at"
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
