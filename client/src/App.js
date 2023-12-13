import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import BlogPost from "./Pages/BlogPost";
import Footer from "./Pages/FooterPage";
import Home from "./Pages/Home";
import Login from "./Auth2/Login";
import Register from "./Auth2/Register";
import Forgot from "./Auth2/Forgot";
import Forgotnewpassword from "./Auth2/Forgotnewpassword";
import Forgotverify from "./Auth2/Forgotverification";
import IntegratedAddressPage from "./Pages/IntegratedAddressPage";
import Invoice from "./Pages/Invoice";
import ContactUs from "./Pages/ContactUs";
import Orders from "./Pages/Orders";
import ProductForm from "./Pages/ProductForm";
import ProductList from "./Pages/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import { CartProvider } from "./Pages/CreateContext";
import Cart from "./Pages/Cart";
import PaymentPage from "./Pages/PaymentPage";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import AddAddressPage from "./Pages/AddAddressPage";
import Profile from "./Auth2/Profile";
import { AuthProvider } from "./Auth2/AuthProvider";
import useAuth from './Auth2/useAuth';
import Information from "./Pages/Information";
import Shop from "./Pages/Shop";
import Kanjeevaram from "./Pages/Kanjeevaram";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Forgot" element={<Forgot />} />
              <Route path="/Forgotnewpassword" element={<Forgotnewpassword />} />
              <Route path="/Forgotverify" element={<Forgotverify />} />
              {/* <Route path="/Profile" element={<ProfileWrapper />} /> */}
              <Route path="/Profile" element={<Profile />} />
              <Route path="/ProductForm" element={<ProductForm />} />
              <Route path="/BlogPost" element={<BlogPost />} />
              <Route path="/ProductList" element={<ProductList />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Shop" element={<Shop />} />
              {/* <Route path="/Addaddress" element={<AddAddressPage/>} /> */}
              <Route
                path="/IntegratedAddressPage"
                element={<IntegratedAddressPage />}
              />
             <Route
                path="/Payment"
                element={
                  <Elements stripe={loadStripe("pk_test_51NZ8O0SII7pguLOZyXrsXLAaaK04XwK5MXOTW4KqLGNT9TJJfEICTL4d8F8q6TRl0npDALXbafmRCKSTNUSJjuiU00hWoo6wif")}>
                    <PaymentPage />
                  </Elements>
                }
              />
              <Route path="/Invoice" element={<Invoice />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/Information" element={<Information />} />
              <Route path="/Kanjeevaram" element={<Kanjeevaram />} />
            </Routes>
            <Footer />
          </CartProvider>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </div>
  );
};

// const ProfileWrapper = () => {
//   const { user, logout } = useAuth();

//   return <Profile user={user} logout={logout} />;
// };

export default App;
