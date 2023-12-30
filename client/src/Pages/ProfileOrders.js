import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Orders.css";

import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [token] = useState(localStorage.getItem('token'));
  
  useEffect(() => {
    fetchOrders();
  }, []);


  const handleViewInvoice = (order) => {
    setCurrentOrder(order);
    generateInvoicePDF(order);
  };

  const generateInvoicePDF = (order) => {
    // Create an HTML template for the PDF content
    const pdfContent = `
      <div style="font-family: 'Helvetica', sans-serif;">
      <h2 style="text-align: center;">Invoice Details</h2>

        <p><strong> Order ID :</strong>${order.orderId}</p>
        <p><strong>Order Date :</strong> ${order.orderDate}</p>
        ${order.address.map((address)=>`
        <p><strong>Address :</strong></p>
        <p>${address.fullName},${address.mobileNumber}</P>
        <p> ${address.addressLine},${address.area}</p>
        <p> ${address.town},${address.state}</p>
        <p> ${address.country},${address.pincode}</p>
        `
        )}
        
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.products.map(
              (product) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${product.productName}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">₹${product.sp}</td>
                 
                  <td style="border: 1px solid #ddd; padding: 8px;">${product.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">₹${product.sp*product.quantity}</td>
                  
                </tr>
              `
            ).join('')}
          </tbody>
        </table>
       
        <hr />
  
        <p style="text-align: right;"><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      </div>
      <p><strong>Expected Delivery Date:</strong> ${order.expectedDeliveryDate}</p>
  
    `;
  
    // Create a new jsPDF instance
    const pdf = new jsPDF();
  
    // Convert the HTML content to PDF
    html2pdf(pdfContent, {
      margin: 10,
      filename: `order_and_invoice_${order.orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };
  
  

  useEffect(() => {
    axios
      .get('http://localhost:5555/api/profile', {
        headers: {
          'x-token': token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.user.orders);
      })
      .catch((err) => console.log(err));
  }, [token]);




  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5555/");
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
      
      <h4 className="orders-heading">Your Orders</h4>
      <div className="ecom-container">
        {orders.map((order) => (
          <div key={order.orderId} className="order-table-container">
            <table className="ecom-order-table">
              <thead>
                <tr>
                  <th>Order Placed</th>
                  <th>Total</th>
                  <th>Ship To</th>
                  <th>Order ID</th>
                 
                  <th>Delivery By</th>
                  <th>Delivery Status</th>
                  <th>View Order Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {order.orderDate}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>Address</td>
                  <td> {order.orderId}</td>
                  <td> 
                    {/* Delivery By{" "} */}
                  {new Date(order.expectedDeliveryDate).toLocaleDateString()}</td>
                  <td><button className="ecom-delivery-status-btn">
                   Status
                  </button> </td>
                  <td>
                
                  <button
                      className="ecom-link"
                      onClick={() => handleViewInvoice(order)}
                    >
                      View Invoice
                    </button>
                  </td>``
                </tr>
              </tbody>
            </table>

            <div className="ecom-delivery-info-container">
            <div className="ecom-image-box">
  {/* Assuming product images are available in the first product */}
  {order.products && order.products.length > 0 ? (
    order.products.map((product, index) => (
      <div key={index} className="ecom-product-item">
      <img
        
        src={`http://127.0.0.1:5555/api/uploads/${product.productImages?.[0] || "default-image.jpg"}`}
        alt={`Product ${index + 1}`}
        className="ecom-image"
        onLoad={() => console.log(`Image ${index + 1} loaded successfully`)}
        onError={(e) => console.error(`Error loading image ${index + 1}:`, e)}
      />
      <p className="ecom-product-name">{product.productName}</p>
      <button className="ecom-view-items-btn">
                      <Link
                        to={`/products/${product?.productId}`}
                        className="ecom-link-a"
                      >
                        View Your Item
                      </Link>
                    </button>
      </div>
    ))
  ) : (
    <p>No products in this order</p>
  )}
</div>

              {/* <div className="ecom-delivery-details">
                <p>
                  Delivery By{" "}
                  {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                </p>

                
                <div  className="ecom-buttons">
               <button className="ecom-delivery-status-btn">
                    Delivery Status
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
