
import { Grid, Paper, TextField, Box } from '@mui/material'
import React, { useState } from 'react'
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
const HistoryTab = () => {
    const order = [
        {
            id: "1",
            userName: "First order",
            date: "3/3/2000",
            totalPrice: 25000,
            status: "Completed"
        },
        {
            id: "2",
            userName: "First order",
            date: "3/3/2000",
            totalPrice: 25000,
            status: "Completed"
        },
        {
            id: "3",
            userName: "First order",
            date: "3/3/2000",
            totalPrice: 25000,
            status: "Completed"
        }
    ]
    const [value, setValue] = useState('1');
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [dataSource, setDataSource] = useState(order)
    const [showingDetail, setShowingDetail] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Header />
            <Container className='userProfile__container'>
                <div>
                    <div>
                        <img
                            className=''
                            style={{
                                position: 'relative',
                                width: 120,
                                height: 120,
                                zIndex: 1,
                                marginRight: 50,
                                borderRadius: 100
                            }}
                            src='https://images2.thanhnien.vn/Uploaded/nguyenvan/2022_09_09/thanh-loc-doanhnhansaigon1-1508430693-750x0-8136.jpg'></img>

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
                    </div>
                </div>
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
                                {
                                    order.map((order) => (
                                        <div>
                                            <Button onClick={() => setIsShowDetail(true)} style={{
                                                width: "100%",
                                                marginBottom: 20,
                                                backgroundColor: 'white'
                                            }}>
                                                <OrderTag props={order} />
                                            </Button>
                                        </div>
                                    ))
                                }
                            </TabPanel>
                            <TabPanel value="2" style={{
                                backgroundColor: '#E0E8EF'
                            }}>  {
                                    order.map((order) => (
                                        <OrderTag props={order} />
                                    ))
                                }</TabPanel>
                            <TabPanel value="3" style={{
                                backgroundColor: '#E0E8EF'
                            }}>  {
                                    order.map((order) => (
                                        <OrderTag props={order} />
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
                                                {/* <TextField
                                                    label="Name"
                                                    placeholder='Name...'
                                                    variant='outlined'
                                                    fullWidth
                                                    disabled
                                                >
                                                </TextField> */}
                                                <Label for="orderer">
                                                    Orderer:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={6}>
                                                {/* <TextField
                                                    label="Status"
                                                    placeholder='Status...'
                                                    variant='outlined'
                                                    fullWidth
                                                    disabled
                                                >
                                                </TextField> */}
                                                <Label for="status">
                                                    Status:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>
                                                {/* <TextField
                                                    label="Building"
                                                    placeholder='Building...'
                                                    variant='outlined'
                                                    fullWidth
                                                    disabled
                                                >
                                                </TextField> */}
                                                <Label for="building">
                                                    Building:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>
                                                {/* <TextField
                                                    label="Order Date"
                                                    placeholder='Order date...'
                                                    variant='outlined'
                                                    fullWidth
                                                    disabled
                                                >
                                                </TextField> */}
                                                <Label for="orderDate">
                                                    Order Date:
                                                </Label>
                                            </Grid>
                                            <Grid item lg={12}>
                                                {/* <TextField
                                                    label="Food"
                                                    placeholder='Food...'
                                                    variant='outlined'
                                                    fullWidth
                                                    disabled
                                                >
                                                </TextField> */}
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