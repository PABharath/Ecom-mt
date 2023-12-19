import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "./CreateContext"; // Import the custom hook
import { toast } from "react-toastify";
import { scrollToTop } from "./scrollUtils";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    console.log("Component mounted with searchQuery:", searchQuery);
    fetchProducts();
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/products");
      console.log("API response:", response.data);
      const filteredProducts = filterProducts(response.data, searchQuery);
      console.log("Filtered products:", filteredProducts);
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      console.log("Error details:", error.response);
    }
  };

  const filterProducts = (allProducts, query) => {
    if (!query) {
      return allProducts; // Return all products if no search query
    }
    const lowercasedQuery = query.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.productName.toLowerCase().includes(lowercasedQuery)
    );
  };

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    
    addToCart(product);
    console.log("Adding to cart:", product);
    toast.success("Added to Cart!"); // Display the toast notification
  };

  return (
    <div className='Product-List-convik'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='product-convik'>
          {products.map((product) => (
            <div key={product._id} className='productboxvik'>
              <Link
                to={`/products/${product._id}`}
                className='product-linkvik' onClick={scrollToTop}
              >
                <img
                  className='product-imgvik'
                  src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                  alt={product.productName}
                />
                <div className='productnamevik'>{product.productName}</div>
                <div className='productcatvik'>{product.category}</div>

                <div className='productaddconvik'>
                  <div className='productpricevik'>₹{product.sp}</div>
                  <button 
                    className='productaddbutvik'
                    onClick={(event) => handleAddToCart(event, product)}
                  >
                    ADD TO CART
                  </button>
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
