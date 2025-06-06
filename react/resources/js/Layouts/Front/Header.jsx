import React, { useState } from 'react';
import { FiHeart, FiLogIn, FiLogOut, FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { SearchBar } from '@/components/SearchBar';
import { Link, usePage } from '@inertiajs/react';
const Header = () => {
    const { auth } = usePage().props;
    console.warn("auth Problem:", auth);
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const Links = (
        <>
            <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About Us</Link>
            <Link href="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contact</Link>
        </>
    );
    const authLinks = (
        <>
            <Link href={route("favorites.index")} className="flex items-center gap-2 text-gray-600 hover:text-red-600" title="Favorites">
                <FiHeart className="w-5 h-5" /> <span className='inline md:hidden'> Favorites</span>
            </Link>
            <Link href={route('cart.index')} className="flex items-center gap-2 text-gray-600 hover:text-black" title="Cart">
                <FiShoppingCart className="w-5 h-5" /> <span className='inline md:hidden'>Carts</span>
            </Link>
        </>
    );

    return (
        <>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container flex items-center justify-between gap-4 p-4 mx-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                        🧥 <span className='hidden md:inline'>Clothify</span>
                    </Link>

                    {/* Search */}
                    <SearchBar />

                    {/* Actions */}
                    <div className="items-center hidden space-x-4 md:flex">
                        {authLinks}

                        {auth.user ? (
                            <div className="relative">
                                <Link href={route("Overview")} className="block px-4 py-2 text-sm"><FaUserCircle className="w-6 h-6" /></Link>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="items-center hidden gap-1 text-gray-600 md:flex hover:text-black">
                                    <FiLogIn className="w-5 h-5" /> Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="text-gray-700 md:hidden focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>

                </div>
            </header>

            {/* Sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={() => setSidebarOpen(false)} className="text-gray-600">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                {auth.user && (
                    <div className="p-4 px-4 space-y-2 border-b">
                        <Link href={route('Overview')} className="flex items-center gap-2 text-sm text-gray-700 hover:underline"><FaUserCircle className="w-5 h-5" />Dashboard</Link>
                        {authLinks}
                    </div>
                )}
                <nav className="py-2">{Links}</nav>

                {!auth.user && (
                    <div className="px-4 pt-4 space-y-2 border-t">
                        <Link href="/login" className="block text-sm text-gray-700 hover:underline">Login</Link>
                    </div>
                )}
            </aside>
        </>
    );
};

export default Header;
