import React, { useState, useEffect } from 'react'
import { ShoppingCartOutlined, UserOutlined, DollarCircleOutlined, EyeOutlined, CloseOutlined } from "@ant-design/icons"
import { Card, Space, Statistic, Typography, Table, Modal, Image } from 'antd'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { getRecentOrders } from '../../API/recentOrder'
import '../../styles/dashboard.css'
import { Button } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import { Grid, Paper, TextField, Box } from '@mui/material'
import { getAllOrder } from '../../API/admin/dashboard'
function Dashboard() {
    const [orders, setOrders] = useState()
    const [customers, setCustomers] = useState()
    const [revenues, setRevenues] = useState()
    const fetchAllOrder = () => {
        fetch('https://momkitchen.azurewebsites.net/api/Order/countorder').then(res => {
            return res.json()
        }).then(data => {
            setOrders(data)
        })
    }
    const fetchAllCustomer = () => {
        fetch('https://momkitchen.azurewebsites.net/api/Account/countcustomer').then(res => {
            return res.json()
        }).then(data => {
            setCustomers(data)
        })
    }
    const fetchAllRevenue = () => {
        fetch('https://momkitchen.azurewebsites.net/api/Order/counttotalprice').then(res => {
            return res.json()
        }).then(data => {
            setRevenues(data)
        })
    }
    useEffect(() => {
        fetchAllOrder()
        fetchAllCustomer()
        fetchAllRevenue()
    }, [])
    return (
        <div style={{
            backgroundColor: '#F8FAFC',
            height: "100vh"
        }}>
            <BootstrapNavbar />
            <SideMenu />
            <div className='SideMenuAndPageContentDashboard'>
                <div size={20} direction='vertical' className='PageContentDashboard'>
                    <div>
                        <Typography.Title level={4} className='titlePage mt-2' style={{
                            marginLeft: 10
                        }}>Dashboard</Typography.Title>
                    </div>
                    <div className='Widgets'>
                        <Container>
                            <Row>
                                <Col>
                                    <DashboardCard
                                        className="lg-4 md-4"
                                        icon={<ShoppingCartOutlined
                                            style={{
                                                color: "green",
                                                backgroundColor: "rgba(0,255,0,0.25)",
                                                borderRadius: 20,
                                                fontSize: 24,
                                                padding: 8,
                                            }}
                                        />}
                                        title={<span style={{
                                            fontSize: 24
                                        }}>Orders</span>}
                                        value={orders}
                                    />
                                </Col>
                                <Col>
                                    <DashboardCard
                                        className="lg-4 md-4"
                                        icon={<UserOutlined
                                            style={{
                                                color: "purple",
                                                backgroundColor: "rgba(0,0,255,0.25)",
                                                borderRadius: 20,
                                                fontSize: 24,
                                                padding: 8,
                                                WebkitBoxShadow: "2px 4px 10px 1px rgba(201,201,201,0.47)",
                                                boxShadow: "2px 4px 10px 1px rgba(201,201,201,0.47)"

                                            }}
                                        />}
                                        title={<span style={{
                                            fontSize: 24
                                        }}>Customers</span>}
                                        value={customers} />
                                </Col>
                                <Col>
                                    <DashboardCard
                                        className="lg-4 md-4"
                                        icon={<DollarCircleOutlined
                                            style={{
                                                color: "red",
                                                backgroundColor: "rgba(255,0,0,0.25)",
                                                borderRadius: 20,
                                                fontSize: 24,
                                                padding: 8
                                            }}
                                        />}
                                        title={
                                            <span style={{
                                                fontSize: 24
                                            }}>Revenue</span>
                                        }
                                        value={
                                            revenues
                                        }
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <Space style={{
                        marginTop: 10
                    }}>
                        <RecentOrders />
                    </Space>
                </div>
                {/* </Space> */}
            </div>
        </div>
    )
}
function DashboardCard({ icon, title, value }) {
    return (
        <Card style={{
            borderWidth: "2px",
            boxShadow: '1px 2px 9px #F4AAB9',
        }}>
            <Space direction='horizontal' style={{
                display: 'flex',
                justifyContent: 'space-between',
                boxShadow: "#F8FAFC",
            }}>
                <Statistic style={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'blue',
                    marginLeft: 0,
                }} title={title} value={value}>
                </Statistic>
                {icon}

            </Space>
        </Card>
    )
}
function RecentOrders() {
    const orderTemplate = [
        {
            id: 0,
            date: "",
            customerId: 0,
            batchId: 0,
            deliveryStatus: "",
            buildingId: 0,
            quantity: 0,
            sessionId: 0,
            email: "",
            customerPhone: "",
            deliveryTime: "",
            note: ""
        }
    ]
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [order, setOrder] = useState(orderTemplate)
    const resetEditing = () => {
        setIsEditing(false)
        setEditingProduct(null)
    }
    const onEditRecord = (record) => {
        setIsEditing(true)
        setEditingProduct({ ...record })
    }
    useEffect(() => {
        setLoading(true)
        getAllOrder().then(data => {
            setDataSource(data);
            setLoading(false)
        })
    }, [])

    const fetchPaymentByOrderId = (id) => {
        fetch(`https://momkitchen.azurewebsites.net/api/Order/getpaymentbyorderid?orderid=${id}`)
            .then((res) => res.json())
            .then((data) => {
                return <div>{data.amount}</div>
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };

    return (
        <div>
            <div>
                <Typography.Title level={4} className='titleTalbe' style={{
                    marginLeft: 10
                }}>Orders</Typography.Title>
            </div>
            <div direction='horizontal' style={{
                marginLeft: 10,
                width: "80vw"
            }}>
                <Table
                    columns={[
                        {
                            title: 'ID',
                            dataIndex: 'id',
                            width: 50
                        },

                        {
                            title: 'Create date',
                            dataIndex: 'date',
                            width: 300,
                            defaultSortOrder: 'ascend',
                            sorter: (a, b) => new Date(b.date) - new Date(a.date),
                        },
                        {
                            title: 'Customer phone',
                            dataIndex: 'customerPhone',
                            width: 200
                        },
                        {
                            title: 'Quantity',
                            dataIndex: 'quantity',
                            width: 50

                        },
                        {
                            title: "Total price",
                            dataIndex: "totalPrice",
                            key: 'totalPrice'
                        },
                        {
                            title: 'Batch',
                            dataIndex: 'batchId',
                            width: 50
                        },
                        {
                            title: 'Status',
                            dataIndex: 'status',
                            width: 200
                        },
                        {
                            title: 'Delivery status',
                            dataIndex: 'deliveryStatus',
                            width: 50
                        },
                        {
                            title: 'Building',
                            dataIndex: 'buildingId',
                            key: 'buildingId',
                            width: 50
                        },
                        {
                            title: 'Session',
                            dataIndex: 'sessionId',
                            width: 50
                        },
                        {
                            title: 'Action',
                            render: (record) => {
                                return (
                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <EyeOutlined
                                            onClick={() => onEditRecord(record)}
                                        />
                                    </div>
                                )
                            }
                        }

                    ]
                    }
                    loading={loading}
                    dataSource={dataSource}
                    pagination={7}
                >
                </Table>
            </div>
            <Modal
                width={1000}
                title="View detail"
                open={isEditing}
                okButtonProps={{
                    style: {
                        display: 'none'
                    }
                }}
                onCancel={() => {
                    resetEditing()
                }
                }
                cancelText={<div>Cancel</div>}
                onOk={false}
                closeIcon={<div style={{
                    marginLeft: -30
                }}><CloseOutlined /></div>}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20
                }}>
                    <Image style={{
                        borderRadius: 20
                    }} src={editingProduct?.thumbnail}></Image>
                </div>
                <div>
                    <Paper style={{
                        marginTop: 20
                    }} component={Box} p={4} mx="auto">
                        {
                            orderTemplate.map((order, index) => (
                                <Grid
                                    container
                                    spacing={3}
                                    key={index}
                                    className='inputGroup'
                                >
                                    <Grid item lg={6}>
                                        <TextField
                                            label="Order ID"
                                            variant='outlined'
                                            fullWidth
                                            value={editingProduct?.id}
                                            disabled={true}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            label="Batch"
                                            variant='outlined'
                                            fullWidth
                                            value={editingProduct?.batchId}
                                            disabled={true}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            label="Delivery status"
                                            variant='outlined'
                                            fullWidth
                                            value={editingProduct?.buildingId}
                                            disabled={true}

                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            label="Quantity"
                                            variant='outlined'
                                            fullWidth
                                            value={editingProduct?.quantity}
                                            disabled={true}

                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            label="Session title"
                                            variant='outlined'
                                            fullWidth
                                            value={editingProduct?.sessionId}
                                            disabled={true}

                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid item lg={12}>
                                        <TextField
                                            label="Customer's Email"
                                            variant='outlined'
                                            fullWidth
                                            value={editingProduct?.email}
                                            disabled={true}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Paper>
                </div>
            </Modal>
        </div >
    )
}

function BatchManagement() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getRecentOrders().then(res => {
            setDataSource(res.products.splice(0, 3));
            setLoading(false)
        })
    }, [])
    return (
        <div>
            <div>
                <Typography.Title level={4} className='titleTalbe' style={{
                    marginLeft: 10,
                }}>Batch Management</Typography.Title>
            </div>
            <div direction='horizontal' style={{
                marginLeft: 10,
                width: 555,
            }}>
                <Table
                    columns={[
                        {
                            title: '#',
                            dataIndex: 'id',
                        },
                        {
                            title: 'Session',
                            dataIndex: 'quantity',
                        },
                        {
                            title: 'Status',
                            dataIndex: 'discountedPrice'
                        },
                        {
                            title: "Shipper",
                            render: (record) => {
                                return (
                                    <div className='userProfile_btn' style={{
                                        justifyContent: 'flex-start'
                                    }}>
                                        <Button variant='contained'>View</Button>
                                    </div>
                                )
                            },
                        }
                    ]
                    }
                    loading={loading}
                    dataSource={dataSource}
                    pagination={false}
                >
                </Table>
            </div>
        </div >
    )
}
function ShipperManagement() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getRecentOrders().then(res => {
            setDataSource(res.products.splice(0, 3));
            setLoading(false)
        })
    }, [])
    return (
        <div>
            <div>
                <Typography.Title level={4} className='titleTalbe' style={{
                    marginLeft: 75
                }}>Shipper</Typography.Title>
            </div>
            <div direction='horizontal' style={{
                marginLeft: 75,
                width: 555
            }}>
                <Table

                    columns={[

                        {
                            title: 'Avatar',
                            dataIndex: 'title',
                        },
                        {
                            title: 'Name',
                            dataIndex: 'quantity',

                        },

                        {
                            title: 'Phone',
                            dataIndex: 'discountedPrice'
                        },
                        {
                            title: 'Email',
                            dataIndex: 'quantity',

                        },
                        {
                            title: 'Address',
                            dataIndex: 'quantity',

                        },
                        {
                            title: 'Batch',
                            dataIndex: 'quantity',

                        },
                        {
                            title: "Actions",
                            render: (record) => {
                                return (
                                    <div className='userProfile_btn' style={{
                                        justifyContent: 'flex-start'
                                    }}>
                                        <Button variant='contained'>View</Button>
                                    </div>
                                )
                            },
                        }
                    ]
                    }
                    loading={loading}
                    dataSource={dataSource}
                    pagination={false}
                >
                </Table>
            </div>
        </div >
    )
}

export default Dashboard