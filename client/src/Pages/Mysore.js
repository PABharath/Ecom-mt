


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";
import { useCart } from "./CreateContext"; // Import the custom hook
import { toast } from "react-toastify";
import { scrollToTop } from "./scrollUtils";

const Mysore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm,setSearchTerm]=useState('');
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
  

  const handleAddToCart = (event, product) => {
    event.preventDefault();
  
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
  
    if (!token) {
      // If not authenticated, redirect to the login page
      toast.error("Please login to add items to the cart.");
      // Redirect to the login page
      window.location.href = "/login";
      return;
    }
  
    // If authenticated, proceed with adding to cart
    addToCart(product);
    console.log("Adding to cart:", product);
    toast.success("Added to Cart!"); // Display the toast notification
  };
  const handleSearchChange =(e1)=>{
    setSearchTerm(e1.target.value);
  };


  const filterData=products.filter(
    (product)=>
    product.category.includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.productList}>
        <div>
            <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </div>
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
                <div className={styles.category}>{product.category}</div>

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

export default Mysore;

