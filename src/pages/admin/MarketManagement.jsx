import React, { useState } from 'react'
import '../../styles/marketManagement.css'
import { Grid, Paper, TextField, Box } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllProducts } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Modal, Image, Tag } from 'antd'
import {
  DeleteOutlined, CloseOutlined, CheckCircleOutlined, EyeOutlined, CheckCircleFilled
} from '@ant-design/icons'
import { NonceProvider } from 'react-select'
import { getAllSessionPackage } from '../../API/admin/market'
import { render } from '@testing-library/react'
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
  const [sessionPackageArray, setSessionPackageArray] = useState([])
  const [allDishArray, setAllDishArray] = useState([])
  const onDeleteRecord = (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this record?',
      okText: <div>Yes</div>,
      okType: 'danger',
      cancelText: <div>Cancel</div>,
      onOk: () => {
        console.log("id là", record.id)
        if (record.status === 2) {
          console.log("vao dc cho nay khong")
          return changeStatusSessionPackage(record.id, 3);
        } else if (record.status === 0) {
          console.log("vao dc cho nay khong 2")
          return changeStatusSessionPackage(record.id, 2)
        } else if (record.status === 1) {
          return changeStatusSessionPackage(record.id, 3)
        }
      }
    })
  }
  const onEditRecord = (record) => {
    setIsEditing(true)
    setEditingProduct({ ...record })
    fetchAllDishByFoodPackageId(record?.foodPackage?.id)
  }
  function handleFilter(event) {
    const searchValue = event.target?.value || "";
    const newData = sessionPackageArray.filter(row => {
      return row.foodPackage?.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setSessionPackage(newData);
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
    fetchAllSessionPackage()
  }, [])

  const fetchAllSessionPackage = () => {
    getAllSessionPackage().then(res => {
      setSessionPackage(res)
      setSessionPackageArray(res)
      setLoading(false)
    })
  }
  // const  id  = editingProduct.id || 0
  const fetchAllDishByFoodPackageId = (id) => {
    fetch('https://momkitchen.azurewebsites.net/api/FoodPackage/getalldishbyid?dishid=' + id).then(response => {
      return response.json()
    }).then(data => {
      console.log({ data })
      setAllDishArray(data)
    })
  }
  const changeStatusSessionPackage = (id, status) => {
    fetch(`https://momkitchen.azurewebsites.net/api/FoodPackageInSession?id=${id}&status=${status}`, {
      method: 'PATCH',
    }).then(response => {
      return fetchAllSessionPackage()
    }).catch(error => {
      return alert("Change fail")
    })

  }
  // console.log(editingProduct?.foodPackage?.id)
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
                          < Avatar src={record.foodPackage?.image} style={{
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
                          <div>{record && record.foodPackage?.name}</div>
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
                        dataIndex: "session.title",
                        key: 'title',
                        defaultSortOrder: 'descend',
                        sorter: (a, b) => a.sessionId - b.sessionId,
                        render: (_, record) => (
                          <div>{record.session.title}</div>
                        )
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
                        filters: [
                          {
                            text: 'New',
                            value:0,
                          },
                          {
                            text: 'Approve',
                            value: 1,
                          },
                          {
                            text: 'Reject',
                            value: 2,
                          },
                          {
                            text: 'Cancel',
                            value: 3,
                          },
                        ],
                        filterMode: 'tree',
                        filterSearch: true,
                        onFilter: (value, record) => record.status === value,
                        width: '30%',
                        render: (_, record) => (
                          <>
                            {
                              record.status == 0 ? <Tag color='geekblue'>New</Tag> : record.status == 1 ? <Tag color='yellow'>Approve</Tag> : record.status == 2 ? <Tag color='red'>Reject</Tag> : <Tag color='grey'>Cancel</Tag>
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
                                onClick={() => {
                                  onEditRecord(record)
                                }}
                              />
                              <DeleteOutlined
                                onClick={() => onDeleteRecord(record)}
                                style={{ color: "red", marginLeft: 12 }}
                              />

                              {
                                record.status == 0 ? <CheckCircleOutlined
                                  onClick={() => { changeStatusSessionPackage(record.id, 1) }}
                                  style={{
                                    color: 'green',
                                    marginLeft: 12
                                  }} /> : <CheckCircleFilled
                                  style={{
                                    color: 'grey',
                                    marginLeft: 12
                                  }} />
                              }

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
                  width: 300,
                  height: 300
                }} src={editingProduct?.foodPackage?.image}></Image>
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
                        defaultValue={editingProduct?.foodPackage?.name}
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
                        defaultValue={editingProduct?.foodPackage?.chefId}
                        disabled={true}

                      >
                      </TextField>
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        label="Food style"
                        variant='outlined'
                        fullWidth
                        defaultValue={editingProduct?.foodPackage?.foodPackageStyleId}
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
                        defaultValue={editingProduct?.foodPackage?.description}
                        disabled={true}

                      >
                      </TextField>
                    </Grid>
                    <Grid item lg={12}
                      className='dishInPackage'
                    >
                      <div><h5>Dish in package</h5></div>
                      {
                        Array.isArray(allDishArray) &&
                        allDishArray.map((i) => (
                          <div style={{
                            marginBottom: 10
                          }}>
                            <Space className='itemInDish'>
                              <Image src={i?.dish.image} style={{
                                height: 100,
                                width: 100
                              }}></Image>
                              <h5>{i?.dish.name}</h5>
                              <h5>{i?.dish.dishType}</h5>
                            </Space>
                          </div>
                        ))
                      }

                      {/* <div style={{
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
                      </div> */}
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

