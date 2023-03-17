import { useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { Layout, NotLoggedInOnly, LoggedInOnly } from "./components";
import {
  Home,
  OurStore,
  Product,
  Login,
  Register,
  Cart,
  Checkout2,
  Profile,
  ForgotPassword,
  ResetPassword,
  Deal,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<OurStore />} />
          <Route path="product/:id" element={<Product />} />
          <Route
            path="cart"
            element={
              <LoggedInOnly>
                <Cart />{" "}
              </LoggedInOnly>
            }
          />
          <Route
            path="profile"
            element={
              <LoggedInOnly>
                <Profile />
              </LoggedInOnly>
            }
          />
          <Route path="/deal" element={<Deal />} />
        </Route>

        <Route
          path="/login"
          element={
            <NotLoggedInOnly>
              <Login />
            </NotLoggedInOnly>
          }
        />
        <Route
          path="/checkout"
          element={
            <LoggedInOnly>
              <Checkout2 />
            </LoggedInOnly>
          }
        />
        <Route
          path="/register"
          element={
            <NotLoggedInOnly>
              <Register />
            </NotLoggedInOnly>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <NotLoggedInOnly>
              <ForgotPassword />
            </NotLoggedInOnly>
          }
        />
        <Route
          path="/reset-password/:id"
          element={
            <NotLoggedInOnly>
              <ResetPassword />
            </NotLoggedInOnly>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
