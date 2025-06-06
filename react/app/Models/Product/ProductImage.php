<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    //

    protected $fillable = [
        'product_id',
        'image_path',
        'is_main',
    ];

    protected $hidden = [
        "id",
        "product_id"
    ];
    
    public $timestamps = false; // ✅ Prevent Laravel from inserting created_at & updated_at

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
