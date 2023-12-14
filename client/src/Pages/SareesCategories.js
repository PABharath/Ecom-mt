
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";
import { useCart } from "./CreateContext"; // Import the custom hook
import { toast } from "react-toastify";
import { scrollToTop } from "./scrollUtils";
import './AllProductsv.css'
const SareesCategories = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null); // Add selectedCategory state
    const { addToCart } = useCart();

  useEffect(() => {
    console.log("Component mounted");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/products");
  
      // If a category is selected, filter products by that category
      const filteredProducts = selectedCategory
        ? response.data.filter((product) =>
            product.category.includes(selectedCategory)
          )
        : response.data;
  
      setProducts(filteredProducts);
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
  
  const handleCategorySelect = (category) => {
    // Set the selected category and fetch products based on the category
    setSelectedCategory(category);
    fetchProducts();
  };
  

  return (
    <div className={styles.productList}>





<div className={styles.filterButtons}>
<div className="Dropdown-vik">
    <button className="Dropbtn-vik">Select Categories</button>
    <div className="dropdown-content-vik">

      <button onClick={() => handleCategorySelect(null)}>All</button>
      <button onClick={() => handleCategorySelect("Kanjeevaram")}>Kanjeevaram</button>
      <button onClick={() => handleCategorySelect("Mysore")}>Mysore</button>
      <button onClick={() => handleCategorySelect("Chettinad")}>Chettinad</button>
      <button onClick={() => handleCategorySelect("Kasavu")}>Kasavu</button>
      <button onClick={() => handleCategorySelect("Gadwal")}>Gadwal</button>
      <button onClick={() => handleCategorySelect("Dharamavaram")}>Dharamavaram</button>
      <button onClick={() => handleCategorySelect("Pochampally")}>Pochampally</button>

    </div>
</div>
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

export default SareesCategories;

