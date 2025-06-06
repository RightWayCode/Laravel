import Dashboard from '@/Layouts/Dashboard';
import { Link, usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function OrderList() {
    const { auth } = usePage().props;
    const orders = useRef(auth?.orders);

    return (
        <Dashboard>
            <div className="max-w-4xl mx-auto">
                <h1 className="mb-4 text-2xl font-bold">My Orders</h1>

                {orders.current.length === 0 ? (
                    <p className="text-gray-500">No orders yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.current.map(order => (
                            <li key={order.id} className="p-4 border rounded shadow-sm">
                                <div key={order.id} className="p-4 mb-4 bg-white shadow rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm">Order ID: <b>{order.purchased_id}</b></p>
                                            <p className="text-xs text-gray-500">Purchased: {new Date(order.updated_at).toLocaleString()}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded ${order.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {order.items.map(item => (
                                            <Link href={item.product_url} key={item.id} className="flex gap-4 p-2 border rounded">
                                                <img src={item.product.images[0].image_path ?? '/placeholder.png'} alt={item.product.name} className="object-cover w-16 h-16 rounded" />
                                                <div>
                                                    <h3 className="text-sm font-semibold">{item.product.name}</h3>
                                                    <p className="text-xs text-gray-500">Brand: {item.product.brand}</p>
                                                    <p className="text-xs">Qty: {item.quantity} | ₹{item.total}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-sm font-medium">Total: ₹{order.total_amount}</p>
                                        <div className="flex gap-2">
                                            <button className="text-sm text-blue-600 hover:underline">View Invoice</button>
                                            <button className="text-sm text-green-600 hover:underline">Reorder</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Dashboard>
    );
}