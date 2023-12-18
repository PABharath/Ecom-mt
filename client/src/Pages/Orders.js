import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css"; // Import the CSS file

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/orders");

      const data = response.data.orders;

      const ordersWithFormattedData = data.map((order) => {
        return {
          orderId: order.orderId,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          totalAmount: order.totalAmount,
          products: order.products.map((product) => {
            return {
              productName: product.productName,
              // Add other product properties you want to display
            };
          }),
        };
      });

      setOrders(ordersWithFormattedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="ecom-container">
      <div className="ecom-main-container">
        <h1>Your Orders</h1>
        {orders.map((order) => (
          <div key={order.orderId} className="order-table-container">
            <h3>Order ID: {order.orderId}</h3>
            <table className="ecom-order-table">
              <thead>
                <tr>
                  <th>ORDER PLACED</th>
                  <th>TOTAL</th>
                  <th>SHIP TO</th>
                  <th>View Order Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.orderDate}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>available</td>
                  <td>
                    <a
                      className="ecom-link"
                      href={`/order-details/${order.orderId}`}
                    >
                      View Order Details
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="ecom-delivery-info-container">
              <div className="ecom-image-box">
                {/* Assuming product image URL is available in the first product */}
                <img
                  src={`http://127.0.0.1:5555/api/uploads/${order.products[0]?.productImages[0]}`}
                  alt="Product Image"
                  className="ecom-image"
                />
              </div>
              <div className="ecom-delivery-details">
                <p>
                  Delivery By {new Date(order.orderDate).toLocaleDateString()}
                </p>
                {order.products && order.products.length > 0 ? (
                  order.products.map((product) => (
                    <p key={product.productName}>{product.productName}</p>
                  ))
                ) : (
                  <p>No products in this order</p>
                )}
                <div className="ecom-buttons">
                  <button className="ecom-view-items-btn">View Your Item</button>
                  <button className="ecom-delivery-status-btn">
                    Delivery Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
