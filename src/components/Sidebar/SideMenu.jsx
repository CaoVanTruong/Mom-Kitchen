import React, { Children, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import '../../styles/sideMenu.css'
import logo from "../../assets/images/res-logo.png";
import { Menu } from 'antd'
import { AppstoreOutlined, UserOutlined, ShoppingCartOutlined, SolutionOutlined, LogoutOutlined, IdcardOutlined, ApartmentOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom';
function SideMenu() {

    const navigate = useNavigate()
    const logOut = () => {
        localStorage.clear()
        navigate('/home')
    }
    const menuItem = [
        {
            key: '/dashboard',
            label: "Dashboard",
            icon: <AppstoreOutlined />
        },
        {
            key: '/marketManagement',
            label: "Market",
            icon: <ShoppingCartOutlined />
        },
        {
            key: '/sessionAndBatch',
            label: "Session | Batch",
            icon: <ApartmentOutlined />
        },
        {
            key: '/userManagement',
            label: "User",
            icon: <UserOutlined />
        },
        {
            key: '/accountManagement',
            label: "Account",
            icon: <IdcardOutlined />
        },
        // {
        //     key: '/adminProfile',
        //     label: "Admin Profile",
        //     icon: <SolutionOutlined />
        // },
        {
            key: '/home',
            label: 'Log out',
            icon: <LogoutOutlined />,
            danger: true
        },
    ]
    return (
        <div className='SideMenu'>
            <Menu
                className='SideMenuVertical'
                mode='vertical'
                onClick={(item) => {
                    navigate(item.key)
                    if (item.key === '/home') {
                        localStorage.clear()
                    }
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



