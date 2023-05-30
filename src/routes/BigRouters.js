import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserManagement from "../pages/admin/UserManagement";
import MarketManagement from "../pages/admin/MarketManagement";
import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/admin/Dashboard";
import AdminProfile from "../pages/admin/AdminProfile";
import OrderForm from "../components/UI/order/OrderForm";
import HistoryTab from "../pages/user-profile/HistoryTab";
import OrderDetail from "../components/UI/order/OrderDetail";
import AccountManagement from "../pages/admin/AccountManagement";
import SessionAndBatch from "../pages/admin/SessonAndBatch";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import { Fragment } from "react";

const BigRouters = () => {
  return (
    <Fragment>
    <Routes>
      {/* <Route element={<Toaster />} /> */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/user" element={<Home />} />
      <Route path="/userManagement" element={<UserManagement />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/marketManagement" element={<MarketManagement />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminProfile" element={<AdminProfile />} />
      <Route path="/orderForm" element={<OrderForm />} />
      <Route path="/history" element={<HistoryTab />} />
      <Route path="/orderDetail" element={<OrderDetail />} />
      <Route path="/accountManagement" element={<AccountManagement />} />
      <Route path="/sessionAndBatch" element={<SessionAndBatch />} />
    </Routes>
    </Fragment>
  );
};

export default BigRouters;
