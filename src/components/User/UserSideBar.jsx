import { Paper } from '@mui/material'
import { render } from '@testing-library/react'
import { Image } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
const UserSideBar = () => {
    return (
        <Paper style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginRight: 10,
            height: 480
        }}>
            <div>
                <Image src='https://images2.thanhnien.vn/Uploaded/nguyenvan/2022_09_09/thanh-loc-doanhnhansaigon1-1508430693-750x0-8136.jpg' style={{
                    width: 200,
                    height: 200,
                    marginTop: -100,
                    borderRadius: 10
                }}></Image>
            </div>
            <div className='userProfile'>
                <div className='userProfile_Item'>
                    <i class="ri-account-circle-line"></i>
                    <Link to='/profile'><p>Your information</p></Link>
                </div>
                <div className='userProfile_Item'>
                    <i class="ri-article-line"></i>
                    <Link to='/history'><p>Order history</p></Link>
                </div>
                <div className='userProfile_Item'>
                    <i class="ri-logout-circle-line"></i>
                    <Link to='/home' onClick={()=> localStorage.clear()}><p>Log out</p></Link>
                </div>
            </div>
        </Paper >
    )
}

export default UserSideBar