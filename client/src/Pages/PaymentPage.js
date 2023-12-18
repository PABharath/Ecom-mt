import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './Payment.css';
import blue from '../Assets/blue.jpg';
import { useCart } from "./CreateContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [order, setOrder] = useState(null);
  const totalAmount = location.state ? location.state.totalAmount : 0;

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      const minimumAmount = 1.0;
      const calculatedAmount = Math.max(minimumAmount, totalAmount);

      const response = await axios.post(
        "http://localhost:5555/api/checkout",
        { totalAmount: calculatedAmount }
      );
      

      const order = response.data.order;

      console.log("Payment successful:", paymentResponse);
      console.log("Order created:", order);
         
      // Here you can navigate to a success page or perform other actions
      navigate("/success"); // Update the route to your success page
    } catch (error) {
      console.error("Error creating order:", error.response || error.message);
      // Handle the error, display an error message, etc.
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    // Handle the payment error, display an error message, etc.
  };

  const openRazorpayModal = () => {
    console.log("Button clicked.");
    if (window.Razorpay) {
      try {
        const options = {
          key: "rzp_test_7ffWepXdK0WViE",
          amount: totalAmount * 100,
          name: "Matrical Technologies",
          description: "Payment for Your Products",
          handler: handlePaymentSuccess,
          prefill: {
            email: "nitinkaroshi34@gmail.com",
            contact: "1234567890",
          },
          notes: {
            address: "First Floor, Raghvendra Complex, Remco Bhel Layout, BEML Layout 3rd Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098",
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error("Error initiating payment:", error);
        // Handle the error, display an error message, etc.
      }
    }
  };

  const handleCreateOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/orders/create",
        { cartItems, totalAmount }
      );

      const createdOrder = response.data.order;
      console.log("Order created:", createdOrder);

      setOrder(createdOrder);

      toast.success("Order created successfully!");
    } catch (error) {
      console.error("Error creating order:", error.response || error.message);
      toast.error("Error creating order. Please try again.");
    }
  };

  return (
    <center>
      <div className="payment-page">
        <h2 className="summary">Payment Summary</h2>
        <img className="Raro" src={blue} alt="Blue" />
        <button className="procc" onClick={openRazorpayModal}>
          Pay
        </button>
        <div className="paya">
          <div className="amount"> Amount Payable: ₹ {totalAmount}</div>
        </div>
        <button className="create-order" onClick={handleCreateOrder}>
          Create Order
        </button>
      </div>
      {order && (
        <div>
          <h3>Your Order Details</h3>
          <p>Order ID: {order.orderId}</p>
          {/* Display other order details as needed */}
        </div>
      )}
      {<ToastContainer position="top-center" autoClose={3000} />}
    </center>
  );
};

export default PaymentPage;
