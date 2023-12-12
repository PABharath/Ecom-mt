import React, { useContext, useState } from "react";
import "./Cart.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CreateContext";

export const calculateTotal = (cartItems) => {
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.sp * item.quantity,
      0
    );
  };

  const calculateDelivery = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500 ? 0 : 50;
  };

  return calculateSubtotal() + calculateDelivery();
};

function Cart() {

  // const [couponcode,setCoupondata]=useState('')
  // const [couponData,setCoupondata]=useState({
  //   couponcode:'',
  // })
  const [inputValue, setInputValue] = useState('');

  // const usderChange=(e)=>{
  //   const {name,value}=e.target;
  //   setCoupondata({
  //     ...couponData,
  //   [name]: value});
  // }
//   const usderChange=(e)=>{
//     const {name,value}=e.target;
//     setCoupondata({
//       ...couponData,
//     [name]: value});
//   }
//  const usderSubmit=(e)=>{
//   e.preventDefault();
//   alert('Applied 100 discount')
//  }
const usderSubmit=(e)=>{
  e.preventDefault();
  if(inputValue==='NEW100'){
    alert('coupon applied succesfully')
  }
  else{
    alert('error')
  }
}
  
  const { cartItems, removeFromCart, handleDecrement, handleIncrement } =
    useContext(CartContext);

  const isCartEmpty = cartItems.length === 0;

  const navigate = useNavigate();

  const handleNextClick = () => {
    if (isCartEmpty) {
      alert("Please add a product to the cart to continue.");
    } else {
      navigate("/IntegratedAddressPage", {
        state: { totalAmount: calculateTotal() },
      }); // Navigate with state
    }
  };

  console.log("Cart Items:", cartItems);

  const handleRemoveProduct = (productId) => {
    removeFromCart(productId);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.sp * item.quantity,
      0
    );
  };
  const coponapply=()=>{
    const discount=100;
    if(inputValue==='NEW100'){
      return discount;
    }
    else{
      return 0;
    }
  }
  const calculateDelivery = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500 ? 0 : 50;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDelivery() -coponapply();
  };
  const calculateTotal1 = () => {
    return calculateSubtotal() + calculateDelivery() ;
  };
  console.log("Cart Items:", cartItems);

  return (
    <div className="App">
      <main className="main-container">
        <form className="product-form">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan="4">No products in Cart!</td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td colSpan="1">
                      <div className="row">
                        <div className="product-info">
                          <div className="product-image-box">
                            {item.productImages &&
                            item.productImages.length > 0 ? (
                              <div className="image-with-description">
                                <img
                                  className="imagee-cart"
                                  src={`http://127.0.0.1:5555/api/uploads/${item.productImages[0]}`}
                                  alt={`Product ${item.productId}`}
                                  width="100"
                                  height="100"
                                />
                              </div>
                            ) : (
                              <p>No image available</p>
                            )}
                            <h6 className="name">{item.productName}</h6>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <center>
                        <b>₹ {item.sp}</b>
                      </center>
                    </td>
                    <td className="quantity-box">
                      <button
                        type="button"
                        className="bt"
                        onClick={() => handleDecrement(item.productId)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="bt"
                        onClick={() => handleIncrement(item.productId)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <b>₹{item.sp * item.quantity}</b>
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(item.productId)}
                          className="remove-icon"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <td colSpan="4">
                <div className="custom-footer">
                  <Link to="../ProductList">
                    <button type="submit" className="btn btn-primary">
                      Continue Shopping
                    </button>
                  </Link>
                  <button
                    className="cart-next-button"
                    disabled={isCartEmpty}
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                </div>
              </td>
            </tfoot>
          </table>
        </form>
        {/* Additional table for cart total */}
        <div className="cart-total-table">
          <form>
          <table className="table">
            <thead>
              <tr>
                <th colSpan="2">Cart Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>₹{calculateSubtotal()}</td>
              </tr>
              <tr>
                <td>Delivery</td>
                <td>₹{calculateDelivery()}</td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>₹{calculateTotal1()}</td>
              </tr>
              <tr>
              
               <td >
               <input 
               className="coupon-inputvik"
        type="text" 
        name="inputValue"
        value={inputValue} 
        placeholder="Coupon code"
        onChange={e => setInputValue(e.target.value)}
      />
                  <button className=" buttoncoupn" onClick={usderSubmit}>Apply</button>
                  {inputValue === 'NEW100' && <p className="Couponalert">Coupon NEW100 Applied and discount 100/-</p>}
                </td>
             
              </tr>
              <tr>
                <td>Final Bill</td>
                <td>₹{calculateTotal()}</td>
              </tr>
            </tbody>
          </table>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Cart;
