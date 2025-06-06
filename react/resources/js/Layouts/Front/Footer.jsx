import { Link } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="px-4 pt-10 pb-6 text-white bg-gray-900 md:px-8">
      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-4">

        {/* Logo & Description */}
        <div>
          <Link to="/" className="text-2xl font-bold text-white">
            🧥 Clothify
          </Link>
          <p className="mt-2 text-sm text-gray-400">
            Elevate your style with our curated fashion collections. Trendy, sustainable, and affordable.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-300"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="mb-3 text-lg font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/shop" className="hover:text-white">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link to="/favorites" className="hover:text-white">Favorites</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="mb-3 text-lg font-semibold">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/faqs" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/policy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-3 text-lg font-semibold">Newsletter</h4>
          <p className="mb-2 text-sm text-gray-400">
            Get exclusive offers & news in your inbox.
          </p>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm text-white placeholder-gray-400 bg-gray-800 rounded focus:outline-none"
            />
            <button type="submit" className="px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded hover:bg-gray-200">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-4 mt-10 text-sm text-center text-gray-500 border-t border-gray-700">
        &copy; 2025 Clothify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;