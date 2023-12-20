import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';
import axios from 'axios';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Invoice = (props) => {
  const [orderDetails, setOrderDetails] = useState(null);

  // Destructure match from props
  const { match } = props;

  // Simulate fetching order details from the backend API
  useEffect(() => {
    // Fetch order details from your backend API here using axios
    const orderId = match.params.orderId;
    fetchOrderDetails(orderId);
  }, [match.params.orderId]);

  // Function to fetch order details from the backend using axios
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5555/api/orders/${orderId}`);
      const data = response.data;

      // Assuming the API response contains the order details
      setOrderDetails(data.order);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  // Function to generate PDF
  const generatePDF = () => {
    if (!orderDetails) {
      console.error('Order details not available');
      return;
    }

    const { orderId, orderDate, products, totalAmount, expectedDeliveryDate } = orderDetails;

    const docDefinition = {
      content: [
        { text: `Invoice #${orderId}`, style: 'header' },
        { text: 'Logo', style: 'subheader' },
        { text: new Date(orderDate).toLocaleDateString(), style: 'subheader' },
        { text: 'BILL TO', style: 'subheader' },
        `Name,`,
        `Address`,
        `Ph.No: 01234567890`,
        { text: 'item', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'], // Define column widths
            body: [
              // Table header
              ['Product', 'PRICE', 'Qty', 'TOTAL'],
              // Table data
              ...products.map((product) => [
                product.productName || '',
                `₹ ${product.price || 0}`,
                product.quantity || 0,
                `₹ ${product.total || 0}`,
              ]),
            ],
          },
        },
        `Product could be expected on ${new Date(expectedDeliveryDate).toLocaleDateString()}, Track your order.`,
        `Sub - Total = ₹ ${totalAmount || 0}`,
        `Total = ₹ ${totalAmount || 0}`,
      ],
      styles: {
        header: {
          fontSize: 25,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 5],
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    // Generate the PDF and download
    pdfDocGenerator.getBlob((blob) => {
      saveAs(blob, `invoice_${orderId}.pdf`);
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {orderDetails ? (
        <>
          <u>
            <h1>Invoice #{orderDetails.orderId}</h1>
          </u>
          <br></br>
          <br></br>
          {/* Display the fetched data in a table */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName || ''}</td>
                  <td>₹ {product.price || 0}</td>
                  <td>{product.quantity || 0}</td>
                  <td>₹ {product.total || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <br></br>

          <center>
            <button
              onClick={generatePDF}
              style={{
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '10px 0',
                cursor: 'pointer',
              }}
            >
              Download PDF
            </button>
          </center>
        </>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default Invoice;
