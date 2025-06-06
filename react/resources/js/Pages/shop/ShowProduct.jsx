import GuestLayout from '@/Layouts/Front/Layout';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
// 5267 3181 8797 5449	
const ShowProduct = ({ product, user_carts }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0].image_path);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
  const { auth } = usePage().props;
  // console.log("user_carts:", auth);
  const [isAdded, setIsAdded] = useState(() => auth.cart.some(val => val === product.id));
  const [isFavorite, setIsFavorite] = useState(() => auth.favorites.some(val => val === product.id));
  useEffect(() => {
    setIsAdded(() => auth.cart.some(val => val === product.id));
    setIsFavorite(() => auth.favorites.some(val => val === product.id));
  }, [auth])

  const addToCart = () => {
    router.post(route('cart.store'), {
      product_id: product.id,
      quantity: quantity,
    });
  };

  const toggleFavorite = () => {
    router.post(route('favorites.toggle', product.id));
  };

  // Buy now button handler
  const buyNow = (product, quantity) => {
    const order = {
      name: auth?.user?.name,
      email: auth.user.email,
      total_amount: product.price * 84,
      products: [
        {
          id: product.id,
          quantity,
          price: product.price,
          product_url: window.location.href,
          total: product.price
        }
      ]

    }
    product["quantity"] = quantity;
    product["product_url"] = window.location.href;
    router.post(route("payment.pay"), { order }, { preserveState: true });
  };

  window.addEventListener("resize", () => {
    setIsDesktop(window.innerWidth >= 769);
  })
  if (!product) return <div className="p-6 text-center text-red-600">Product not found</div>;

  return (
    <GuestLayout>
      <div className="p-2 py-10 mx-auto sm:px-4 max-w-7xl">
        {/* Breadcrumb Navigation */}

        {isDesktop && (
          <nav className="mb-6 text-gray-500">
            <ol className="flex text-sm list-reset">
              <li>
                <Link href="/" className="hover:text-indigo-600">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href={`/${product.category.name}`} className="hover:text-indigo-600">{product.category.name}</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-800">{product.name}</li>
            </ol>
          </nav>
        )}

        {/* Product Main Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Image Gallery */}
          <div>
            <div className="relative group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full min-h-[350px] object-cover rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105"
              />
              <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-300 bg-black opacity-30 group-hover:opacity-50"></div>
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <span className="text-2xl text-white">Click to Zoom</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {(product.images).map((img, i) => (
                <img
                  key={i}
                  src={img.image_path}
                  alt={`${product.name} image ${i + 1}`}
                  onClick={() => setSelectedImage(img.image_path)}
                  className={`w-20 h-20 object-cover rounded border cursor-pointer transition-transform transform hover:scale-105 ${img === selectedImage ? 'ring-2 ring-indigo-500' : ''
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-5">
            <h1 className="text-3xl font-bold">{product.brand}</h1>
            <p className="text-gray-600 text-md">{product.name}</p>
            <p className="text-xl font-semibold text-indigo-600">${product.price}</p>

            <div className="flex items-center gap-2 text-lg text-yellow-500">
              {'★'.repeat(Math.floor(product.rating || 4))}
              <span className="ml-1 text-sm text-gray-600">
                ({product.reviewsCount || 89} reviews)
              </span>
            </div>

            <p className="text-gray-700">{product.description}</p>

            {/* Availability */}
            <div>
              <span className="font-semibold">Availability:</span>{' '}
              {product.stock ? (
                <span className="font-medium text-green-600">In Stock</span>
              ) : (
                <span className="font-medium text-red-600">Out of Stock</span>
              )}
            </div>

            {/* Sizes */}
            {product.size?.length > 0 && (
              <div>
                <span className="font-semibold">Sizes:</span>
                <div className="flex gap-2 mt-1">
                  {product.size.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 border rounded cursor-pointer hover:bg-indigo-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="font-semibold">Colors:</span>
                {product.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 border border-gray-300 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="w-full sm:w-auto">
              <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center overflow-hidden border rounded-md w-fit">
                <button
                  type="button"
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                  onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
                >
                  –
                </button>
                <input
                  type="text"
                  min={1}
                  id="quantity"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-12 py-1 text-center border-gray-200 outline-none border-x"
                />
                <button
                  type="button"
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <button
                onClick={addToCart} disabled={isAdded ? 'disabled' : ''}
                className="w-full px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-md sm:w-auto hover:bg-indigo-700 disabled:opacity-50"
              >
                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={() => buyNow(product, quantity)}
                className="w-full px-6 py-3 font-medium text-white transition bg-green-600 rounded-md sm:w-auto hover:bg-green-700 disabled:opacity-50"
              >
                Buy Now
              </button>

              {/* Wishlist */}
              <button
                onClick={toggleFavorite}
                className="w-full px-6 py-3 font-medium text-indigo-600 transition border border-indigo-600 rounded-md sm:w-auto hover:bg-indigo-50"
              >
                {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
              </button>
            </div>
          </div>
        </div>

        {/* Product Highlights Section */}
        <div className="p-6 mt-8 rounded-lg shadow bg-indigo-50">
          <h2 className="mb-4 text-2xl font-bold">Product Highlights</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>Premium quality materials used</li>
            <li>Free shipping on all orders</li>
            <li>Eco-friendly packaging</li>
            <li>Customizable sizes and colors</li>
            <li>Exclusive design for limited-time release</li>
          </ul>
        </div>


        {/* Offers */}
        <div className="mt-6">
          <h3 className="mb-2 font-bold">Available Offers:</h3>
          <ul className="space-y-1 text-gray-700 list-disc list-inside">
            <li>10% Instant Discount with XYZ Bank Cards</li>
            <li>Get extra 5% off on orders above $100</li>
            <li>Free shipping on your first order</li>
          </ul>
        </div>

        {/* About Product Section */}
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Product Details</h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            {product.about || 'No additional details available for this product.'}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="font-semibold">Seller:</span> {product.seller || 'Official Store'}
            </div>
            <div>
              <span className="font-semibold">Country of Origin:</span>{' '}
              {product.origin || 'India'}
            </div>
            <div>
              <span className="font-semibold">Warranty Information:</span>{' '}
              {product.warrantyInformation}
            </div>
            <div>
              <span className="font-semibold">Total Stock:</span>{' '}
              {product.stock}
            </div>
            <div>
              <span className="font-semibold">Return Policy:</span>{' '}
              {product.returnPolicy}
            </div>
            <div>
              <span className="font-semibold">Shipping Information:</span>{' '}
              {product.shippingInformation}
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Customer Reviews</h2>
          {(product.reviews || []).length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, i) => (
                <div key={i} className="p-4 border rounded shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.user}</span>
                    <span className="text-sm text-yellow-500">
                      {'★'.repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </GuestLayout>
  );
};

export default ShowProduct;