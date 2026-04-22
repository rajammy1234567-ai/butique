import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addToCart = (product, quantity = 1, variant = {}) => {
    const existingItem = cart.find(
      item => item.productId === product._id && 
               JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.productId === product._id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      saveCart(updatedCart);
    } else {
      const newItem = {
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity,
        variant,
        image: product.images?.[0]?.url || ''
      };
      saveCart([...cart, newItem]);
    }
  };

  const removeFromCart = (productId, variant = {}) => {
    const updatedCart = cart.filter(
      item => !(item.productId === productId && 
                JSON.stringify(item.variant) === JSON.stringify(variant))
    );
    saveCart(updatedCart);
  };

  const updateQuantity = (productId, quantity, variant = {}) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }

    const updatedCart = cart.map(item =>
      item.productId === productId && 
      JSON.stringify(item.variant) === JSON.stringify(variant)
        ? { ...item, quantity }
        : item
    );
    saveCart(updatedCart);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
