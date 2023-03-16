import { useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { Layout, NotLoggedInOnly } from "./components";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hook";

import {
  Home,
  About,
  Contact,
  OurStore,
  Product,
  Login,
  Register,
  Cart,
  Checkout,
  Checkout2,
  Profile,
  ForgotPassword,
  ResetPassword,
  Deal,
} from "./pages";

import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<OurStore />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/deal" element={<Deal />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout2 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
