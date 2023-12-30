// ProductList.js
import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "./CreateContext"; // Import the custom hook
import { toast } from "react-toastify";
import './ProductList.css'
import Navbar2 from "./Navbar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/Helpers";

const ProductList = ({ searchQuery, pageType }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart,  } = useCart();
  const [email,] = useState(localStorage.getItem('email'));

  

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      console.log("API response:", response.data);
      
      let filteredProducts;
  
      if (pageType === "home") {
        // Display only 8 products on the home page
        filteredProducts = filterProducts(response.data, searchQuery).slice(0, 8);
      } else {
        // Display all products on other pages (saree categories page)
        filteredProducts = filterProducts(response.data, searchQuery);
      }
  
      console.log("Filtered products:", filteredProducts);
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      console.log("Error details:", error.response);
    }
  },[pageType,searchQuery]);
  

  useEffect(() => {
    console.log("Component mounted with searchQuery:", searchQuery);
    fetchProducts();
  }, [searchQuery,fetchProducts]);

  const filterProducts = (allProducts, query) => {
    if (!query) {
      return allProducts; // Return all products if no search query
    }
    const lowercasedQuery = query.toLowerCase();
    return allProducts.filter((product) =>
      product.productName.toLowerCase().includes(lowercasedQuery)
    );
  };

  const handleAddToCart = (event, product) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add items to the cart.");
      window.location.href = "/login";
      return;
    }

    addToCart(product);
    console.log("Adding to cart:", product);
    toast.success("Added to Cart!");
  };

  const handleAddToWishlistClick = async (event, product) => {
     // Prevent the click from propagating to the Link component
     event.preventDefault();

   console.log(product);
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("Please login to add items to the wishlist.");
      window.location.href = "/login";
      return;
    }
  
    try {
     
      const wishlistItem ={
        productName:product.productName,
        
        sp:product.sp ,
        productImages: product.productImages[0],   

      }
      await axios.post(`${BASE_URL}/api/users/${email}/wishlist`, wishlistItem);
        
    
      console.log("Adding to wishlist:", wishlistItem);
      toast.success("Added to Wishlist!");
    } catch (error) {
      console.error("Error adding to Wishlist:", error.message);
      console.log("Error details:", error.response);
      toast.error("Failed to add to Wishlist. Please try again.");
    }
  };
  

  return (
    <div>
      <>
      <Navbar2/>
    
      <div className="Product-List-convik">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-convik">
            {products.map((product) => (
              <div key={product._id} className="productboxvik">
                <div className="productboxvik87">
                  <Link
                    to={`/products/${product._id}`}
                    className="product-linkvik"
                  >
                    <img
                      className="product-imgvik"
                      src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                      alt={product.productName}
                    />
                    
                    {/* <div className="productcatvik">{product.category}</div> */}
                  <div className="changing234">
                  <div className="productnamevik">{product.productName}</div>
                  <div className="productaddconvik">
                    <button
                      className="productaddbutvik"
                      onClick={(event) => handleAddToCart(event, product)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                    <div className="productpricevik">₹{product.sp}</div>
                    <button
                      className="productaddbutvik wishlist-button"
                      onClick={(event) =>
                        handleAddToWishlistClick(event, product)
                      }
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                  </div>
                  </Link>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </>
    </div>
   
  );
};

export default ProductList;
