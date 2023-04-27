import React, { Children, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import '../../styles/sideMenu.css'
import logo from "../../assets/images/res-logo.png";
import { Menu } from 'antd'
import { AppstoreOutlined, UserOutlined, ShoppingCartOutlined, SolutionOutlined, LogoutOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom';
function SideMenu() {
    const navigate = useNavigate()
    const menuItem = [
        {
            key: '/dashboard',
            label: "Dashboard",
            icon: <AppstoreOutlined />
        },
        {
            key: '/productManagement',
            label: "Market",
            icon: <ShoppingCartOutlined />
        },
        {
            key: '/userManagement',
            label: "Customer",
            icon: <UserOutlined />
        },
        {
            key: '/adminProfile',
            label: "Admin Profile",
            icon: <SolutionOutlined />
        },
        {
            key: '/home',
            label: "Log out",
            icon: <LogoutOutlined />
        },
    ]
    return (
        <div className='SideMenu'>
            <Menu
                className='SideMenuVertical'
                mode='vertical'
                onClick={(item) => {
                    navigate(item.key)
                }}
                items={
                    menuItem
                }
            >
            </Menu>
        </div>
    )
}

export default SideMenu



