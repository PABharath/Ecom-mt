import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './Payment.css';
import blue from '../Assets/blue.jpg'
const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const totalAmount = location.state ? location.state.totalAmount : 0;

  // Function to handle payment success
  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      // Move the order creation logic here
      const minimumAmount = 1.0;
      const calculatedAmount = Math.max(minimumAmount, totalAmount);

      const response = await axios.post(
        "http://localhost:5555/api/create-order",
        { totalAmount: calculatedAmount }
      );
      const order = response.data.order;

      console.log("Payment successful:", paymentResponse);
      console.log("Order created:", order);

      // Here you can navigate to a success page or perform other actions
    } catch (error) {
      console.error("Error creating order:", error.response || error.message);
      // Handle the error, display an error message, etc.
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    // Handle the payment error, display an error message, etc.
  };

  // const openRazorpayModal = () => {
  //   console.log("Button clicked.");
  //   if (window.Razorpay) {
  //     try {
  //       // Continue with the payment logic directly
  //       const options = {
  //         key: "rzp_test_7ffWepXdK0WViE",
  //         amount: totalAmount * 100, // Convert amount to paise
  //         name: "Your Company Name",
  //         description: "Payment for Your Products",
  //         handler: handlePaymentSuccess,
  //         prefill: {
  //           email: "user@example.com",
  //           contact: "1234567890",
  //         },
  //         notes: {
  //           address: "Razorpay Corporate Office",
  //         },
  //         theme: {
  //           color: "#F37254",
  //         },
  //       };

  //       const rzp1 = new window.Razorpay(options);
  //       rzp1.open();
  //     } catch (error) {
  //       console.error("Error initiating payment:", error);
  //       // Handle the error, display an error message, etc.
  //     }
  //   }
  // };


  
  return (
    <center>
    <div className="payment-page">
      <h2 className="summary">Payment Summary</h2>
      <img  className ="Raro" src={blue}/>
      {/* <button  className="procc"onClick={openRazorpayModal}>
        Pay  
      </button> */}
      <div className="pay">
      <div className="amount"> Amount Payable: ₹ {totalAmount}</div>
      </div>
    </div>
    </center>
  );
};

export default PaymentPage;
