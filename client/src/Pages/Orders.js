import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Orders.css";
import Navbar2 from "./Navbar2";


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
    <div>
      <Navbar2 />
      <div style={styles.container}>
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
                  <Link
                      className="ecom-link"
                      to={`/invoice/${order.orderId}`}
                    >
                      View Order Details
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="ecom-delivery-info-container">
              <div className="ecom-image-box">
                {/* Assuming product image URL is available in the first product */}
                <img
                  src={`http://127.0.0.1:5555/api/uploads/${
                    order.products[0]?.productImages?.[0] || "default-image.jpg"
                  }`}
                  alt="Product Image"
                  className="ecom-image"
                />
              </div>
              <div className="ecom-delivery-details">
                <p>
                  Delivery By{" "}
                  {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                </p>

                {order.products && order.products.length > 0 ? (
                  order.products.map((product) => (
                    <p key={product.productName}>{product.productName}</p>
                  ))
                ) : (
                  <p>No products in this order</p>
                )}
                <div className="ecom-buttons">
                  <button className="ecom-view-items-btn">
                    <Link
                      to={`/product-details/${order.products[0]?.productId}`}
                      className="ecom-link"
                    >
                      View Your Item
                    </Link>
                  </button>
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "3px solid black",
    borderRadius: "4px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "0 auto",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    borderRadius: "4px",
  },
  th: {
    backgroundColor: "lightcyan",
    padding: "20px",
    textAlign: "left",
    borderRadius: "10px",
  },
  td: {
    backgroundColor: "lightcyan",
    padding: "20px",
    textAlign: "left",
    border: "1px solid #ccc",
    // borderRadius: '24px',
  },
  yellowButton: {
    backgroundColor: "gold",
    // padding: '10px 20px',
    margin: "5px",
    border: "none",
    borderRadius: "4px",
    color: "black",

    cursor: "pointer",
  },
  blueButton: {
    backgroundColor: "black",
    // padding: '10px 20px',
    margin: "5px",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
  },
  deliveryInfoContainer: {
    display: "flex",
    // alignItems: 'left',
    marginLeft: "-350px",
  },
  image: {
    width: "150px",
    height: "150px",
    marginLeft: "-10px",
  },
  deliveryDetails: {
    // marginLeft: '350px',
  },
  a: {
    color: "blue",
  },
  button: {
    display: "flex",
  },
};

export default Orders;
