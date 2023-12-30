import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "./CreateContext";
import { toast } from "react-toastify";
import { scrollToTop } from "./scrollUtils";
import "./AllProductsv.css";
import Navbar2 from "./Navbar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";

const SareesCategories2 = () => {
  const [products, setProducts] = useState([]);
  const [ setSearchTerm] = useState("");   
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { addToCart, handleAddToWishlist } = useCart();

  // const location = useLocation();

  const handleSearch = (query, category) => {
    setSearchTerm(category);
    // Implement your search logic here
  };

  useEffect(() => {
    console.log("Component mounted");
    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/products");

      let filteredProducts = selectedCategory
        ? response.data.filter((product) =>
            product.category.includes(selectedCategory)
          )
        : response.data;

      if (minPrice !== "" && maxPrice !== "") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.sp >= parseInt(minPrice) && product.sp <= parseInt(maxPrice)
        );
      }

      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      console.log("Error details:", error.response);
    }
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
    event.stopPropagation();
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  return (
    <>
      <Navbar2 onSearch={handleSearch} />

      <div className="Product-List-convik">
        <aside className="productsidevik">
          <div className="Dropdown-vik">
            <div className="dropdown-content-vik">
              <button onClick={() => handleCategorySelect(null)}>All</button>
              <button onClick={() => handleCategorySelect("Kanjeevaram")}>
                Kanjeevaram
              </button>
              <button onClick={() => handleCategorySelect("Mysore")}>Mysore</button>
              <button onClick={() => handleCategorySelect("Chettinad")}>
                Chettinad
              </button>
              <button onClick={() => handleCategorySelect("Kasavu")}>Kasavu</button>
              <button onClick={() => handleCategorySelect("Gadwal")}>Gadwal</button>
              <button onClick={() => handleCategorySelect("Dharamavaram")}>
                Dharamavaram
              </button>
              <button onClick={() => handleCategorySelect("Pochampally")}>
                Pochampally
              </button>
            </div>
          </div>

          <div className="priceFilter-vik">
            <label htmlFor="">Filter By Price:</label>
            <span>Min Price: {minPrice}</span>
            <input
              type="range"
              min="500"
              max="1000"
              step="100"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <span>Max Price: {maxPrice}</span>
            <input
              type="range"
              min="1000"
              max="2500"
              step="200"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </aside>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-convik">
            {products.map((product) => (
              <div key={product._id} className="productboxvik">
                <Link
                  to={`/products/${product._id}`}
                  className="product-linkvik"
                  onClick={scrollToTop}
                >
                  <img
                    className="product-imgvik"
                    src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                    alt={product.productName}
                  />
                  <div className="productnamevik">{product.productName}</div>
                  <div className="productaddconvik">
                    <Link to="/cart" onClick={scrollToTop}>
                      {" "}
                      <button
                        className="productaddbutvik"
                        onClick={(event) => handleAddToCart(event, product)}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                    </Link>
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
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SareesCategories2;
