import GuestLayout from "@/Layouts/Front/Layout";
import { useCart } from "@/context/CartContext";
import { Link, router, usePage } from "@inertiajs/react";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";

const Cart = ({ cart }) => {
  const { updateCartQuantity, removeFromCart } = useCart();
  // console.log(cart);
  // updateCartQuantity()
  const { auth } = usePage().props;
  console.log(auth);

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const handleCarts = (id, quantity = 1) => {
    router.post(route("cart.store", {
      product_id: id,
      quantity
    }))
  };

  const deleteCart = (id) => {
    router.delete(route("cart.destroy", {
      productId: id
    }))
  }

  // Buy now button handler
  const buyNow = (order) => {
    // console.log("order:",order);
    // return;
    router.post(route("payment.pay"),  {order} , { preserveState: true });
  };

  return (
    <GuestLayout>
      <div className="min-h-screen px-4 py-10 bg-gray-50">
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Shopping Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is currently empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center p-4 transition bg-white shadow-sm rounded-xl hover:shadow-md"
                >
                  <Link href={route('product.show', {
                    category: item.product?.category?.slug ?? "",
                    brand: item.product.brand,
                    title: item.product.name,
                    id: item.product.id
                  })}>
                    <img src={item.product.images[0].image_path} alt={item.product.name} className="object-cover w-24 h-24 border rounded-lg" />
                  </Link>
                  <div className="flex-1 ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{item.product.name}</h4>
                    <p className="mt-1 text-gray-500">${item.product.price}</p>
                    <div className="flex items-center mt-3 space-x-2">
                      <button
                        onClick={() => item.quantity === 1 ? deleteCart(item.product_id) : handleCarts(item.product_id, -1)}
                        className="px-2 py-1 bg-gray-100 border rounded-md hover:bg-gray-200">
                        {item.quantity === 1 ? <FaTrashAlt /> : <FaMinus className="w-4 h-4" />}
                      </button>
                      <span className="px-3 py-1 text-gray-700 bg-white border rounded">{item.quantity}</span>
                      <button
                        onClick={() => handleCarts(item.product_id)}
                        className="px-2 py-1 bg-gray-100 border rounded-md hover:bg-gray-200">
                        <FaPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="ml-4 space-y-2 text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button onClick={() => deleteCart(item.product_id)} className="text-red-500 transition hover:text-red-700" title="Remove item">
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Section */}
          <div className="p-6 bg-white shadow-md rounded-xl h-fit">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                let total_amount = 0;
                const products = cart.map(item => {
                  var total = item.product.price * item.quantity;
                  total_amount += total;
                  return {
                    id: item.product_id,
                    quantity: item.quantity,
                    price: item.product.price,
                    product_url: window.location.href,
                    total
                  }
                })
                let productList = {
                  name: auth?.profile?.name,
                  email: auth?.profile?.email,
                  total_amount,
                  products
                };
                buyNow(productList);
              }}
              disabled={cart.length === 0} className={`mt-6 w-full py-3 rounded-lg font-medium transition text-white ${cart.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Cart;
