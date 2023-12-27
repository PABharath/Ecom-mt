import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Profile from "./Auth2/Profile";
import { AuthProvider } from "./Auth2/AuthProvider";
import Information from "./Pages/Information";
import Shop from "./Pages/Shop";
import SareesCategories2 from "./Pages/SareesCategories2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "animate.css/animate.min.css";
import Navbar2 from "./Pages/Navbar2";
import Filter from "./Pages/Filter";
import Latest from './Pages/Latest';
import Seller from "./Pages/Seller";
import Search from "./Pages/Search";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <CartProvider>
            <Routes>
              <Route path="/Navbar2" element={<Navbar2 />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Forgot" element={<Forgot />} />
              <Route
                path="/Forgotnewpassword"
                element={<Forgotnewpassword />}
              />
              <Route path="/Forgotverify" element={<Forgotverify />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/ProductForm" element={<ProductForm />} />
              <Route path="/BlogPost" element={<BlogPost />} />
              <Route path="/ProductList" element={<ProductList />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Shop" element={<Shop />} />
              <Route
                path="/IntegratedAddressPage"
                element={<IntegratedAddressPage />}
              />
              <Route path="/Payment" element={<PaymentPage />} />
              <Route path="/Invoice" element={<Invoice />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/Information" element={<Information />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products/:productId" component={ProductDetails} />

              <Route
                path="/SareesCategories2"
                element={<SareesCategories2 />}
              />
                <Route path="/Latest" element={<Latest />} />
              <Route path="/Filter" element={<Filter />} />
              <Route path="/Seller" element={<Seller />} />
            </Routes>
            <Footer />
          </CartProvider>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
