import React, { useState } from 'react'
import '../../styles/productManagement.css'
import { Grid, Paper, TextField, Box } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllProducts } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Modal, Image } from 'antd'
import {
  DeleteOutlined, CloseOutlined, CheckCircleOutlined
} from '@ant-design/icons'
import { NonceProvider } from 'react-select'
const ProductManagement = () => {
  const userTemplate = [
    {
      name: "",
      email: "",
      phone: "",
      address: ""
    }
  ]
  const [users, setUsers] = useState([userTemplate])
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isAddingProduct, setIsAddingProduct] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [productArray, setProductArray] = useState([])
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
    const newData = productArray.filter(row => {
      return row.title.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setDataSource(newData)
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
  }, [])

  return (
    <div>
      <BootstrapNavbar />
      <div className='SideMenuAndPageContentProduct'>
        <SideMenu />
        <Space size={20} direction='vertical' width='100%' className='pageContent'>
          <div className='MarketTitle'>
            <Typography.Title level={4} className='titlePage mt-5 '>Market Management</Typography.Title>
          </div>
          <div className='AddSeachBar'>
            <div className='SearchWithIcon' style={{
              marginLeft: 60
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
                  marginLeft: -30
                }}
              />
              <i class="ri-search-line" style={{
                position: 'relative',
                marginLeft: -20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}></i>
            </div>
          </div>
          <Space className='HorizontalTable' direction='horizontal'>
            <Table
              className='tableData'
              style={{
                borderRadius: 50,
              }}
              columns={[
                {
                  title: "#",
                  dataIndex: "id"
                },
                {
                  title: "Thumbnail",
                  dataIndex: "thumbnail",
                  render: (link) => {
                    return <Avatar src={link} />
                  }
                },
                {
                  title: 'Title',
                  dataIndex: "title"
                }, {
                  title: 'Price',
                  dataIndex: "price"
                }, {
                  title: 'Rating',
                  dataIndex: "rating",
                  render: (rating) => {
                    return <Rate value={rating} allowHalf></Rate>
                  }
                }
                , {
                  title: 'Stock',
                  dataIndex: "stock"
                },
                {
                  title: 'Brand',
                  dataIndex: "brand"
                },
                {
                  title: 'Category',
                  dataIndex: "category"
                },
                {
                  title: "Actions",
                  render: (record) => {
                    return (
                      <div>
                        {/* <EditOutlined
                          onClick={() => onEditRecord(record)
                          }
                          style={{ marginLeft: 0 }} /> */}
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
              dataSource={dataSource}
              pagination={
                {
                  pageSize: 5
                }
              }
            >
            </Table>

          </Space>
          <div>
            {/* modal edit */}
            <Modal
              title="Edit Product"
              open={isEditing}
              okText={<div>Save</div>}
              onCancel={() => {
                resetEditing()
                // setIsEditing(false)
              }
              }
              cancelText={<div>Cancel</div>}
              onOk={() => {
                setDataSource(pre => {
                  return pre.map(product => {
                    if (product.id === editingProduct.id) {
                      return editingProduct
                    } else {
                      return product
                    }
                  })
                })
                resetEditing()
              }
              }
              closeIcon={<div style={{
                marginLeft: -30
              }}><CloseOutlined /></div>}
            >
              <Image src={editingProduct?.thumbnail}></Image>
              {/* <Input value={editingProduct?.title} onChange={(e) => {
                setEditingProduct(pre => {
                  return { ...pre, title: e.target.value }
                })
              }} />
              <Input value={editingProduct?.price} onChange={(e) => {
                setEditingProduct(pre => {
                  return { ...pre, price: e.target.value }
                })
              }} /> */}
              <div>
                <Paper style={{
                  marginTop: 20
                }} component={Box} p={4} mx="auto">
                  {
                    userTemplate.map((user, index) => (
                      <Grid
                        container
                        spacing={3}
                        key={index}
                        className='inputGroup'
                      >
                        <Grid item lg={6}>
                          <TextField
                            label="Title"
                            placeholder='Title...'
                            variant='outlined'
                            fullWidth
                            value={editingProduct?.title}
                            onChange={(e) => {
                              setEditingProduct(pre => {
                                return { ...pre, title: e.target.value }
                              })
                            }}
                          >
                          </TextField>
                        </Grid>
                        <Grid item lg={6}>
                          <TextField
                            label="Price"
                            placeholder='Price'
                            variant='outlined'
                            fullWidth
                            value={editingProduct?.price}
                            onChange={(e) => {
                              setEditingProduct(pre => {
                                return { ...pre, price: e.target.value }
                              })
                            }}
                          >
                          </TextField>
                        </Grid>
                        <Grid item lg={6}>
                          <TextField
                            label="Brand"
                            placeholder='Brand...'
                            variant='outlined'
                            fullWidth
                            value={editingProduct?.brand}
                            onChange={(e) => {
                              setEditingProduct(pre => {
                                return { ...pre, brand: e.target.value }
                              })
                            }}
                          >
                          </TextField>
                        </Grid>
                        <Grid item lg={6}>
                          <TextField
                            label="Category"
                            placeholder='Category...'
                            variant='outlined'
                            fullWidth
                            value={editingProduct?.category}
                            onChange={(e) => {
                              setEditingProduct(pre => {
                                return { ...pre, category: e.target.value }
                              })
                            }}
                          >
                          </TextField>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Paper>
              </div>
            </Modal>
            {/* Modal add product */}
            <Modal
              title="Add Product"
              open={isAdding}
              okText={<div>Save</div>}
              onCancel={() => {

                resetAdding()
                // setIsEditing(false)
              }
              }
              cancelText={<div>Cancel</div>}
              // onOk={
              // () => {
              // setDataSource(
              //   pre => {
              //   return pre.map(product => {
              //     if (product.id === editingProduct.id) {
              //       return editingProduct
              //     } else {
              //       return product
              //     }
              //   })
              // })
              // resetAdding()
              // }
              // }
              closeIcon={
                <div style={{
                  marginLeft: -30
                }}><CloseOutlined /></div>}
            >
              <Image src={editingProduct?.thumbnail}></Image>
              {/* <Input value={editingProduct?.title} onChange={(e) => {
                setEditingProduct(pre => {
                  return { ...pre, title: e.target.value }
                })
              }} />
              <Input value={editingProduct?.price} onChange={(e) => {
                setEditingProduct(pre => {
                  return { ...pre, price: e.target.value }
                })
              }} /> */}
              <input type='file' title='Choose image....'></input>
              <div>
                <Paper style={{
                  marginTop: 20
                }} component={Box} p={4} mx="auto">
                  {
                    userTemplate.map((user, index) => (
                      <Grid
                        container
                        spacing={3}
                        key={index}
                        className='inputGroup'
                      >
                        <Grid item lg={6}>
                          <TextField
                            label="Name of Food"
                            placeholder='Package food name'
                            variant='outlined'
                            fullWidth
                            value={editingProduct?.title}
                            onChange={(e) => {
                              setEditingProduct(pre => {
                                return { ...pre, title: e.target.value }
                              })
                            }}
                          >
                          </TextField>
                        </Grid>
                        <Grid item lg={6}>
                          <TextField
                            label="Price"
                            placeholder='Price'
                            variant='outlined'
                            fullWidth
                            value={editingProduct?.price}
                            onChange={(e) => {
                              setEditingProduct(pre => {
                                return { ...pre, price: e.target.value }
                              })
                            }}
                          >
                          </TextField>
                        </Grid>
                        <Grid item lg={6}>
                          <TextField
                            label="Brand"
                            placeholder='Brand...'
                            variant='outlined'
                            fullWidth
                            value={editingProduct?.brand}
                            onChange={(e) => {
                              setEditingProduct(pre => {
                                return { ...pre, brand: e.target.value }
                              })
                            }}
                          >
                          </TextField>
                        </Grid>
                        <Grid item lg={6}>
                          <TextField
                            label="Category"
                            placeholder='Category...'
                            variant='outlined'
                            fullWidth
                            value={editingProduct?.category}
                            onChange={(e) => {
                              setEditingProduct(pre => {
                                return { ...pre, category: e.target.value }
                              })
                            }}
                          >
                          </TextField>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Paper>
              </div>
            </Modal>
          </div>
        </Space>
      </div >
    </div >
  )
}

export default ProductManagement

