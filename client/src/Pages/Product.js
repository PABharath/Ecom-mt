import React from 'react'
import './Product.css'
import Navbar2 from './Navbar2';

function Product() {
  return (
    <div>
      <Navbar2/>
<main>
        <div className="product-details">
          <div className="image" width="400px" height="500px">
            <img className="imgg" src="data:image/jpeg;base64,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" alt="Logo" width="100" height="100" />
          </div>
          <div className="details">
            <h1>Taranga Kanchi Silk Brocade Green Saree</h1>
            <h2>₹16,995 ₹28,325      &nbsp;  &nbsp; &nbsp;  <span className="rate"> 4.2  </span> &nbsp; &nbsp;     2097 Ratings &amp; 48 Reviews</h2>
            <p>(40% off)</p>
            {/* <p className="rating">4.2</p>
            <p className="reviews">2097 Ratings &amp; 48 Reviews</p> */}
            <p>Availability</p> 
            <p className="availability">Availability: In stock</p>
            <p className="savings">You Saved: (₹11,330) Inclusive of all taxes</p>
          </div>
        </div>

        <div className="quantity">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" /><br/><br/>
          <button type="button" className="add-to-cart">Add to cart</button> &nbsp; &nbsp; &nbsp; &nbsp;
          <button type="button" className="buy-now">Buy it now</button>
        </div>
        <br/>
        <h5>Taranga Kanchi Silk Brocade Green Saree</h5>
          <hr/>
        <div className="product-description">
          <h3>PRODUCT DESCRIPTION</h3>
          <p>This exquisite Taranga Kanchi Silk Brocade Green Saree comes with Self blouse. This Saree will be available for a limited time only. Product color may slightly vary due to photographic lighting sources or your monitor settings. There will be NO RETURNS or EXCHANGE for this product.</p>
          <p className="shipping-policy">Shipping policy: Free Shipping in INDIA, Free International shipping for orders above ₹25,000/-. For orders below ₹25,000/-, ₹1500/- for the first saree and ₹500/- for each additional saree.</p>
        </div>
            <hr/>
        <div className="product-info">
          <h3>SPECIFIC INFORMATION</h3>
          <ul>
            <li><strong>Occasion:</strong> Wedding   &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>Fabric:</strong> Taranga Pattu</li>
            <li><strong>Primary Color:</strong> Green  &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<strong>Secondary color:</strong> Green</li>
            <li><strong>Material:</strong> Green &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>Pattern:</strong> Brocade</li>
            <li><strong>Border Type:</strong> Self Zari &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Border size:</strong> Medium</li>
            <li><strong>Color Family:</strong> Pastel &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<strong>Type:</strong> Saree</li>
            
          </ul>
        </div> 
          <hr/> 
        <div className="review">
          <div className="rating">
            <p><strong> Review and Ratings </strong></p>
            <input type="radio" id="star5" name="rating" value="5" />
            <label htmlFor="star5">&#9733;</label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label htmlFor="star4">&#9733;</label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label htmlFor="star3">&#9733;</label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label htmlFor="star2">&#9733;</label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label htmlFor="star1">&#9733;</label>
          </div>
        </div>

      </main>


    </div>
  )
}

export default Product;