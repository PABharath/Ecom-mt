import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "./CreateContext";
import { toast } from "react-toastify";
import { scrollToTop } from "./scrollUtils";
import "./AllProductsv.css";
import Navbar from "./Navbar";

const SareesCategories2 = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(""); // Add state for minimum price
  const [maxPrice, setMaxPrice] = useState(""); // Add state for maximum price
  const { addToCart } = useCart();




  const handleSearch = (query, category) => {
    // Implement your search logic here
    // For example, you can filter products based on the search query and category
    setSearchTerm(category);
    // You can use the query and category in your filtering logic
    // Fetch or filter products based on the search term and category
  };

  useEffect(() => {
    console.log("Component mounted");
    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/products");

      // If a category is selected, filter products by that category
      let filteredProducts = selectedCategory
        ? response.data.filter((product) =>
            product.category.includes(selectedCategory)
          )
        : response.data;

      // Filter products by price range
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleFilterByPrice = () => {
    fetchProducts();
  };

  
  

  return (
    <>
    
<Navbar onSearch={handleSearch} />


    <div className='Product-List-convik'>


<aside className="productsidevik">
<div className="Dropdown-vik">
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


<div className="priceFilter-vik">
          <label htmlFor="">Filter By Price:</label>
          <span>Min Price: {minPrice}</span>
          <input
            type="range"
            min="500"
            max="1000" // Adjust the maximum value based on your product price range
            step="100"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
           <span>Max Price: {maxPrice}</span>
          <input
            type="range"
            min="1000"
            max="2500" // Adjust the maximum value based on your product price range
            step="200"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <div>
          
           
          </div>
          {/* Uncomment the line below if you want to trigger the filter on slider change */}
          {/* <button onClick={handleFilterByPrice}>Filter</button> */}
        </div>

</aside>


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
                    {" "}
                    <button 
                      className='productaddbutvik'
                      onClick={(event) => handleAddToCart(event, product)}
                    >
                      ADD
                    </button>
                  </Link>
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