import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../Assets/banner1.png";
import image2 from "../Assets/home11.png";
import image3 from "../Assets/mainbanner2.png";
import image4 from "../Assets/banner123.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ImageCarousel.css";

const ImageCarousel = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Define a function to navigate to a product page
  const navigateToProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div onClick={() => navigateToProduct("64d5b0b0e78160215db31937")}>
          <img src={image1} alt="Product 1" />
        </div>
        <div onClick={() => navigateToProduct("64d5b06ee78160215db31936")}>
          <img src={image2} alt="Product 2" />
        </div>
        <div onClick={() => navigateToProduct("64d5afade78160215db31933")}>
          <img src={image3} alt="Product 3" />
        </div>
        <div onClick={() => navigateToProduct("64d5af82e78160215db31932")}>
          <img src={image4} alt="Product 4" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
