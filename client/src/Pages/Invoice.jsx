import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);

  // Simulate fetching data from the backend API
  useEffect(() => {
    // For demonstration purposes, we'll use a sample array of invoices
    const sampleInvoices = [
      {
        id: 1,
        date: '2023-07-22',
        customer: 'Matrical',
        description: 'Sample Bill 1',
      },
      {
        id: 2,
        date: '2023-07-23',
        customer: 'janardhan',
        description: 'Sample Bill 2',
      },
      {
        id: 1,
        date: '2023-07-22',
        customer: 'Matrical',
        description: 'Sample Bill 1',
      },
      {
        id: 2,
        date: '2023-07-23',
        customer: 'janardhan',
        description: 'Sample Bill 2',
      },
    


    ];

    // Simulate the API response delay with setTimeout
    setTimeout(() => {
      setInvoices(sampleInvoices);
    }, 2000); 
  }, []);

  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: 'Sample Invoice', style: 'subheader' },
        // Use the fetched data to populate the content of the PDF
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', '*'], // Define column widths
            body: [
              // Table header
              ['Invoice ID', 'Date', 'Customer', 'Description'],
              // Table data
              ...invoices.map((invoice) => [
                invoice.id,
                invoice.date,
                invoice.customer,
                invoice.description,
              ]),

              
            ],
          },
        },
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
      saveAs(blob, 'invoice.pdf');
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <u><h1>Invoice</h1></u>
      <br>
      </br>
      <br>
      </br>

      {/* Display the fetched data in a table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.date}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>



      <center>      <button
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
        }}>Download  PDF</button>
      </center>

    </div>
  );
};

export default Invoice;