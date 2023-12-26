// Search.js

import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import './searchbar.css';

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

        const res = await axios.get("http://localhost:5555/api/products", {
          params: { key, limit: 5 },
        });

        setSearchResult(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    search();
  }, [key]);

  return (
    <form>
      <div className="Search-wrapper">
        <button className="search-btn">
          <BsSearch />
        </button>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Searching..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        {searchResult && searchResult.length > 0 && (
          <div className="search-result">
            {searchResult.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`} // Navigate to the product details page
                className="result-item"
              >
                <div>
                  <img src={`http://localhost:5555/uploads/${product.productImages[0]}`} alt="" />
                </div>
                <div className="product-info">
                  <p>{product.productName}</p>
                  <p>{product.category.join(', ')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
