// ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "./CreateContext"; // Import the custom hook
import { toast } from "react-toastify";
import { scrollToTop } from "./scrollUtils";
import Navbar2 from "./Navbar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, handleAddToWishlist } = useCart();

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
    event.stopPropagation(); // Prevent the click from propagating to the Link component
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("Please login to add items to the wishlist.");
      window.location.href = "/login";
      return;
    }
  
    try {
      await handleAddToWishlist(event, product);
      console.log("Adding to wishlist:", product);
      toast.success("Added to Wishlist!");
    } catch (error) {
      console.error("Error adding to Wishlist:", error.message);
      console.log("Error details:", error.response);
      toast.error("Failed to add to Wishlist. Please try again.");
    }
  };
  

  return (
    <div>
      <div className="Product-List-convik">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-convik">
            {products.map((product) => (
              <div key={product._id} className="productboxvik">
                <div className="productboxvik">
                  <Link
                    to={`/products/${product._id}`}
                    className="product-linkvik"
                  >
                    <img
                      className="product-imgvik"
                      src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                      alt={product.productName}
                    />
                    <div className="productnamevik">{product.productName}</div>
                    {/* <div className="productcatvik">{product.category}</div> */}
                  </Link>

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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
