// CreateContext.js
import React, { createContext, useState, useContext,useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [email,] = useState(localStorage.getItem('email'));
  const [token] = useState(localStorage.getItem('token'));
  const [backendCartItems, setBackendCartItems] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/profile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        const selectedItems = res.data.user.cart || [];
        setCartItems(selectedItems);
      })
      .catch((err) => console.log(err));
  }, [token]); // Only depend on token, not backendCartItems
  
  
  const addToCart = async (product) => {
    try {
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
        // Send the updated cartItems to the backend
        await axios.post(`http://localhost:5555/api/users/${email}/cart`, {
          cartItems: updatedCartItems.map((item) => ({
            productName: item.productName,
            quantity: item.quantity,
            productImages:item.productImages[0],
            sp:item.sp,
          })),
        });
      } else {
        setCartItems([
          ...cartItems,
          { productId: product._id, quantity: 1, ...product },
        ]);

        // Send the updated cartItems to the backend
        await axios.post(`http://localhost:5555/api/users/${email}/cart`, {
          cartItems: [
            ...cartItems,
            { productId: product._id, quantity: 1, ...product },
          ].map((item) => ({
            productName: item.productName,
            quantity: item.quantity,
            productImages:item.productImages[0],
            sp:item.sp,
          })),
        });
      }

      console.log("Adding to cart:", product);
      // Display the toast notification
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };







  
  const handleAddToWishlist = async (product) => {
    try {
      const existingProduct = cartItems.find(
        (item) => item.productId === product._id
      );

      if (existingProduct) {
        // For existing wishlist item, update the quantity
        const updatedCartItems = cartItems.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedCartItems);
      } else {
        // For a new wishlist item, add it to the wishlist
        setCartItems([
          ...cartItems,
          { productId: product._id, quantity: 1, ...product },
        ]);
      }

      // Send the updated wishlist to the backend
      // await axios.post(`http://localhost:5555/api/users/${email}/wishlist`, {
      //   wishlistItem: [
      //     ...cartItems,
      //     { productId: product._id, quantity: 1, ...product },
      //   ].map((item) => ({
         
      //     product: item.productName,
      //     quantity: item.quantity,
      //   })),
      // });

      console.log("Adding to wishlist:", product);
      toast.success("Added to Wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
      toast.error("Failed to add to Wishlist. Please try again.");
    }
  };
  

  const handleDecrement = async (product) => {
    try {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
  
      setCartItems(updatedCartItems);
  
      // Send the updated cartItems to the backend
      await axios.post(`http://localhost:5555/api/users/${email}/cart`, {
        cartItems: updatedCartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          productImages: item.productImages[0],
          sp: item.sp,
        })),
      });
  
      console.log("Decrementing from cart:", product.productId);
    } catch (error) {
      console.error("Error decrementing from cart:", error.message);
    }
  };
  
  
  const handleIncrement = async (product) => {
    try {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
  
      setCartItems(updatedCartItems);
  
      // Send the updated cartItems to the backend
      await axios.post(`http://localhost:5555/api/users/${email}/cart`, {
        cartItems: updatedCartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          productImages: item.productImages[0],
          sp: item.sp,
        })),
      });
  
      console.log("Adding to cart:", product);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
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
        setCartItems, 
        addToCart,
        handleAddToWishlist,
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






