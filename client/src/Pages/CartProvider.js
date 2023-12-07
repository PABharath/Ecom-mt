// CartContext.js (or any other name you choose)
import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Other context-related functions and states

  return (
    <CartContext.Provider value={{ cartItems, /* other values *//* functions */ }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
