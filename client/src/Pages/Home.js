import React, { useState} from "react";
import axios from "axios";
import ImageCarousel from "./ImageCarousel";
import ProductList from "./ProductList";
import "./Home.css";
import { Link } from "react-router-dom";
import { FaTruck, FaMoneyBillAlt, FaStar, FaTags } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Home() {
  
  const [email, Setemail] = useState({
    Email: '',
   });

 

  const handleChange = (e) => {
    const { name, value } = e.target;

    Setemail({
      ...email,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Email:', email); 
      
      const response = await axios.post('http://localhost:5555/login', email);
      // alert('Login succesfull')
      toast.success('Subscribed successfully!', {
        position: "top-right",
        autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        
      });
      if (response.data.success) {
      
        window.alert('Login successful!');

     
      
      } else {
      
        Setemail(response.data.error);
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








  // const handleTelegramButtonClick = () => {
   
   
  // };

  return (
    <div className="home-main-body">
      <section>
        <ImageCarousel />
        <div className="homesection1">
          <div className="section-items">
            <FaTruck className="home-icon" />
            <div className="section-text">
              <span className="multiline">Free Shipping</span>
            </div>
          </div>
          <div className="section-items">
            <FaMoneyBillAlt className="home-icon" />
            <div className="section-text">
              <span className="multiline">Cash On Delivery</span>
            </div>
          </div>
          <div className="section-items">
            <FaStar className="home-icon" />
            <div className="section-text">
              <span className="multiline">Best Quality</span>
            </div>
          </div>
          <div className="section-items">
            <FaTags className="home-icon" />
            <div className="section-text">
              <span className="multiline">Best Discount</span>
            </div>
          </div>
        </div>
        <div className="best-sellers-container">
          <div className="best-sellers-text">Best Sellers</div>
          <div className="browse-all-container">
            <Link to="/ProductList">
              <button className="browse-all-button">Browse all &gt;</button>
            </Link>
          </div>
        </div>
        <div className="productContainer1">
          <ProductList />
        </div>
        <div className="image-container-wrapper">
          <div className="image-container">
            <Link to="/products/64d5af52e78160215db31931">
              {" "}
              {/* Replace "/products/productId" with the actual path to the product details page */}
              <img  className="img890"  src={require("../Assets/ban_promo_26.jpg")} alt="Product 1" />
              {/* <button className="buy-now-box-button1">Buy Now </button> */}
            </Link>
          </div>

          <div className="image-container">
          <Link to="/products/64d5afade78160215db31933">
              {" "}
            <img  className="img890"  src={require("../Assets/box-image6.jpg")} alt="Product 2" />
            {/* <button className="buy-now-box-button2">Buy Now </button> */}
            </Link>
          </div>
          </div>
          <div className="image-container-wrapper">
          <div className="image-container1">
          <Link to="/products/64d5afade78160215db31933">
              {" "}
            <img  className="img890"  src={require("../Assets/box-image22.jpg")} alt="Product 3" />
            {/* <button className="buy-now-box-button2">Buy Now </button> */}
            </Link>
          </div>

          <div className="image-container1">
          <Link to="/products/64d5afade78160215db31933">
              {" "}
            <img className="img890" src={require("../Assets/box-image23.jpg")} alt="Product 4" />
            {/* <button className="buy-now-box-button2">Buy Now </button> */}
            </Link>
          </div>

          </div>
        
        {/* <div className="review-boxes">
          {reviews.map((review) => (
            <div key={review._id} className="review-box">
              <div className="review-text">{review.comment}</div>
            </div>
          ))}
        </div> */}
  <div className="mail-box">
          <div className="subscribe-mail">
            <div className="mail-id">
              <input
                type="text"
                name="Email"
                onChange={handleChange}
                className="email-input"
                placeholder="Email Address"
              />
              <button
                className="telegram-button"
                onClick={handleSubmit}
              >
                <FaTelegramPlane
                  className="telegram-icon"
                  style={{ fontSize: "34px", color: "white" }}
                />
              </button>
            </div>
            <div className="subscribe-text">Subscribe newsletter</div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Home;
