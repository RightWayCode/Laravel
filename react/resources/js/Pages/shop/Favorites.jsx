import { Heart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import GuestLayout from "@/Layouts/Front/Layout";
import { Link, router, usePage } from "@inertiajs/react";

const Favorites = ({ favorites }) => {
  const { isAdded } = useCart();
  const { flash } = usePage().props;
  console.log("favorites:", favorites);
  console.log("flash:", flash);

  const toggleFavorite = (id) => {
    router.post(route('favorites.toggle', {
      productId: id,

    }))
  }
  const moveToCart = (id) => {
    router.post(route('favorites.move', {
      product_id: id,
      quantity: 1
    }))
  }

  return (
    <GuestLayout>

      <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-50 to-white">
        <div className="container mx-auto">
          <h2 className="flex items-center gap-3 mb-10 text-4xl font-extrabold tracking-tight text-indigo-700">
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            Your Favorites
          </h2>

          {favorites.length === 0 ? (
            <div className="py-20 text-xl text-center text-gray-400">
              <p>You haven’t added any favorites yet.</p>
              <p className="mt-2 text-sm text-gray-500">Start browsing and click the heart icon to save items you love!</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorites.map((item) => (
                <div key={item.product_id} className="relative p-4 transition-shadow duration-300 bg-white shadow group rounded-2xl hover:shadow-xl">
                  <Link
                    href={route('product.show', {
                      category: item.product?.category?.slug ?? "",
                      brand: item.product.brand,
                      title: item.product.name,
                      id: item.product.id
                    })}
                    className="block"
                  >
                    <img
                      src={item.product.images[0].image_path}
                      alt={item.product.name}
                      className="object-cover w-full h-48 mb-3 transition-transform duration-300 rounded-xl group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.product.name}</h4>
                      <p className="mt-1 font-medium text-indigo-600">${item.product.price}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(item.product_id)}
                      className="text-red-500 transition-colors hover:text-red-700"
                      title="Remove from Favorites"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => moveToCart(item.product_id)}
                    disabled={isAdded(item.product_id)}
                    className="w-full py-2 mt-5 text-sm font-semibold text-white transition-colors duration-300 bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </GuestLayout>
  );
};

export default Favorites;
