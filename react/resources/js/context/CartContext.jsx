import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const getLocalStorage = (key, fallback) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  }
  return fallback;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getLocalStorage('cart', []));
  const [favorites, setFavorites] = useState(() => getLocalStorage('favorites', []));

  // Save to localStorage whenever cart or favorites change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // CART ACTIONS
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find(p => p.product_id === item.product_id);
      if (exists) {
        return prev.map(p =>
          p.product_id === item.product_id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const updateCartItem = (productId, updates) => {
    setCart(prev => prev.map(item =>
      item.product_id === productId ? { ...item, ...updates } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product_id !== productId));
  };

  const updateCartQuantity = (id, action) => {
    setCart(pre => (
      pre.map(p => {
        if (p.quantity > 0 && p.product_id === id) p.quantity = p.quantity + (action);
        return p;
      })
    ))
  }
  const clearCart = () => setCart([]);

  // FAVORITE ACTIONS
  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.product_id === item.product_id);
      if (exists) {
        return prev.filter(f => f.product_id !== item.product_id);
      } else {
        return [...prev, item];
      }
    });
  };
  const isAdded =  (productId)=> cart.some(f => f.product_id === productId);
  const isFavorite = (productId) => favorites.some(f => f.product_id === productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        updateCartQuantity,
        updateCartItem,
        removeFromCart,
        clearCart,
        isAdded,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
