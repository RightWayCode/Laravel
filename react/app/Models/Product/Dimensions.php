<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Dimensions extends Model
{
    //

    protected $fillable = [
        'product_id',
        'name',
        'value'
    ];
    public $timestamps = false; // ✅ Prevent Laravel from inserting created_at & updated_at

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
