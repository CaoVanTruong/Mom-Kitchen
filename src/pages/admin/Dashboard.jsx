import React, { useState, useEffect } from 'react'
import { ShoppingCartOutlined, UserOutlined, DollarCircleOutlined } from "@ant-design/icons"
import { Card, Space, Statistic, Typography, Table } from 'antd'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { getRecentOrders } from '../../API/recentOrder'
import '../../styles/dashboard.css'
import { Button } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'

function Dashboard() {
    return (
        <div>
            <BootstrapNavbar />
            <SideMenu />
            <div className='SideMenuAndPageContentDashboard'>
                <div size={20} direction='vertical' className='PageContentDashboard'>
                    <div>
                        <Typography.Title level={4} className='titlePage mt-2' style={{
                            marginLeft: 10
                        }}>Dashboard</Typography.Title>
                    </div>
                    <div>
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
                                                padding: 8
                                            }}
                                        />}
                                        title={<span style={{
                                            fontSize: 24
                                        }}>Orders</span>}
                                        value={12345} />
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
                                                padding: 8
                                            }}
                                        />}
                                        title={<span style={{
                                            fontSize: 24
                                        }}>Customers</span>}
                                        value={12345} />
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
                                            1235
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
        <Card>
            <Space direction='horizontal'>
                {icon}
                <Statistic style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} title={title} value={value} />
            </Space>
        </Card>
    )
}
function RecentOrders() {
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
                            title: 'Package food',
                            dataIndex: 'title',
                            width: 300
                        },
                        {
                            title: 'Customer',
                            dataIndex: 'title',
                            width: 200
                        },
                        {
                            title: 'Customer phone',
                            dataIndex: 'title',
                            width: 200
                        },
                        {
                            title: 'Quantity',
                            dataIndex: 'quantity',
                            width: 50

                        },
                        {
                            title: 'Batch',
                            dataIndex: 'discountedPrice',
                            width: 50
                        },
                        {
                            title: 'Total',
                            dataIndex: 'price',
                            width: 50
                        },
                        {
                            title: 'Order date',
                            dataIndex: 'date',
                            width: 200
                        },
                        {
                            title: 'Delivery status',
                            dataIndex: 'date',
                            width: 50
                        },

                    ]
                    }
                    loading={loading}
                    dataSource={dataSource}
                    pagination={7}
                >
                </Table>
            </div>
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