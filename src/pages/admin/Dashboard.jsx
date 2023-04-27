import React, { useState, useEffect } from 'react'
import { ShoppingCartOutlined, UserOutlined, DollarCircleOutlined } from "@ant-design/icons"
import { Card, Space, Statistic, Typography, Table } from 'antd'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { getRecentOrders } from '../../API/recentOrder'
import '../../styles/dashboard.css'
import { Button } from '@mui/material'

function Dashboard() {
    return (
        <div>
            <BootstrapNavbar />
            <div className='SideMenuAndPageContentDashboard'>
                <SideMenu />
                {/* <Space className='PageContent'> */}
                <Space size={20} direction='vertical' className='PageContent'>
                    <div>
                        <Typography.Title level={4} className='titlePage mt-5' style={{
                            marginLeft: 10
                        }}>Dashboard</Typography.Title>
                    </div>
                    <div>
                        <Space direction='horizontal' className='HorizontalItem' style={{
                            marginLeft: 10
                        }}>
                            <DashboardCard
                                icon={<ShoppingCartOutlined
                                    style={{
                                        color: "green",
                                        backgroundColor: "rgba(0,255,0,0.25)",
                                        borderRadius: 20,
                                        fontSize: 24,
                                        padding: 8
                                    }}
                                />}
                                title={"Orders"}
                                value={12345} />
                            <DashboardCard
                                icon={<UserOutlined
                                    style={{
                                        color: "purple",
                                        backgroundColor: "rgba(0,0,255,0.25)",
                                        borderRadius: 20,
                                        fontSize: 24,
                                        padding: 8
                                    }}
                                />}
                                title={"Customers"}
                                value={12345} />
                            <DashboardCard
                                icon={<DollarCircleOutlined
                                    style={{
                                        color: "red",
                                        backgroundColor: "rgba(255,0,0,0.25)",
                                        borderRadius: 20,
                                        fontSize: 24,
                                        padding: 8
                                    }}
                                />}
                                title={"Revenue"}
                                value={12345}

                            />
                        </Space>
                    </div>

                    <Space>
                        <RecentOrders />
                    </Space>
                </Space>
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
                marginLeft:10
            }}>
                <Table

                    columns={[
                        
                        {
                            title: 'Title',
                            dataIndex: 'title',
                        },
                        {
                            title: 'Quantity',
                            dataIndex: 'quantity',

                        },
                        {
                            title: 'Price',
                            dataIndex: 'discountedPrice'
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