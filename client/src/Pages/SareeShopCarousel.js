import Slider from "react-slick";
import React, { useRef } from "react";
import "./SareeShopCarousel.css";
import { IoChevronForwardCircle } from "react-icons/io5";
import { AiFillStepBackward } from "react-icons/ai";
import { TfiLayoutSlider } from "react-icons/tfi";

const SareeShopCarousel = () => {
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Set to the total number of images
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow:  <IoChevronForwardCircle />,
    prevArrow:   <AiFillStepBackward />, // Set the interval for automatic scrolling in milliseconds
  };

  const NextArrow = (props) => (
    <div {...props} className="slick-arrow next-arrow" onClick={() => sliderRef.current.slickNext()}>
   
      <div>Next</div>
    </div>
  );

  const PrevArrow = (props) => (
    <div {...props} className="slick-arrow prev-arrow" onClick={() => sliderRef.current.slickPrev()}>
     
      <div>Prev</div>
    </div>
  );

  return (
    <div className="saree-shop-carousel">
       <Slider {...settings}ref={sliderRef}> 
        {/* Add your saree shop items here */}
        <div className="columb65">
        <div className="carousel-item flexchange231">
          <img className="space23" src={require("../Assets/saree10.jpg")} alt="Saree Shop 1" />
          <img className="space23" src={require("../Assets/saree3.jpg")} alt="Saree Shop 1" />
          <img className="space23" src={require("../Assets/saree4.jpg")} alt="Saree Shop 1" />
          </div>
         
        </div>

        <div className="columb65">
        <div className="carousel-item flexchange231">
          <img className="space23" src={require("../Assets/saree15.jpg")} alt="Saree Shop 2" />
          <img className="space23" src={require("../Assets/saree5.jpg")} alt="Saree Shop 2" />
          <img className="space23" src={require("../Assets/saree25.jpg")} alt="Saree Shop 2" />
          </div>
         
        </div>
        {/* <div className="columb65">
        <div className="carousel-item flexchange231">
          <img className="space23" src={require("../Assets/saree7.png")} alt="Saree Shop 2" />
          <img className="space23" src={require("../Assets/saree8.jpg")} alt="Saree Shop 2" />
          <img className="space23" src={require("../Assets/saree2.png")} alt="Saree Shop 2" />
          </div>
        
        </div> */}
        {/* Add more shops as needed */}
      </Slider>
    </div>
  );
};

export default SareeShopCarousel;