import { FaShippingFast } from 'react-icons/fa';

const PromoBanner = () => {
  return (
    <div className="px-4 py-3 text-center text-white bg-gradient-to-r from-indigo-700 to-purple-700">
      <div className="flex items-center justify-center gap-3 text-sm font-medium sm:text-base">
        <FaShippingFast className="text-lg text-white animate-pulse" />
        <span>Free Shipping on Orders Over $50!</span>
      </div>
    </div>
  );
};

export default PromoBanner;
