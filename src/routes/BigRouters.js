import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import AdminHome from "../pages/admin/AdminHome";
import Checkout from "../components/UI/checkout/Checkout";
import Sidebar from "../components/Sidebar/Navbar";
import Layout from "../components/Layout/Layout";
import Routers from "./Routers";
import AdminRouters from "./AdminRouters";
import UserManagement from "../pages/admin/UserManagement";
import AdminHome from "../pages/admin/AdminHome";
import ProductManagement from "../pages/admin/ProductManagement";
import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/admin/Dashboard";
import AdminProfile from "../pages/admin/AdminProfile";
import OrderForm from "../components/UI/order/OrderForm";

const BigRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/user" element={<Home />} />
      {/* <Route path="/admin" element={<Dashboard />} /> */}
      <Route path="/userManagement" element={<UserManagement />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/productManagement" element={<ProductManagement />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminProfile" element={<AdminProfile />} />
      <Route path="/order" element={<OrderForm />} />

    </Routes>

  );
};

export default BigRouters;
