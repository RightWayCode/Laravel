import React from 'react';
import { NavLink } from 'react-router-dom';

const categories = [
    {
        id: 1,
        name: 'Men',
        image: '/images/categories/men.jpg',
        slug: 'men'
    },
    {
        id: 2,
        name: 'Women',
        image: '/images/categories/women.jpg',
        slug: 'women'
    },
    {
        id: 3,
        name: 'Kids',
        image: '/images/categories/kids.jpg',
        slug: 'kids'
    },
    {
        id: 4,
        name: 'Accessories',
        image: '/images/categories/accessories.jpg',
        slug: 'accessories'
    },
    {
        id: 5,
        name: 'Footwear',
        image: '/images/categories/footwear.jpg',
        slug: 'footwear'
    },
    {
        id: 6,
        name: 'New Arrivals',
        image: '/images/categories/new.jpg',
        slug: 'new-arrivals'
    }
];

const Categories = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-6 pb-12">
            {/* Hero Section */}
            <section className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Shop by Category</h1>
                <p className="mt-2 text-gray-500">Discover outfits tailored to your style and needs.</p>
            </section>

            {/* Categories Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <NavLink
                            to={`/category/${category.slug}`}
                            key={category.id}
                            className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-black">{category.name}</h2>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;