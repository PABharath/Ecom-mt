import React, { useState, useEffect ,useCallback} from "react";
import axios from "axios";
import Modal from "react-modal";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductDetails.css";
import { useCart } from "./CreateContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar2 from "./Navbar2";
import { FaStar } from "react-icons/fa";
import { BASE_URL } from "../services/Helpers";

// import StarRating from "react-rating-stars-component";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [mainImage, setMainImage] = useState(0);
  const [rating, setRating] = useState(-1);
  const [error, setError] = useState("");
  const [reviewData, setReviewData] = useState({ ratings: 0, reviews: 0 });
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useCart();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAddToCartToast, setShowAddToCartToast] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.starRating,
      0
    );
    return (totalRatings / reviews.length).toFixed(2);
  };

  const renderStarRatings = () => {
    const averageRating = calculateAverageRating();

    return (
      <div className="star-ratings-container">
        <h3 className="ratt">
          {averageRating} Ratings & {reviews.length} Reviews
        </h3>
        {[5, 4, 3, 2, 1].map((rating, index) => {
          const ratingCount = reviews.filter(
            (review) => review.starRating === rating
          ).length;
          const percentage = (ratingCount / reviews.length) * 100;
          const progressBarColor = calculateProgressBarColor(
            averageRating,
            rating
          );

          return (
            <div key={index} className="star-rating-item">
              <div className="star-rating-header">
                <span className="star-rating-value">{rating}</span>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${percentage}%`,
                      background: progressBarColor,
                    }}
                  ></div>
                </div>
                <span className="rating-count">{ratingCount}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderStarRatingsAndReviews = () => (
    <div className="my">
      <div className="star-ratings-and-reviews-container">
        {renderStarRatings()}
        <div className="reviews-section">
          <h3 className="ratts"> Reviews</h3>
          <ul className="reviews-list">
            {reviews
              .slice(0, showAllReviews ? reviews.length : 3)
              .map((review, index) => (
                <li key={index} className="review-item">
                   <p className="review-comment-product">{review.comment}</p>
                  <p className="review-username">{review.username}</p>
                  <div className="star-rating">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className="star"
                        color={
                          starIndex < review.starRating ? "#ffc107" : "#e4e5e9"
                        }
                      />
                    ))}
                  </div>
                </li>
              ))}
          </ul>
          {reviews.length > 3 && (
            <button
              className="see-all-reviews-button"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? "Show Less Reviews" : "See All Reviews"}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const calculateProgressBarColor = (averageRating, currentRating) => {
    const gradientStart = [255, 0, 0];
    const gradientEnd = [0, 255, 0];
    const normalizedRating = Math.min(Math.max(currentRating / 5, 0), 1);
    const color = gradientStart.map((channel, index) =>
      Math.round(channel + normalizedRating * (gradientEnd[index] - channel))
    );

    return `rgb(${color.join(",")})`;
  };

 

  const handleThumbnailClick = (index) => {
    setMainImage(index);
  };

  const fetchReviewData = useCallback(async () => {
    try {
      const response = await fetch(
        `${ BASE_URL }/api/product-reviews?productId=${productId}`
      );
      const data = await response.json();
      setReviews(data);
      const totalRatings = data.reduce(
        (sum, review) => sum + review.starRating,
        0
      );
      const totalReviews = data.length;
      setReviewData({ ratings: totalRatings, reviews: totalReviews });
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  },[productId]);

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${ BASE_URL }/api/products/${productId}`
      );
      console.log("Response:", response.data);
      setProductDetails(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Error fetching product details");
    }
  },[setProductDetails,productId]);


  useEffect(() => {
    fetchProductDetails();
    fetchReviewData();
  }, [fetchProductDetails,fetchReviewData]);

  useEffect(() => {
    console.log("Product ID:", productId);
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId,fetchProductDetails]);

  const calculateOffer = () => {
    const mrp = parseFloat(productDetails.mrp);
    const sp = parseFloat(productDetails.sp);

    if (!isNaN(mrp) && !isNaN(sp) && mrp > sp) {
      const discount = mrp - sp;
      const offerPercentage = (discount / mrp) * 100;
      return offerPercentage.toFixed(2);
    }

    return 0;
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
    setShowAddToCartToast(true);
  };

  const handleBuyNow = (event, product) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to proceed with the purchase.");
      window.location.href = "/login";
      return;
    }

    addToCart(product);
    console.log("Adding to cart:", product);
    navigate("/IntegratedAddressPage");
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    closeReviewModal();

    if (rating === -1) {
      toast.error("Please select a star rating before submitting the review.");
      return;
    }

    const reviewText = event.target.reviewText.value;
    const formData = {
      productId: productId,
      starRating: rating,
      comment: reviewText,
      username: "JohnDoe",
    };

    try {
      // Post the review based on the productId
      await axios.post(
        `${ BASE_URL }/api/products/${productId}/reviews`,
        formData
      );

      console.log("Review successfully submitted");

      // Assuming you want to update the reviews state with the newly submitted review
      // Make sure reviews and setReviews are properly defined using the useState hook
      // setReviews([...reviews, response.data]);

      // Immediately fetch updated reviews after posting
      fetchReviewData();

      toast.success("Review successfully submitted!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  
  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      maxHeight: "100vh",
      overflow: "auto",
    },
  };

  return (
    <div>
      <Navbar2 />
      <div className="product-overflow">
        {error ? (
          <p>{error}</p>
        ) : (
          <div>
            <div className="product-images">
              {productDetails.productImages &&
              productDetails.productImages.length > 0 ? (
                <div className="images-container">
                  <img
                    className="main-image"
                    src={`${ BASE_URL }/api/uploads/${productDetails.productImages[mainImage]}`}
                    alt={`Product ${mainImage}`}
                    width="1000"
                    height="1200"
                  />
                  <div className="additional-images">
                    {productDetails.productImages.map((image, index) => (
                      <img
                        key={index}
                        className={`thumbnail ${
                          index === mainImage ? "active" : ""
                        }`}
                        src={`${ BASE_URL }/api/uploads/${image}`}
                        alt={`Product ${index}`}
                        width="50"
                        height="75"
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>

            <div className="product-pricing-box">
              <div className="next">
                <p className="product-name">{productDetails.productName}</p>
                <div className="price-container">
                  <p className="product-price">
                    <span className="product-mrp"> </span>
                    <span className="strikethrough">
                      ₹ {productDetails.mrp}
                    </span>
                  </p>
                  &nbsp;&nbsp;
                  <p className="product-sp"> ₹ {productDetails.sp}</p>
                </div>
                <p className="product-offer">
                  ({calculateOffer(productDetails.mrp, productDetails.sp)}% off)
                </p>
                <hr className="hr-2" />
                <p className="availability">
                  Availability:{" "}
                  <span
                    className={`availability-status ${
                      productDetails.availability === 0
                        ? "out-of-stock"
                        : "in-stock"
                    }`}
                  >
                    {productDetails.availability === 0
                      ? "Out Of Stock"
                      : "In Stock"}
                  </span>
                </p>
                <div className="ratings-reviews">
                  <p className="product-ratings">
                    {reviews.length > 0
                      ? (reviewData.ratings / reviews.length).toFixed(2)
                      : "N/A"}{" "}
                    Ratings &
                  </p>
                  <p className="product-reviews">
                    {reviewData.reviews} Reviews
                  </p>
                </div>
                <hr className="hr-2" />

                <div className="product-savings">
                  You Saved:{" "}
                  <span className="savings-amount">
                    ₹ {productDetails.mrp - productDetails.sp}
                  </span>{" "}
                  (<div className="product-taxes">Inclusive of all taxes</div>)
                </div>

                <div className="buttons">
                  <button
                    className="add-to-cart-button"
                    onClick={(event) => handleAddToCart(event, productDetails)}
                  >
                    Add to Cart
                  </button>

                  <Link to="/IntegratedAddressPage">
                    <button
                      className="buy-now-button"
                      onClick={(event) => handleBuyNow(event, productDetails)}
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <hr className="hr-1" />
            <div className="name-2">
              <h2 className="high">{productDetails.productName}</h2>
              &nbsp;&nbsp;
              <hr />
            </div>
            <div className="prod-info">
              <h3>Product Information</h3>
              <p className="pra">{productDetails.productDescription}</p>
            </div>
            <hr />

            <div className="sp-info">
              <h3 className="specific">SPECIFIC INFORMATION</h3>
              <div className="info-columns">
                <div className="left-column">
                  <div className="row">
                    <p className="heading">Occasion</p>
                    <span className="colon">:</span>
                    <p>{productDetails.occasion}</p>
                  </div>
                  <div className="row">
                    <p className="heading">Primary Color</p>
                    <span className="colon">:</span>
                    <p>{productDetails.primaryColor}</p>
                  </div>
                  <div className="row">
                    <p className="heading">Material</p>
                    <span className="colon">:</span>
                    <p>{productDetails.material}</p>
                  </div>
                  <div className="row">
                    <p className="heading">Border Type</p>
                    <span className="colon">:</span>
                    <p>{productDetails.borderType}</p>
                  </div>
                  <div className="row">
                    <p className="heading">Color Family</p>
                    <span className="colon">:</span>
                    <p>{productDetails.colorFamily}</p>
                  </div>
                </div>
                <div className="right-column">
                  <div className="row">
                    <p className="heading">Fabric</p>
                    <span className="colon">:</span>
                    <p>{productDetails.fabric}</p>
                  </div>
                  <div className="row">
                    <p className="heading">Secondary Color</p>
                    <span className="colon">:</span>
                    <p>{productDetails.secondaryColor}</p>
                  </div>
                  <div className="row">
                    <p className="heading">Pattern</p>
                    <span className="colon">:</span>
                    <p>{productDetails.pattern}</p>
                  </div>
                  <div className="row">
                    <p className="heading">Border Size</p>
                    <span className="colon">:</span>
                    <p>{productDetails.borderSize}</p>
                  </div>
                  <div className="row">
                    <p className="heading">Type</p>
                    <span className="colon">:</span>
                    <p>{productDetails.type}</p>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="review-box">
              <button className="write" onClick={openReviewModal}>
                Write a Review
              </button>
              <Modal
                isOpen={isReviewModalOpen}
                onRequestClose={closeReviewModal}
                contentLabel="Review Modal"
                style={customModalStyles}
              >
                <form className="review-form" onSubmit={handleSubmitReview}>
                  <textarea
                    name="reviewText"
                    placeholder="Write your review..."
                  />
                  <div className="star-rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={index + 1}
                          onChange={() => setRating(index + 1)}
                        />
                        <FaStar
                          className="star"
                          color={index < rating ? "#ffc107" : "#e4e5e9"}
                        />
                      </label>
                    ))}
                  </div>
                  <div className="text">
                    <button
                      type="submit"
                      className="save"
                      disabled={rating === -1}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="close"
                      onClick={closeReviewModal}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </Modal>
            </div>

            <hr />
            <div className="reviews-and-ratings-container">
              {renderStarRatingsAndReviews()}
            </div>
          </div>
        )}
        {showAddToCartToast && (
          <ToastContainer position="top-center" autoClose={3000} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
