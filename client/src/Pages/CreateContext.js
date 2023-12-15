// CreateContext.js
import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item.productId === product._id
    );

    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        { productId: product._id, quantity: 1, ...product },
      ]);
    }
  };

  // Function to decrement product quantity in the cart
  const handleDecrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to increment product quantity in the cart
  const handleIncrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Provide the context values to the components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        handleDecrement,
        handleIncrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
