import React, { useState } from 'react'
import '../../styles/marketManagement.css'
import { Grid, Paper, TextField, Box } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllProducts } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Modal, Image, Tag } from 'antd'
import {
  DeleteOutlined, CloseOutlined, CheckCircleOutlined, EyeOutlined
} from '@ant-design/icons'
import { NonceProvider } from 'react-select'
import { getAllSessionPackage } from '../../API/admin/market'
const MarketManagement = () => {
  const userTemplate = [
    {
      name: "",
      email: "",
      phone: "",
      address: ""
    }
  ]
  const filterItem = [
    {
      title: "Chef"
    },
    {
      title: "Price"
    },

  ]
  const [filter, setFilter] = useState("Select filter")
  const [users, setUsers] = useState([userTemplate])
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isAddingProduct, setIsAddingProduct] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [productArray, setProductArray] = useState([])
  const [sessionPackage, setSessionPackage] = useState()
  const [sessionPackageArray,setSessionPackageArray] = useState([])
  const onDeleteRecord = (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this record?',
      okText: <div>Yes</div>,
      okType: 'danger',
      cancelText: <div>Cancel</div>,
      onOk: () => {
        setDataSource(pre => {
          return pre.filter(product => product.id !== record.id)
        })
      }
    })
  }
  const onEditRecord = (record) => {
    setIsEditing(true)
    setEditingProduct({ ...record })
  }
  function handleFilter(event) {
    const newData = sessionPackageArray.filter(row => {
      return row.foodPackage.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setSessionPackage(newData)
  }
  const resetEditing = () => {
    setIsEditing(false)
    setEditingProduct(null)
  }
  const resetAdding = () => {
    setIsAdding(false)
    setIsAddingProduct(null)
  }
  useEffect(() => {
    setLoading(true)
    getAllProducts().then(res => {
      setProductArray(res.products)
      setDataSource(res.products)
      setLoading(false)
    })
    getAllSessionPackage().then(res => {
      setSessionPackage(res)
      setSessionPackageArray(res)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <BootstrapNavbar />
      <SideMenu />
      <div className='SideMenuAndPageContentMarket'>
        <div size={20} direction='vertical' className='PageContentMarket'>
          <div className='MarketTitle'>
            <Typography.Title level={4} className='titlePage mt-2'>Market Management</Typography.Title>
          </div>
          <div className='AddSeachBar'>
            <div className='SearchWithIcon' style={{
              marginLeft: 50,
              marginRight: 20
            }}>
              {/* <input type='text-end' onChange={handleFilter} placeholder='Search...' >
              </input> */}
              <TextField
                id="filled-search"
                label="Search"
                type="search"
                variant="filled"
                onChange={handleFilter}
                style={{
                  width: 300,
                }}
              />
            </div>
          </div>
          <Space>
            <div>
              <div direction='horizontal' style={{
                marginLeft: 10,
                width: "80vw"
              }}>
                <Table
                  className='tableData'
                  style={{
                    borderRadius: 50,
                  }}
                  columns={
                    [
                      {
                        title: "#",
                        dataIndex: "id"
                      },
                      {
                        title: "Image",
                        dataIndex: "foodPackage.image",
                        key: "image",
                        render: (_, record) => (
                          < Avatar src={record.foodPackage.image} style={{
                            width: 100,
                            height: 100
                          }} />
                        ),
                      },
                      {
                        title: 'Title',
                        dataIndex: "foodPackage.name",
                        key: "name",
                        render: (_, record) => (
                          <div>{record && record.foodPackage.name}</div>
                        )
                      },
                      {
                        title: 'Chef',
                        dataIndex: "title"
                      },
                      {
                        title: 'Price',
                        dataIndex: "price",
                        defaultSortOrder: 'descend',
                        sorter: (a, b) => a.price - b.price
                      }, {
                        title: 'Session',
                        dataIndex: "sessionId",
                        key:'sessionId',
                        defaultSortOrder: 'descend',
                        sorter: (a, b) => a.sessionId - b.sessionId
                        // onFilter:(value,record) => record.rating.indexOf(value)===0
                      }
                      ,
                      {
                        title: 'Quantity',
                        dataIndex: "quantity",
                        width: 50,
                        defaultSortOrder: 'ascend',
                        sorter: (a, b) => a.quantity - b.quantity
                      },
                      {
                        title: 'Create date',
                        dataIndex: "createDate"
                      },
                      {
                        title: 'Status',
                        dataIndex: "status",
                        key: 'status',
                        render: (_, record) => (
                          <>
                            {
                              record.status == 1 ? <Tag color='geekblue'>New</Tag> : record.status == 2 ? <Tag color='yellow'>Approve</Tag> : record.status == 3 ? <Tag color='red'>Reject</Tag> : <Tag color='grey'>Cancel</Tag>
                            }
                          </>
                        )
                      },
                      {
                        title: "Actions",
                        render: (record) => {
                          return (
                            <div style={{
                              display: 'flex'
                            }}>
                              <EyeOutlined
                                onClick={() => onEditRecord(record)}
                              />
                              <DeleteOutlined
                                onClick={() => onDeleteRecord(record)}
                                style={{ color: "red", marginLeft: 12 }} />
                              <CheckCircleOutlined
                                onClick={() => { }}
                                style={{
                                  color: 'green',
                                  marginLeft: 12
                                }} />
                            </div>
                          )
                        }
                      }
                    ]}
                  loading={loading}
                  dataSource={sessionPackage}
                  pagination={
                    {
                      pageSize: 10
                    }
                  }
                >
                </Table>
              </div>
            </div>
          </Space>
          <div>
            {/* modal view detail */}
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
                  borderRadius: 20,
                  width:300,
                  height:300
                }} src={editingProduct?.foodPackage.image}></Image>
              </div>
              <div>
                <Paper style={{
                  marginTop: 20
                }} component={Box} p={4} mx="auto">

                  <Grid
                    container
                    spacing={3}

                    className='inputGroup'
                  >
                    <Grid item lg={6}>
                      <TextField
                        label="Title"
                        placeholder='Title...'
                        variant='outlined'
                        fullWidth
                        defaultValue={editingProduct?.foodPackage.name}
                        disabled={true}
                      >
                      </TextField>
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        label="Price"
                        variant='outlined'
                        fullWidth
                        defaultValue={editingProduct?.price}
                        disabled={true}
                      >
                      </TextField>
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        label="Chef"
                        variant='outlined'
                        fullWidth
                        defaultValue={editingProduct?.brand}
                        disabled={true}

                      >
                      </TextField>
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        label="Food style"
                        variant='outlined'
                        fullWidth
                        defaultValue={editingProduct?.foodPackage.foodPackageStyleId}
                        disabled={true}

                      >
                      </TextField>
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        label="Quantity"
                        variant='outlined'
                        fullWidth
                        defaultValue={editingProduct?.quantity}
                        disabled={true}

                      >
                      </TextField>
                    </Grid>
                    <Grid item lg={12}>
                      <TextField
                        label="Description"
                        variant='outlined'
                        fullWidth
                        defaultValue={editingProduct?.foodPackage.description}
                        disabled={true}

                      >
                      </TextField>
                    </Grid>
                    <Grid item lg={12}
                      className='dishInPackage'
                    >
                      <div><h5>Dish in package</h5></div>
                      <div style={{
                        marginBottom: 10
                      }}>
                        <Space className='itemInDish'>
                          <Image src={editingProduct?.thumbnail} style={{
                            height: 50,
                            width: 50
                          }}></Image>
                          <h5>Title</h5>
                          <h5>Dish Type</h5>
                        </Space>
                      </div>
                      <div style={{
                        marginBottom: 10
                      }}>
                        <Space className='itemInDish'>
                          <Image src={editingProduct?.thumbnail} style={{
                            height: 50,
                            width: 50
                          }}></Image>
                          <h5>Title</h5>
                          <h5>Dish Type</h5>
                        </Space>
                      </div>
                      <div style={{
                        marginBottom: 10
                      }}>
                        <Space className='itemInDish'>
                          <Image src={editingProduct?.thumbnail} style={{
                            height: 50,
                            width: 50
                          }}></Image>
                          <h5>Title</h5>
                          <h5>Dish Type</h5>
                        </Space>
                      </div>
                    </Grid>
                  </Grid>

                </Paper>
              </div>
            </Modal>
          </div>
        </div>
      </div >
    </div >
  )
}

export default MarketManagement

