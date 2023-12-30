// CreateContext.js
import React, { createContext, useState, useContext,useEffect} from "react";
import axios from "axios";



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
            productId: item._id,
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
            
            productId: item._id,
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







  
 

  
  
  
  
  
  
  
  const handleIncrement = async (product) => {
    try {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
  
      setCartItems(updatedCartItems);
  
      // Send the updated cartItems to the backend
      await updateBackendCart(updatedCartItems);
    } catch (error) {
      console.error("Error incrementing in cart:", error.message);
    }
  };
  
  const handleDecrement = async (product) => {
    try {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === product.productId
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          : item
      );
  
      setCartItems(updatedCartItems);
  
      // Send the updated cartItems to the backend
      await updateBackendCart(updatedCartItems);
    } catch (error) {
      console.error("Error decrementing in cart:", error.message);
    }
  };
  
  const updateBackendCart = async (updatedCartItems) => {
    try {
      await axios.post(`http://localhost:5555/api/users/${email}/cart`, {
        cartItems: updatedCartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          productImages: item.productImages[0],
          sp: item.sp,
        })),
      });
    } catch (error) {
      console.error("Error updating backend cart:", error.message);
    }
  };
  
  
  
  
  
  
  
  
  



  
// ...

const removeFromCart = async (productId) => {
  try {
    // Filter out the product to be removed
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );

    setCartItems(updatedCartItems);

    // Send the updated cartItems to the backend (to remove the product)
    await updateBackendCart(updatedCartItems);
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
  }
};

// ...


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






