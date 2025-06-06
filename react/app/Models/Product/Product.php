<?php

namespace App\Models\Product;

use App\Models\User\OrderItem;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'discount',
        'stock',
        'category_id',
        'is_active',
        "sku",
        "warrantyInformation",
        "brand",
        "shippingInformation",
        "returnPolicy",
        "minimumOrderQuantity"
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    // zarurat nahi hai
    // public function item(){
    //     return $this->belongsTo(OrderItem::class);
    // }

    public function dimensions(){
        return $this->hasMany(Dimensions::class);
    }
    public function tags(){
        return $this->hasMany(Tags::class);
    }
}
