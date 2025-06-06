import Pagination from '@/components/Pegination';
import GuestLayout from '@/Layouts/Front/Layout';
import { Link, router } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

export default function ShopPage({ productsData, filters, filtered }) {
  const [showAside, setShowAside] = useState(typeof window !== 'undefined' && window.innerWidth >= 769);
  const [filterState, setFilterState] = useState(() => getFilterValue(filters, filtered.filter));
  const [changeSort, serChangeSort] = useState(filtered.sort)
  const filterStore = useRef(filterState);
  const sortBy = useRef(changeSort);
  const products = productsData.data;
  const search = filtered.search;

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => setShowAside(window.innerWidth >= 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update filters on checkbox change
  const onFilterChange = async (index, type) => {
    const updatefilter = (prev) => {
      const updated = { ...prev };
      updated[type] = updated[type].map((item, i) => (
        i === index ? { ...item, is_active: !item.is_active } : item
      ));
      return updated;
    }
    setFilterState(pre => updatefilter(pre));
    filterStore.current = updatefilter(filterStore.current);
    runFilter()
  };
  // Update sort method
  const onSortChange = (value) => {
    serChangeSort(value)
    sortBy.current = value;
    runFilter()
  };

  const query = () => {
    let query = {};
    let sort = sortBy.current;
    const composedFilters = composeQueryFilters(filterStore.current);
    let f = arrayToString(composedFilters);
    if (f !== '') {
      query.f = f;
    }
    if (sort !== 'latest') {
      query.sort = sort;
    }
    return query;
  }

  const runFilter = () => {
    router.get(route('shop', { search }), query(), { preserveState: true })
  }
  // Compose and send query to backend whenever filters or sortBy changes

  return (
    <GuestLayout>
      <div className='min-h-screen bg-gray-50'>
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          {showAside && (
            <aside className="sticky top-0 w-full h-auto p-6 bg-white border-r select-none md:w-60 md:h-screen">
              <h2 className="mb-6 text-2xl font-bold">Filters</h2>
              <FilterSection title="Category" data={filterState.categories} type="categories" onFilterChange={onFilterChange} />
              <FilterSection title="Brand" data={filterState.brands} type="brands" onFilterChange={onFilterChange} />
            </aside>
          )}

          {/* Main Section */}
          <main className="flex-1 p-2 sm:p-6">
            {/* Breadcrumb & Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">
                Home {'>'} <span className="font-medium">{search}</span>
              </div>
              <div className="flex flex-row items-start gap-4 sm:items-center">
                <select
                  className="px-2 py-1 border rounded sm:px-3 sm:py-2 w-36 sm:w-48"
                  value={changeSort}
                  onChange={e => onSortChange(e.target.value)}
                >
                  <option value="latest">Sort: Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className='flex flex-col justify-center'>
              <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {products.length > 0 ? products.map(product => (
                  <Link href={`${slug(product.category.name)}/${slug(product.brand)}/${slug(product.name)}/${product.id}/buy`} key={product.id} className="flex flex-col items-center p-2 transition bg-white rounded shadow hover:shadow-md">
                    <img src={product.images.find(i => i.is_main)?.image_path} alt={product.name} className="h-56 rounded" />
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-800">{product.brand}</h3>
                      <p className="text-sm text-gray-500">{product.name}</p>
                      <p className="mt-1 space-x-2 text-gray-900 text-md">
                        <span className='font-bold'>${(product.price - product.price * (parseFloat(product.discount) / 100)).toFixed(2)}</span>
                        <span className='space-x-1'>
                          <span className='text-[12px] text-gray-400 line-through'>${product.price}</span>
                          <span className='text-[10px] text-orange-400'> ({product.discount}% OFF)</span>
                        </span>
                      </p>
                    </div>
                  </Link>
                )) : (
                  <div className="text-center text-gray-500 col-span-full">No products match your filters.</div>
                )}
              </div>
              <Pagination paginationData={{ links: productsData.links }} query={query} />
            </div>
          </main>
        </div>
      </div>
    </GuestLayout>
  );
}

function FilterSection({ title, data, type, onFilterChange }) {
  return (
    <>
      <div className="mb-6">
          <h3 className="mb-2 font-semibold">{title}</h3>
          <ul className="p-2 space-y-2 overflow-y-auto">
            {data.map((item, index) => (
              <li key={index} className='space-x-3 text-sm'>
                <input
                  type='checkbox'
                  onChange={() => onFilterChange(index, type)}
                  checked={item.is_active}
                  id={`${type}-${index}`}
                  className='rounded focus:border-none'
                />
                <label htmlFor={`${type}-${index}`}>{item.name}</label>
              </li>
            ))}
          </ul>
        </div>
    </>
  );
}

function getFilterValue(filters, filter) {
  const categories = filters.categories.map(name => ({
    name,
    is_active: filter.categories?.includes(name) || false
  }));

  const brands = filters.brands.map(name => ({
    name,
    is_active: filter.brand?.includes(name) || false
  }));

  return { categories, brands };
}

function composeQueryFilters(filters) {
  const result = {};
  for (const key in filters) {
    result[key] = filters[key].filter(item => item.is_active).map(item => item.name);
  }
  return result;
}

function arrayToString(obj) {
  let arr = [];
  for (const key in obj) {
    let a = key;
    let b = obj[key].join(',');
    if (b.length > 0) arr.push([a, b].join(':'));
  }
  return arr.join('::');
}

function slug(e) {
  return e.toLowerCase().replace(/\s+/g, '-');
}