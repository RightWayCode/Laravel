<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tags extends Model
{
    //
    protected $fillable = [
        'tag',
        "product_id"
    ];
    protected $hidden=[
        'id', 'product_id'
    ];
    public $timestamps = false; // ✅ Prevent Laravel from inserting created_at & updated_at
    public function product(){
        return $this->BelongsTo(Product::class);
    }
}
