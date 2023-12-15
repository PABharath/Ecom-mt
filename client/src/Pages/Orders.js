import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // const response = await axios.get('http://localhost:5555/api/get-orders');
      const response = await axios.get('http://localhost:5555/get-orders');

      const data = response.data.orders;

      const ordersWithProducts = await Promise.all(
        data.map(async (order) => {
          // const productResponse = await axios.get(`/api/get-order-details/${order.orderId}`);
          const productResponse = await axios.get(`/api/get-order-details/${order.orderId}`);

          const orderWithProducts = { ...order, products: productResponse.data.products };
          return orderWithProducts;
        })
      );

      setOrders(ordersWithProducts);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  return (
    <div>
      <div style={styles.container}>
        <h1>Your Orders</h1>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order.orderId}</p>
              <p>Total Amount: {order.totalAmount}</p>
              <p>Products:</p>
              <ul>
                {order.products.map((product) => (
                  <li key={product._id.$oid}>
                    <p>Product ID: {product.productId.$oid}</p>
                    <p>Product Name: {product.productName}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

         <table className="order-table" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ORDER PLACED</th>
              <th style={styles.th}>TOTAL</th>
              <th style={styles.th}>SHIP TO</th>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>View Order Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}></td>
              <td style={styles.td}></td>
              <td style={styles.td}></td>
              <td style={styles.td}></td>
              <td style={styles.td}>
              <a style={styles.a} href="/invoice">View Invoice</a>

              </td>
            </tr>
          </tbody>
        </table> 


        <div style={styles.deliveryInfoContainer}>
          <div className="image-box">
            {/* <img src={logo} alt="Product Image" style={styles.image} /> */}
          </div>
          <div className="delivery-details" style={styles.deliveryDetails}>
            <p>Delivery By 5th July 2023</p>
            <p>Taranga Kanchi Silk Brocade Green Saree</p>
          
          <div className="buttons" style={styles.button}>
            <button className="view-items-btn" style={styles.yellowButton}>
              View Your Item
            </button>
            <button className="delivery-status-btn" style={styles.blueButton}>
              Delivery Status
            </button>
          </div></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '3px solid black',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: '0 auto',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    borderRadius: '4px',

  },
  th: {
    backgroundColor: 'lightcyan',
    padding: '20px',
    textAlign: 'left',
    borderRadius: '10px',
    


  },
  td: {
    backgroundColor: 'lightcyan',
    padding: '20px',
    textAlign: 'left',
    border: '1px solid #ccc',
    // borderRadius: '24px',

  },
  yellowButton: {
    backgroundColor: 'gold',
    // padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    color: 'black',
    
    cursor: 'pointer',
  },
  blueButton: {
    backgroundColor: 'black',
    // padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
  },
  deliveryInfoContainer: {
    display: 'flex',
    // alignItems: 'left',
    marginLeft: '-350px',
  },
  image: {
    width: '150px',
    height: '150px',
    marginLeft: '-10px',
  },
  deliveryDetails: {
    // marginLeft: '350px',
  },
  a:{
color:'blue',
  },
  button:{
    display: 'flex',

  },
};

export default Orders;