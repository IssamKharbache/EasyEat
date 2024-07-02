import React, { useState } from "react";
//router dom
import { Route, Routes } from "react-router-dom";
//pages
import HomePage from "./pages/Home/Home";
import CartPage from "./pages/Cart/Cart";
import PlaceOrderPage from "./pages/PlaceOrder/PlaceOrder";
//navabr
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import LoginModal from "./components/loginmodal/LoginModal";
import { Toaster } from "sonner";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/my-orders/MyOrders";
const App = () => {
  //modal logins state
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginModal setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Toaster richColors />
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<PlaceOrderPage />} />
          <Route path="/verify-order" element={<Verify />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
