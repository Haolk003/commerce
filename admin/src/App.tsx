import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  Dashboard,
  Login,
  Product,
  ProductDetail,
  Category,
  Order,
  OrderDetail,
  Customer,
  CustomerOrder,
  Coupon,
} from "./pages";

import { MainLayout, LoggedInOnly, NotLoggedInOnly } from "./components";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <NotLoggedInOnly>
              <Login />
            </NotLoggedInOnly>
          }
        />
        <Route
          path="/admin"
          element={
            <LoggedInOnly>
              <MainLayout />
            </LoggedInOnly>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Product />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="categories" element={<Category />} />
          <Route path="orders" element={<Order />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="customer" element={<Customer />} />
          <Route path="customer-order/:id" element={<CustomerOrder />} />
          <Route path="coupons" element={<Coupon />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
