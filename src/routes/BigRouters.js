import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../components/UI/checkout/Checkout";
import UserManagement from "../pages/admin/UserManagement";
import ProductManagement from "../pages/admin/ProductManagement";
import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/admin/Dashboard";
import AdminProfile from "../pages/admin/AdminProfile";
import OrderForm from "../components/UI/order/OrderForm";
import HistoryTab from "../pages/user-profile/HistoryTab";
import OrderDetail from "../components/UI/order/OrderDetail";

const BigRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/user" element={<Home />} />
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
      <Route path="/orderForm" element={<OrderForm />} />
      <Route path="/history" element={<HistoryTab />} />
      <Route path="/orderDetail" element={<OrderDetail />} />
    </Routes>

  );
};

export default BigRouters;
