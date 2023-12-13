import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";
import { useCart } from "./CreateContext"; // Import the custom hook
import { toast } from "react-toastify";
import { scrollToTop } from "./scrollUtils";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Use the custom hook to get cart context
  const { addToCart } = useCart();

  useEffect(() => {
    console.log("Component mounted");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      console.log("Error details:", error.response);
    }
  };
  

  const handleAddToCart = async (event, product) => {
    event.preventDefault();

    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      // If not authenticated, redirect to the login page
      toast.error("Please login to add items to the cart.");
      // Redirect to the login page
      window.location.href = "/login";
      return;
    }

    try {
      // Make a POST request to save the product to the user's collection
      const response = await axios.post(
        "http://localhost:5555/api/users/cart",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product ID:", product._id);
      // Check if the request was successful
      if (response.status === 200) {
        addToCart(product);
        console.log("Adding to cart:", product);
        toast.success("Added to Cart!"); // Display the toast notification
      } else {
        // Handle other response statuses if needed
        toast.error("Failed to add to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      console.log("Error details:", error.response);
      toast.error("Failed to add to cart. Please try again.");
    }
  };
  
  

  return (
    <div className={styles.productList}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.productContainer}>
          {products.map((product) => (
            <div key={product._id} className={styles.productBox}>
              <Link
                to={`/products/${product._id}`}
                className={styles.productLink} onClick={scrollToTop}
              >
                <img
                  className={styles.productImage}
                  src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                  alt={product.productName}
                />
                <div className={styles.productName}>{product.productName}</div>
                <div className={styles.addContainer}>
                  <div className={styles.productPrice}>₹{product.sp}</div>
                  <Link to="/cart" onClick={scrollToTop}>
                    {" "}
                    <button
                      className={styles.addButton}
                      onClick={(event) => handleAddToCart(event, product)}
                    >
                      Add
                    </button>
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

