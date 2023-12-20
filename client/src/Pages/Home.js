import React, { useState, useEffect} from "react";
import axios from "axios";
import ImageCarousel from "./ImageCarousel";
import ProductList from "./ProductList";
import "./Home.css";
// import { CiSearch } from "react-icons/ci";
import Navbar from "../Pages/Navbar";
import { Link } from "react-router-dom";
import { FaTruck, FaMoneyBillAlt, FaStar, FaTags } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar2 from "./Navbar2";
import { GoMail } from "react-icons/go";
import Filtering from "./Filtering";


function Home() {

  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
const [patients, setPatients] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [email, setEmail] = useState({
    Email: '',
   });

   const [searchValue, setSearchValue] = useState('');
   const [searchResults, setSearchResults] = useState([]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmail({
      ...email,
      [name]: value,
    });
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    // Fetch initial search results (optional)
    handleSearch(searchValue);
  }, [searchValue]);



  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Email:', email);
      const response = await axios.post('http://localhost:5555/login', email);
  
      toast.success('Subscribed successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
  
      if (response.data.success) {
       
        window.alert('Login successful!');

   
      } else {
       
        setEmail(response.data.error);
      }
    } catch (err) {
        console.error('Error:', err.response.data); 
      
        if (err.response.data.message) {
        
          window.alert(err.response.data.message);
        } else {
         
          window.alert('An error occurred');
        }
      }
    }
   


  return (
    <>
    <Navbar2 onSearch={handleSearch}/>
    <div className="home-main-body">
      <section>
        <ImageCarousel />
        
        <div className=" icons">
          
            <div className="first-icon">
            <FaTruck className="fatruck" />
            <span className="free">Free Shipping</span>
            <div className="on">On order over ₹1500</div>
            
      </div>
      <div className="first-icon">
            <FaMoneyBillAlt className="money" />
            <span className="cash">Cash On Delivery</span>
            <div className="on">100% money back guarantee</div>
            
      </div>
      <div className="first-icon">
            <FaStar className="best" />
            <span className="quality">Best Quality</span>
           <div className="on">Offer special bonuses with gift</div>
            
      </div>
      <div className="first-icon">
            <FaTags className="discount" />
            <span className="price">Best Discount</span>
            <div className="on">With Reasonable Prices</div>
            
      </div>

        </div>

         <div>
          

        <div>

          <div>
          <div className="top">Top Product</div>
          <div className="middle">
              <div>
                <Link to='/ProductList'>
                  <button className="Featureds" onClick={() => handleCategorySelect("latest")}>
                    Latest
                  </button>
                </Link>
              </div>
              <div>
              <Link to='/ProductList'>
                <button className="Featureds" onClick={() => handleCategorySelect("featured")}>
                  Featured
                </button>
                </Link>
              </div>
              <div>
              <Link to='/ProductList'>
                <button className="Sellers" onClick={() => handleCategorySelect("bestseller")}>
                  Best Sellers
                </button>
                </Link>
            </div>

          <div >
          <Link to={{ pathname: '/SareesCategories2', state: { category: 'Kanjeevaram' } }}>
  <button className="Featured">Latest</button>
</Link>           
            </div>
          <div> 
          <button className="Featureds">Featured</button>
            </div>
          </div>
          </div>
          {/* <div className="best-sellers-text">Best Sellers</div> */}
          <div className="browse-all-container">
            {/* <Link to="/SareesCategories2">
              <button className="browse-all-button">Browse all &gt;</button>
            </Link> */}
          </div>
        </div>
        </div>
        <div className="productContainer1">
        {/* <ProductList searchQuery={searchQuery} /> */}

        <Filtering
            searchQuery={searchQuery}
            filterType={selectedCategory}
            onCategorySelect={handleCategorySelect} />

        </div>
        <div className="image-container-wrapper">
          <div className="image-container">
            <Link to="/products/64d5af52e78160215db31931">
              {" "}
              {/* Replace "/products/productId" with the actual path to the product details page */}
              <img  className="img890"  src={require("../Assets/home1.png")} alt="Product 1" />
              
              {/* <button className="buy-now-box-button1">Buy Now </button> */}
            </Link>
           
          </div>

          <div className="image-container">
          <Link to="/products/64d5afade78160215db31933">
              {" "}
            <img  className="img891"  src={require("../Assets/home4.png")} alt="Product 2" />
          
            {/* <button className="buy-now-box-button2">Buy Now </button> */}
            </Link>
           
          </div>
          </div>


          {/* <div className="image-container-wrapper">
          <div className="image-container1">
          <Link to="/products/64d5afade78160215db31933">
              {" "}
            <img  className="img890"  src={require("../Assets/box-image22.jpg")} alt="Product 3" />
            </Link>
          </div>

          <div className="image-container1">
          <Link to="/products/64d5afade78160215db31933">
              {" "}
            <img className="img890" src={require("../Assets/box-image23.jpg")} alt="Product 4" />
            </Link>
          </div>
          </div> */}
        
        {/* <div className="review-boxes">
          {reviews.map((review) => (
            <div key={review._id} className="review-box">
              <div className="review-text">{review.comment}</div>
            </div>
          ))}
        </div> */}
  <div className="mail-box">
          <div className="subscribe-mail">
          <div className="subscribe-text">
             
        
             <strong style={{fontSize:'25px',marginLeft:'2px',cursor:'pointer'}}><a href="https://www.google.com"><GoMail style={{color:'#8eab92',marginTop:'-5px'}}  /></a>&nbsp;&nbsp;News Settler</strong>
           <p style={{fontSize:'large' ,marginLeft:'40px'}}>Get free 20% discount for all products on your first order.</p>
           </div>
            <div className="mail-id">
              <input
                type="text"
                name="Email"
                onChange={handleChange}
                className="email-input"
                placeholder="Enter your mail"
              />
              <button
                className="telegram-button"
                onClick={handleSubmit}
              >Subscribe
              </button>
              
            </div>
           
          </div>
        </div>
      </section>
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}
    </div>
    </>
  );
}

export default Home;