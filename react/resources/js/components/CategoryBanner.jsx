import { Link } from '@inertiajs/react';
import React from 'react';


const categories = [
  {
    name: 'Men',
    image: 'https://i.pinimg.com/736x/b0/5e/4f/b05e4fbfcc1671045714c87f650d5cc3.jpg',
    link: '/men',
  },
  {
    name: 'Women',
    image: 'https://s.alicdn.com/@sc04/kf/H7101c757870c4010a4b751b75517b993w.jpg_720x720q50.jpg',
    link: '/women',
  },
  {
    name: 'Accessories',
    image: 'https://cdn.notonthehighstreet.com/fs/8f/58/dca5-3f0d-4510-a290-1c52e42595e9/preview_personalised-star-shoulder-shopper.jpg',
    link: '/accessories',
  },
  {
    name: 'Boys',
    image: 'https://i.etsystatic.com/11463421/r/il/2007e2/3546997770/il_fullxfull.3546997770_6da9.jpg',
    link: '/boys',
  },
  {
    name: 'Girls',
    image: 'https://5.imimg.com/data5/BR/VN/RO/ANDROID-5045267/product-jpeg-500x500.jpg',
    link: '/girls',
  },
  {
    name: 'Babies',
    image: 'https://i.etsystatic.com/9170477/r/il/86d30b/3632967475/il_570xN.3632967475_qjw6.jpg',
    link: '/babies',
  },
];

export function CategoryBanner() {
  return (
    <section className="px-4 py-16 mx-auto max-w-7xl">
      <h2 className="mb-10 text-3xl font-bold text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            href={category.link}
            key={category.name}
            className="relative overflow-hidden transition duration-300 shadow-lg group rounded-xl hover:shadow-2xl"
          >
            <img
              src={category.image}
              alt={category.name}
              className="object-cover w-full transition duration-500 ease-in-out transform h-72 group-hover:scale-110"
            />
            <div className="absolute inset-0 transition duration-300 bg-black opacity-40 group-hover:bg-opacity-60"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white backdrop-blur-sm bg-black/30 rounded-xl">
              <h3 className="text-2xl font-bold drop-shadow">{category.name}</h3>
              <p className="mt-1 text-sm text-gray-200 drop-shadow-sm">
                Explore latest {category.name.toLowerCase()} fashion
              </p>
              <button className="px-5 py-2 mt-4 text-sm font-medium text-black transition bg-white rounded-full shadow hover:bg-indigo-700 hover:text-white">
                Shop Now →
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
