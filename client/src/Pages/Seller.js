import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "./CreateContext"; 
import { toast } from "react-toastify";
import { scrollToTop } from "./scrollUtils";

const Seller = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/products");
      console.log("API response:", response.data);
      const filteredProducts = filterProducts(response.data, searchQuery);
      console.log("Filtered products:", filteredProducts);
      // Shuffle the filtered products array
      const shuffledProducts = shuffleArray(filteredProducts);
      // Get a random selection of 4-6 products
      const selectedProducts = shuffledProducts.slice(0, getRandomNumber(1,2));
      setProducts(selectedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      console.log("Error details:", error.response);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log("Component mounted with searchQuery:", searchQuery);
    fetchProducts();
  }, [fetchProducts]);

  const filterProducts = (allProducts, query) => {
    if (!query) {
      return allProducts; 
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
    toast.success("Added to Cart!");
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
    <div>
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
                    <Link to="/cart" onClick={scrollToTop}>
                      <button 
                        className='productaddbutvik'
                        onClick={(event) => handleAddToCart(event, product)}
                      >
                        Add to cart
                      </button>
                    </Link>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>

  );
};

export default Seller;
