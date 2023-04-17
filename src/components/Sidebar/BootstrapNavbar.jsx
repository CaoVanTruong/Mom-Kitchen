
import logo from "../../assets/images/res-logo.png";
import { Image, Typography, Space, Badge, Drawer } from 'antd';
import { MailOutlined, BellFilled, BellOutlined } from "@ant-design/icons"
import '../../styles/bootstrapNavbar.css'
import { useState } from 'react';
function BootstrapNavbar() {
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    return (
        <div className='admin_navbar'>
            <img
                width={40}
                src={logo} alt='logo'
                style={{
                    marginLeft:20
                }}></img>
            <Space>
                <BellOutlined style={{
                    fontSize: 24,
                    marginRight: 30

                }}
                    onClick={() => setNotificationOpen(true)}
                />
                <Image src={logo} width={30}></Image>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    TuanDM
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