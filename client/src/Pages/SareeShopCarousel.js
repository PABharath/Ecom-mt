// SareeShopCarousel.js
import React from "react";
import Slider from "react-slick";
import "./SareeShopCarousel.css";

const SareeShopCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Set to the total number of images
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Set the interval for automatic scrolling in milliseconds
  };

  return (
    <div className="saree-shop-carousel">
      <Slider {...settings}>
        {/* Add your saree shop items here */}
        <div className="columb65">
        <div className="carousel-item flexchange231">
          <img className="space23" src={require("../Assets/saree1.jpg")} alt="Saree Shop 1" />
          <img className="space23" src={require("../Assets/saree1.jpg")} alt="Saree Shop 1" />
          <img className="space23" src={require("../Assets/saree1.jpg")} alt="Saree Shop 1" />
          </div>
          <p>Saree Shop 1</p>
        </div>

        <div className="columb65">
        <div className="carousel-item flexchange231">
          <img className="space23" src={require("../Assets/saree2.png")} alt="Saree Shop 2" />
          <img className="space23" src={require("../Assets/saree2.png")} alt="Saree Shop 2" />
          <img className="space23" src={require("../Assets/saree2.png")} alt="Saree Shop 2" />
          </div>
          <p>Saree Shop 2</p>
        </div>
        <div className="columb65">
        <div className="carousel-item flexchange231">
          <img className="space23" src={require("../Assets/saree2.png")} alt="Saree Shop 2" />
          <img className="space23" src={require("../Assets/saree2.png")} alt="Saree Shop 2" />
          <img className="space23" src={require("../Assets/saree2.png")} alt="Saree Shop 2" />
          </div>
          <p>Saree Shop 2</p>
        </div>
        {/* Add more shops as needed */}
      </Slider>
    </div>
  );
};

export default SareeShopCarousel;
