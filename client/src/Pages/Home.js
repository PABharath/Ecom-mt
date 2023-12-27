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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SareeShopCarousel from "./SareeShopCarousel";


function Home() {

  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
const [patients, setPatients] = useState([]);
  
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


    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
      try {
        console.log('Fetching reviews...');
        const response = await axios.get('http://127.0.0.1:5555/api/all-reviews');
    
        // Check if the response is valid and contains data
        if (response.data && Array.isArray(response.data)) {
          console.log('Reviews data:', response.data);
    
          // Filter only 5-star reviews
          const fiveStarReviews = response.data.filter((review) => review.starRating === 5);
    
          setReviews(fiveStarReviews);
        } else {
          console.log('No reviews found or unexpected response format.');
          // Update the state to an empty array
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Update the state to an empty array in case of an error
        setReviews([]);
      }
    };
    
    useEffect(() => {
      console.log('Fetching reviews...');
      fetchReviews();
    }, []);
    
    
    useEffect(() => {
      console.log('Fetching general reviews...');
      fetchReviews();
    }, []);
    
   

    
   


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
          <div >
        <Link to='/ProductList'>  <button className="Featured">Latest</button></Link>
           
            </div>
          <div> 
          <Link to='/Filter'><button className="Featureds">Featured</button></Link>
            </div>
          <div>
            <Link to='/Seller'><button className="Sellers"> Best Sellers</button></Link></div>
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
        <ProductList searchQuery="" pageType="home" />

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

        
          
            <h1 className="customer-reviews">Customer Reviews</h1>
            <div className="review-boxes">
            {reviews.map((review) => (
              <div className="review-box1">
              <div key={review._id} className="review-box">
                <div className="review-text">{review.comment}</div>
                <div className="review-details">
                  <span className="star-rating1">Star Rating: {review.starRating}</span>
                  <span className="username"> {review.username}</span>
                </div>
                {/* You can customize the display of other review details as needed */}
              </div>
              </div>
            ))}
          </div>


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
          <SareeShopCarousel />
        </div>
      </section>
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}
    </div>
    </>
  );
}

export default Home;