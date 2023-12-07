import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const totalAmount = location.state ? location.state.totalAmount : 0;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const minimumAmount = 1.0;
        const calculatedAmount = Math.max(minimumAmount, totalAmount);

        const response = await axios.post(
          "http://localhost:5050/api/create-order",
          { totalAmount: calculatedAmount }
        );
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order:", error.response || error.message);
      }
    };

    fetchOrder();
  }, [totalAmount]);

  const handlePaymentSuccess = (paymentResponse) => {
    console.log("Payment successful:", paymentResponse);
    // Here you can navigate to a success page or perform other actions
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    // Handle the payment error, display an error message, etc.
  };

  const openRazorpayModal = async () => {
    console.log("Button clicked. Order:", order);
    if (order && window.Razorpay) {
      console.log("Razorpay is available and order is present");
      try {
        const encodedOrderId = encodeURIComponent(order.orderId);
        console.log("Order:", order);
        const response = await axios.get(
          `http://localhost:5050/api/get-payment-pref/${encodedOrderId}`
        );
        const paymentPreferences = response.data.preferences;
        

        const options = {
          key: "rzp_test_7ffWepXdK0WViE",
          ...paymentPreferences,
          amount: order.amount * 1, // Convert amount to paise
          name: "Your Company Name",
          description: "Payment for Your Products",
          handler: handlePaymentSuccess,
          prefill: {
            email: "user@example.com",
            contact: "1234567890",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error("Error fetching payment preferences:", error);
        // Handle the error, display an error message, etc.
      }
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Summary</h2>
      <p>Total Amount: INR {totalAmount}</p>
      <button onClick={openRazorpayModal}>
        Proceed to Pay INR {totalAmount}
      </button>
    </div>
  );
};

export default PaymentPage;
