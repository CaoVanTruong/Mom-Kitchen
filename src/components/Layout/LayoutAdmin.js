import React from "react";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers.js";

import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../Sidebar/Navbar.jsx";
import AdminRouters from "../../routes/AdminRouters.js";

function LayoutAdmin() {
    return (
        <div>
            <div>
                <AdminRouters />
            </div>
        </div>

    );
};

export default LayoutAdmin;
