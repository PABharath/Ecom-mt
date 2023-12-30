import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from "axios";
import './Search.css';
import { BASE_URL } from "../services/Helpers";


export default function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");

  
  useEffect(() => {
    const search = async () => {
      try {
        if (!key.trim()) {
          setSearchResult([]);
          return;
        }
  
        // Update the endpoint URL to fetch products
        const res = await axios.get(`${ BASE_URL }/api/products`, {
          params: { key, limit: 5 },
        });
  
        setSearchResult(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    search(); // Call the search function

  }, [key]);

  return (

    <form>
    <div className="Search-wrapper">
      <button className="search-btn">
        <BsSearch />
      </button>
      <div className="form-group1">
        <input
          type="text"
          className="form-control1"
          placeholder="Searching..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      {searchResult && searchResult.length > 0 && key.trim() !== "" && (
        <div className="search-result">
          {searchResult.map((product) => (
            // Conditionally render the link only if the product name contains the search term
            product.productName.toLowerCase().includes(key.toLowerCase()) && (
              <div key={product._id}>
                <Link
                  to={`/products/${product._id}`} // Navigate to the product details page
                  className="result-item"
                >
                  <div>
                    <img src={`${ BASE_URL }/uploads/${product.productImages[0]}`} alt="" />
                  </div>
                  <div className="product-info">
                    <p>{product.productName}</p>
                    <p>{product.category.join(', ')}</p>
                  </div>
                </Link>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  </form>
    
  );
}
