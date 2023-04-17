import React, { useState } from 'react'
import '../../styles/userManagement.css'
import { Grid, Paper, TextField, makeStyles, Box } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllProducts } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Button, Input, Modal, Image } from 'antd'
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseOutlined, CheckCircleOutlined
} from '@ant-design/icons'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const UserManagement = () => {
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
          <div>
            <Typography.Title level={4} className='titlePage mt-5'>Customer Management</Typography.Title>
          </div>
          <div className='AddSeachBar'>
            <Button className='AddButton' type="primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'pink',
                marginLeft: 60
              }}
              onClick={() => setIsAdding(true)}

            >
              <PlusCircleOutlined style={{
                fontSize: '24px',
                marginLeft: 0
              }}
              />
              Add User
            </Button>
            <div className='SearchWithIcon'>
              <input type='text-end' onChange={handleFilter} placeholder='Search...' style={{
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                paddingLeft: 5,
                width: 300
              }}>
              </input>
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
                  title: 'Username',
                  dataIndex: "title"
                }, {
                  title: 'Name',
                  dataIndex: "price"
                }
                , {
                  title: 'Email',
                  dataIndex: "stock"
                },
                {
                  title: 'Phone',
                  dataIndex: "stock"
                },
                {
                  title: "Actions",
                  render: (record) => {
                    return (
                      <div>
                        <EditOutlined
                          onClick={() => onEditRecord(record)
                          }
                          style={{ marginLeft: 0 }} />
                        <DeleteOutlined
                          onClick={() => onDeleteRecord(record)}
                          style={{ color: "red", marginLeft: 12 }} />
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
              <Input value={editingProduct?.title} onChange={(e) => {
                setEditingProduct(pre => {
                  return { ...pre, title: e.target.value }
                })
              }} />
              <Input value={editingProduct?.price} onChange={(e) => {
                setEditingProduct(pre => {
                  return { ...pre, price: e.target.value }
                })
              }} />
            </Modal>
          </div>
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
            title="Add User"
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
                          label="Name"
                          placeholder='Enter user name...'
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
                          label="Phone Number"
                          placeholder='Enter phone number...'
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
                          label="E-mail"
                          placeholder='Enter user email...'
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
                          label="Password"
                          placeholder='Enter user password...'
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
                      <Grid item lg={6}>
                        <TextField
                          label="Address"
                          placeholder='Enter address...'
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Birthday"
                            fullWidth
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item lg={6}>
                        <FormControl >
                          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            <Space>
                              <FormControlLabel value="female" control={<Radio />} label="Female" />
                              <FormControlLabel value="male" control={<Radio />} label="Male" />
                              <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </Space>
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  ))
                }
              </Paper>
            </div>
          </Modal>
        </div>
      </div >
    </div >
  )
}

export default UserManagement

