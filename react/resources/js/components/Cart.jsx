import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'Classic White Blouse',
    price: 46.95,
    image: 'https://assets.ajio.com/medias/sys_master/root/20250206/Zefi/67a4d179bc78b543a9290fb3/-473Wx593H-466833334-white-MODEL.jpg',
    brand: 'Zara',
    sizes: ['S', 'M', 'L'],
    colors: ['White'],
    rating: 4.3,
    category: 'Women',
    description: 'Elegant white blouse perfect for work or casual wear.',
  },
  {
    id: 2,
    title: 'Denim Shirt Jacket',
    price: 93.85,
    image: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/21246872/2024/5/10/5f0d10eb-76c8-4758-baec-8680c4da980c1715323099540-The-Souled-Store-Women-Striped-Cotton-Casual-Shirt-338171532-6.jpg',
    brand: 'Levi’s',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue'],
    rating: 4.6,
    category: 'Women',
    description: 'A relaxed-fit denim shirt jacket with long sleeves.',
  },
  {
    id: 3,
    title: 'Striped Office Shirt',
    price: 110.16,
    image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/2/w/3/m-ss23sqartha02-blk-wht-style-quotient-original-imagnz3ukkywyypa.jpeg?q=20&crop=false',
    brand: 'H&M',
    sizes: ['M', 'L'],
    colors: ['Black', 'White'],
    rating: 4.2,
    category: 'Women',
    description: 'A stylish striped shirt ideal for a smart look.',
  },
  {
    id: 4,
    title: 'Button-Front Blouse',
    price: 40.57,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHUkbA-Uu1Y7UW6OPGEPyGhO4EpkON31Jxg&s',
    brand: 'Uniqlo',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White'],
    rating: 4.0,
    category: 'Women',
    description: 'Lightweight button-up blouse with gold accents.',
  },
  {
    id: 5,
    title: 'Green Casual Shirt',
    price: 83.43,
    image: 'https://tigc.in/cdn/shop/files/compress_0620-sh44-1-emerald-green__1.jpg?v=1720764778',
    brand: 'Allen Solly',
    sizes: ['M', 'L', 'XL'],
    colors: ['Green'],
    rating: 4.1,
    category: 'Men',
    description: 'Relaxed-fit casual shirt for weekends and outings.',
  },
  {
    id: 6,
    title: 'Smart Linen Shirt',
    price: 90.86,
    image: 'https://uspoloassn.in/cdn/shop/files/TOPWEARPDP_460d692f-e9ac-4288-990c-078f08febda6.jpg',
    brand: 'Raymond',
    sizes: ['M', 'L'],
    colors: ['White'],
    rating: 4.4,
    category: 'Men',
    description: 'Premium linen shirt for summer comfort.',
  },
  {
    id: 7,
    title: 'Checked Cotton Shirt',
    price: 24.57,
    image: 'https://www.montecarlo.in/cdn/shop/files/2240401115FS-2-38_6.jpg?v=1721816536',
    brand: 'Peter England',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue'],
    rating: 4.0,
    category: 'Men',
    description: 'Everyday wear with a smart checked pattern.',
  },
  {
    id: 8,
    title: 'Formal Teal Shirt',
    price: 73.40,
    image: 'https://fcity.in/images/products/188770227/ilnll_512.jpg',
    brand: 'Van Heusen',
    sizes: ['M', 'L', 'XL'],
    colors: ['Teal'],
    rating: 4.7,
    category: 'Men',
    description: 'Teal shirt designed for business or evening occasions.',
  },
];

export function Cart() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 }];
    });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]));
  };

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">New Arrivals</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >
            <div className="relative">
              <img src={p.image} alt={p.title} className="w-full h-72 object-cover" />
              <button
                onClick={() => toggleFavorite(p.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full text-pink-500 hover:text-pink-600 shadow"
              >
                <Heart fill={favorites.includes(p.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.brand} · {p.category}</p>
              <p className="text-indigo-600 font-bold">${p.price.toFixed(2)}</p>
              <p className="text-sm text-gray-400">Sizes: {p.sizes.join(', ')}</p>
              <p className="text-sm text-yellow-500">⭐ {p.rating.toFixed(1)}</p>
              <button
                onClick={() => addToCart(p)}
                className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Display (for development/testing) */}
      {cart.length > 0 && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Cart</h3>
          <ul className="space-y-3">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} className="w-12 h-12 object-cover rounded-md" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-indigo-600">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
