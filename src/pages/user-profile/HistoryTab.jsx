
import { Grid, Paper, TextField, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import '../../styles/user-profile.css'
import { Link } from 'react-router-dom'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import OrderTag from '../../components/UI/order/OrderTag'
import { Space } from 'antd'
import { Modal, Image } from 'antd'
import {
    DeleteOutlined, CloseOutlined, CheckCircleOutlined
} from '@ant-design/icons'
import { Label } from 'reactstrap'
import UserSideBar from '../../components/User/UserSideBar'
const HistoryTab = () => {
    const order = [
        {
            id: "1",
            userName: "First order",
            date: "3/3/2000",
            totalPrice: 25000,
            status: "Completed",
            title: "Mâm cơm tuổi thơ",
            building: 3,
            quantity: 2,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fgiadinh.mediacdn.vn%2F296230595582509056%2F2021%2F6%2F10%2Fphoto-2-16233134021221191674450.jpg&tbnid=7enGECasN4Y70M&vet=12ahUKEwi9rqbJ2tP-AhXBc3AKHZsUD4AQMygBegUIARC7AQ..i&imgrefurl=https%3A%2F%2Fgiadinh.suckhoedoisong.vn%2F8x-khoe-gan-20-mam-com-ngon-khien-ai-cung-muon-an-172210610152439077.htm&docid=E3Va0NwgCaWdIM&w=660&h=514&q=h%C3%ACnh%20m%C3%A2m%20c%C6%A1m&ved=2ahUKEwi9rqbJ2tP-AhXBc3AKHZsUD4AQMygBegUIARC7AQ"
        },
        {
            id: "2",
            userName: "First order",
            date: "3/3/2000",
            totalPrice: 25000,
            status: "Completed",
            title: "Mâm cơm tuổi thơ",
            building: 1,
            email: "chef@gmail.com",
            phone: "0903850291",
            quantity: 2,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fgiadinh.mediacdn.vn%2F296230595582509056%2F2021%2F6%2F10%2Fphoto-2-16233134021221191674450.jpg&tbnid=7enGECasN4Y70M&vet=12ahUKEwi9rqbJ2tP-AhXBc3AKHZsUD4AQMygBegUIARC7AQ..i&imgrefurl=https%3A%2F%2Fgiadinh.suckhoedoisong.vn%2F8x-khoe-gan-20-mam-com-ngon-khien-ai-cung-muon-an-172210610152439077.htm&docid=E3Va0NwgCaWdIM&w=660&h=514&q=h%C3%ACnh%20m%C3%A2m%20c%C6%A1m&ved=2ahUKEwi9rqbJ2tP-AhXBc3AKHZsUD4AQMygBegUIARC7AQ"
        },
        {
            id: "3",
            userName: "First order",
            date: "3/3/2000",
            totalPrice: 25000,
            title: "Mâm cơm tuổi thơ",
            status: "Completed",
            building: 2,
            quantity: 2,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fgiadinh.mediacdn.vn%2F296230595582509056%2F2021%2F6%2F10%2Fphoto-2-16233134021221191674450.jpg&tbnid=7enGECasN4Y70M&vet=12ahUKEwi9rqbJ2tP-AhXBc3AKHZsUD4AQMygBegUIARC7AQ..i&imgrefurl=https%3A%2F%2Fgiadinh.suckhoedoisong.vn%2F8x-khoe-gan-20-mam-com-ngon-khien-ai-cung-muon-an-172210610152439077.htm&docid=E3Va0NwgCaWdIM&w=660&h=514&q=h%C3%ACnh%20m%C3%A2m%20c%C6%A1m&ved=2ahUKEwi9rqbJ2tP-AhXBc3AKHZsUD4AQMygBegUIARC7AQ"
        }
    ]
    const [value, setValue] = useState('1');
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [dataSource, setDataSource] = useState(order)
    const [showingDetail, setShowingDetail] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [orders, setOrders] = useState([])
    const fetchAllOrder = () => {
        fetch(`https://momkitchen.azurewebsites.net/api/Order/getorderbyemailcustomer?emailcustomer=${localStorage.getItem('user-infor')}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Response not OK');
                }
                return res.json();
            })
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    console.log(JSON.stringify(orders))
    return (
        <div>
            <Header />
            <Container className='userProfile__container'>
                <UserSideBar />
                <div style={{
                    width: "100%",
                    height: "100%",
                }}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Completed" value="1" />
                                    <Tab label="Processing" value="2" />
                                    <Tab label="Canceled" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" style={{
                                backgroundColor: '#E0E8EF'
                            }}>
                                {/* {
                                    order.map((order) => (
                                        <div>
                                            <OrderTag props={order} />
                                        </div>
                                    ))
                                } */}
                                {
                                    orders
                                        .filter((order) => order.deliveryStatus === "Completed")
                                        .map((order) => (
                                            <div>
                                                <OrderTag props={order} />
                                            </div>
                                        ))
                                }
                            </TabPanel>
                            <TabPanel value="2" style={{
                                backgroundColor: '#E0E8EF'
                            }}>  {
                                    orders
                                        .filter((order) => order.deliveryStatus === "New")
                                        .map((order) => (
                                            <div>
                                                <OrderTag props={order} />
                                            </div>
                                        ))
                                }</TabPanel>
                            <TabPanel value="3" style={{
                                backgroundColor: '#E0E8EF'
                            }}>  {
                                    orders
                                        .filter((order) => order.deliveryStatus === "Failed")
                                        .map((order) => (
                                            <div>
                                                <OrderTag props={order} />
                                            </div>
                                        ))
                                }</TabPanel>
                        </TabContext>
                    </Box>
                    {/* Modal order detail */}
                    <Modal
                        width={1000}
                        footer={null}
                        title="Order detail"
                        open={isShowDetail}
                        okText={<div>Save</div>}
                        onCancel={() => {
                            setIsShowDetail(false)
                        }
                        }
                        cancelText={<div>Cancel</div>}
                        closeIcon={<div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }} onClick={() => setIsShowDetail(false)}><CloseOutlined /></div>}
                    >
                        <div>
                            <Paper style={{
                                marginTop: 20
                            }} component={Box} p={4} mx="auto">
                                {
                                    order.map((user, index) => (
                                        <Grid
                                            container
                                            spacing={3}
                                            key={index}
                                            className='inputGroup'
                                        >
                                            <Grid item lg={6}>
                                                <Label for="orderer">
                                                    Orderer:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={6}>
                                                <Label for="status">
                                                    Status:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>

                                                <Label for="building">
                                                    Building:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>
                                                <Label for="orderDate">
                                                    Order Date:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>
                                                <Label for="food">
                                                    Ordered Food:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={6}>
                                                <Space style={{
                                                    display: "flex",
                                                    alignItems: 'center'
                                                }}>
                                                    <div style={{
                                                        border: "1px solid red",
                                                        borderRadius: 5,
                                                        width: 30,
                                                        height: 30,
                                                        display: "flex",
                                                        justifyContent: 'center',
                                                        marginTop: -5
                                                    }}>
                                                        <Label for="quantity">
                                                            1x
                                                        </Label>
                                                    </div>
                                                    <div>
                                                        <Label for="food" >
                                                            Food
                                                        </Label>
                                                    </div>
                                                </Space>
                                            </Grid>
                                            <Grid item lg={12}>
                                                <Label for="subTotal">
                                                    Subtotal:VNĐ
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>
                                                <Label for="chef" >
                                                    Chef:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>
                                                <Label for="batch" >
                                                    Batch:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>
                                                <Label for="paymentMethod" >
                                                    Payment method:
                                                </Label>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </Paper>
                        </div>
                    </Modal>
                </div>
            </Container >
            <Footer />
        </div >
    )
};

export default HistoryTab;