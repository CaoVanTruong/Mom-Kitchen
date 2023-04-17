// import React, { Children, useState } from 'react'
// import { NavLink, Link } from 'react-router-dom'
// import '../../styles/navbar.css'
// import logo from "../../assets/images/res-logo.png";

// function Navbar() {
//     const [sidebar, setSidebar] = useState(false)
//     const showSidebar = () => setSidebar(!sidebar)
//     const menuItem = [
//         {
//             cName: 'nav-text',
//             path: '/dashboard',
//             title: "Dashboard",
//             icon: <i className="ri-dashboard-line"></i>
//         },
//         {
//             cName: 'nav-text',
//             path: '/productManagement',
//             title: "Product",
//             icon: <i class="ri-shopping-cart-line"></i>
//         },
//         {
//             cName: 'nav-text',
//             path: '/userManagement',
//             title: "User",
//             icon: <i class="ri-user-settings-line"></i>
//         },
//     ]
//     return (
//         <div>
//             <div className='navbarHeader__admin'>
//                 {/* <div className="logo_Admin"> */}
//                     <img src={logo} alt="logo"/>
//                     <h5>Mom-Kitchen</h5>
//                 {/* </div> */}
//                 {/* <div className='horizonNavbar__admin'> */}
//                     <span style={{
//                         cursor: 'pointer'
//                     }}><i class="ri-notification-2-line"></i></span>
//                     <div class="dropdown">
//                         <button class="dropbtn">
//                             <span><i class="ri-user-6-line"></i></span>
//                             <span style={{
//                                 marginLeft: 5,
//                             }}>TuanDM</span>
//                         </button>
//                         <div class="dropdown-content">
//                             <a href="#">Profile infor</a>
//                             <Link to='/home'>Log out</Link>
//                         </div>
//                     </div>
//                 {/* </div> */}

//             </div>
//             <div>
//                 <nav className='nav-menu'>
//                     <ul className='nav-menu-items'>
//                         <li className='navbar-toggle'>
//                             <h4 style={{
//                             }}>Mom-Kitchen</h4>
//                         </li>
//                         {menuItem.map((item, index) => {
//                             return (
//                                 <li key={index} className={item.cName}>
//                                     <Link to={item.path}>
//                                         <span>{item.icon}</span>
//                                         <span>{item.title}</span>
//                                     </Link>
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     )
// }

// export default Navbar




//         // <div className='navbar'>
//         //     <div className='top_section'>
//         //         <h3>Mom-Kitchen</h3>
//         //         <div className='bars' onClick={() => openClose()}>
//         //             <i className="ri-menu-2-line"></i>
//         //         </div>
//         //     </div>
//         //         {
//         //             menuItem.map((item, index) => (
//         //                 <NavLink to={item.path} key={index} className='link'>
//         //                     {/* <div className='nav__items'> */}
//         //                     <span className='icon'>{item.icon}</span>
//         //                     <span className='link_text'>{item.name}</span>
//         //                     {/* </div> */}
//         //                 </NavLink>
//         //             ))
//         //         }
//         //     {/* <main>{children}</main> */}
//         // </div>