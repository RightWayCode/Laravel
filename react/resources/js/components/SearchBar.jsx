import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { router } from "@inertiajs/react"; // ✅ use Inertia router

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.get(`/${searchTerm.trim().replace(/\s+/g, '-')}`, {}, { preserveState: true });
      setSearchTerm('');
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative flex-grow max-w-md"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 pl-10 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
      />
      <FiSearch className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2" />
    </form>
  );
};
