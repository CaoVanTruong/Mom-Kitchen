
import logo from "../../assets/images/res-logo.png";
import { Image, Typography, Space, Badge, Drawer } from 'antd';
import { BellOutlined, UserOutlined } from "@ant-design/icons"
import '../../styles/bootstrapNavbar.css'
import { useState } from 'react';
import { green } from "@mui/material/colors";
function BootstrapNavbar() {
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    return (
        <div className='admin_navbar'
        >
            <img
                width={40}
                src={logo} alt='logo'
                style={{
                    marginLeft: 20
                }}></img>
            <Space>
                <BellOutlined
                    className="bellIcon"
                    onClick={() => setNotificationOpen(true)}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Space>
                        <UserOutlined style={{
                            fontSize: 25,
                            color: 'yellowgreen'
                        }} />
                        <span style={{
                            color: 'red'
                        }}>{localStorage.getItem('user-infor')}(Admin)</span>

                    </Space>
                </div>
            </Space>
            <Drawer title="Notifications" open={notificationOpen} onClose={() => setNotificationOpen(false)}
                maskClosable
            >

            </Drawer>
        </div>
    );
}

export default BootstrapNavbar;