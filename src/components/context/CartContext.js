import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Item doesn't exist, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };
  
  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };
  
  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;