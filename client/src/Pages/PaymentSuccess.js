import React, { useState } from 'react';
import logo from '../Assets/logo.jpeg';
const PaymentSuccess = () => {
  const [orderId, setOrderId] = useState('#0123456789');

  const handleTrackOrder = () => {
    // You can implement the tracking logic here
    alert(`Tracking order ${orderId}`);
  };

  return (
    <div style={styles.container}>
    <img src={logo}  className='logo1' width={200} height={150} alt='logo'/><hr className='h'/>
      <h2>Your Order is successfully placed</h2>
      <p>Order Id : {orderId}</p>
      <button onClick={handleTrackOrder}>Track Order</button>
    </div>
  );
};


const styles = {
  container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      maxWidth: '700px',
      maxheight: '400px',
      
      margin: '0 auto',
  },
  submitButton:{
    padding: '1px',
    fontSize: '18px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  heading1:{
    fontSize: '15px',
  },

}




export default PaymentSuccess;