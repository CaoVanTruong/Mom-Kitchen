import React from 'react'
import Navbar from '../../components/Sidebar/Navbar'
import '../../styles/admin-home.css'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
const AdminHome = () => {
  return (
    <div style={{
      width:'100%',
      backgroundColor:'black'
    }}>
      {/* <Navbar /> */}
      <BootstrapNavbar/>
      <p className='hihi'>haha</p>
      </div>
  )
}

export default AdminHome