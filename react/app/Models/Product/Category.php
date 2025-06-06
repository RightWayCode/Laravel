<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = [
        "name",
        "slug",
        "parent_id",
    ];

    protected $hidden = [
        "created_at",
        "updated_at",
        "parent_id",
    ];


    public function products()
    {
        return $this->hasMany(Product::class)->with('category');
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function parentRecursive()
    {
        return $this->parent()->with('parentRecursive');
    }

    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }
}
