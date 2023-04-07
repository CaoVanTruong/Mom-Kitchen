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
import AdminHome from "../pages/admin/AdminHome";
import Checkout from "../components/UI/checkout/Checkout";
import Sidebar from "../components/Sidebar/Navbar";
import Layout from "../components/Layout/Layout";

function AdminRouters() {
  return (
      <Routes>
        <Route path="/sidebar" element={
        <Sidebar/>} />
      </Routes>

  );
};

export default AdminRouters;
