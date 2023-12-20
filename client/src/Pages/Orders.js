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
      console.log("API Response:", response);
  
      const data = response.data.orders;
  
      const ordersWithFormattedData = data.map((order) => {
        return {
          orderId: order.orderId,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          totalAmount: order.totalAmount,
          expectedDeliveryDate: order.expectedDeliveryDate,
          products: order.products.map((product) => {
            return {
              productName: product.productName,
              productImages: product.productImages,
              productId: product.productId,
            };
          }),
        };
      });
  
      console.log("Formatted Orders:", ordersWithFormattedData);
  
      setOrders(ordersWithFormattedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  // const fetchOrders = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5555/api/orders");
  //     console.log("API Response:", response);

  //     const data = response.data.orders;

  //     const ordersWithFormattedData = data.map((order) => {
  //       return {
  //         orderId: order.orderId,
  //         orderDate: new Date(order.orderDate).toLocaleDateString(),
  //         totalAmount: order.totalAmount,
  //         expectedDeliveryDate: order.expectedDeliveryDate,
  //         products: order.products.map((product) => {
  //           return {
  //             productName: product.productName,
  //             productImages: product.productImages,
  //             productId: product.productId, // Make sure productId is available
  //           };
  //         }),
  //       };
  //     });

  //     console.log("Formatted Orders:", ordersWithFormattedData);

  //     setOrders(ordersWithFormattedData);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   }
  // };

  return (
    <div>
      <Navbar2 />
      <h1>Your Orders</h1>
      <div className="ecom-container">
        {orders.map((order) => (
          <div key={order.orderId} className="order-table-container">
            <table className="ecom-order-table">
              <thead>
                <tr>
                  <th>ORDER PLACED</th>
                  <th>TOTAL</th>
                  <th>SHIP TO</th>
                  <th>Order ID</th>
                  <th>View Order Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.orderDate}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>Address</td>
                  <td> {order.orderId}</td>
                  <td>
                
                    <Link className="ecom-link" to={`/invoice/${order.orderId}`}>
                        View Invoice
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
                  alt="Product"
                  className="ecom-image"
                  onLoad={() => console.log("Image loaded successfully")}
                  onError={(e) => console.error("Error loading image:", e)}
                />
              </div>
              <div className="ecom-delivery-details">
                <p>
                  Delivery By{" "}
                  {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                </p>

                {order.products && order.products.length > 0 ? (
                  order.products.map((product) => (
                    <p key={product.productName} className="ecom-product-name">
                      {product.productName}
                    </p>
                  ))
                ) : (
                  <p>No products in this order</p>
                )}
                <div key={order._id} className="ecom-buttons">
               
                    <button className="ecom-view-items-btn">
                      <Link
                        to={`/products/${order.products[0]?.productId}`}
                        className="ecom-link-a"
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

export default Orders;

