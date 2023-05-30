import React, { useState } from 'react'
import '../../styles/userManagement.css'
import { Grid, Paper, TextField, Box } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllUsers } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Button, Input, Modal, Image } from 'antd'
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseOutlined,
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
      password: "",
      phone: "",
      address: ""
    }
  ]
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isAddingUser, setIsAddingUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [userArray, setUserArray] = useState([])
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
    setEditingUser({ ...record })
  }
  function handleFilter(event) {
    const newData = userArray.filter(row => {
      return row.firstName.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setDataSource(newData)
  }
  const resetEditing = () => {
    setIsEditing(false)
    setEditingUser(null)
  }
  const resetAdding = () => {
    setIsAdding(false)
    setIsAddingUser(null)
  }
  useEffect(() => {
    setLoading(true)
    getAllUsers().then(res => {
      setUserArray(res.users)
      setDataSource(res.users)
      setLoading(false)
    })
  }, [])

  const onAddNewUser = () => {
    const randomNumber = parseInt(Math.random() * 100)
    const newStudent = {
      id: randomNumber,
      firstName: "Name" + randomNumber,
      phone: randomNumber,
      email: "password" + randomNumber,
    }
    setDataSource((pre) => {
      return [...pre, newStudent]
    })
    setIsAdding(false)
  };

  // const fetchUserData = () => {
  //   fetch("https://momkitchen.azurewebsites.net/api/User/getalluser")
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       setDataSource(data)
  //     })
  // }
  // useEffect(() => {
  //   fetchUserData()
  // }, [])
  return (
    <div>
      <BootstrapNavbar />
      <SideMenu />
      <div className='SideMenuAndPageContentUserManagement'>
        <Space size={20} direction='vertical' width='100%' className='pageContentUserManage'>
          <div>
            <Typography.Title level={4} className='titlePage mt-2' style={{
              marginLeft: 10
            }}>User Management</Typography.Title>
          </div>
          <div className='AddSeachBar'>
            <div className='SearchWithIcon'>
              <TextField
                id="filled-search"
                label="Search"
                type="search"
                variant="filled"
                onChange={handleFilter}
                style={{
                  width: 300,
                  marginLeft: 0,
                  marginRight: 10
                }}
              />
            </div>
            <Button className='AddButton' type="primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'pink',
                height: 55
              }}
              onClick={
                // onAddNewUser
                () => setIsAdding(true)
              }
            >
              <PlusCircleOutlined style={{
                fontSize: '24px',
                marginLeft: 0
              }}
              />
              Add User
            </Button>
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
                  title: 'Avatar',
                  dataIndex: "image",
                  render: (link) => {
                    return <Avatar src={link} />
                  }
                }, {
                  title: 'Name',
                  dataIndex: "firstName"
                }
                , {
                  title: 'Email',
                  dataIndex: "email"
                },
                {
                  title: 'Phone',
                  dataIndex: "phone"
                },
                {
                  title: 'Address',
                  dataIndex: "address"
                },
                {
                  title: 'Batch',
                  dataIndex: "batch"
                },
                {
                  title: 'Building',
                  dataIndex: "building"
                },
                {
                  title: 'Default Building',
                  dataIndex: "building"
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
                  pageSize: 7
                }
              }
            >
            </Table>
          </Space>
        </Space>
        <div>
          {/* modal edit */}
          <Modal
            title="Edit user"
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
                return pre.map(user => {
                  if (user.id === editingUser.id) {
                    return editingUser
                  } else {
                    return user
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
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Image src={editingUser?.image}
              ></Image>
            </div>
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
                          value={editingUser?.firstName}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, firstName: e.target.value }
                            })
                          }}
                        >
                        </TextField>
                      </Grid>
                      <Grid item lg={6}>
                        <TextField
                          label="Email"
                          placeholder='Enter user e-mail'
                          variant='outlined'
                          fullWidth
                          value={editingUser?.email}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, email: e.target.value }
                            })
                          }}
                        >
                        </TextField>
                      </Grid>
                      <Grid item lg={6}>
                        <TextField
                          label="Phone"
                          placeholder='Enter user phone number...'
                          variant='outlined'
                          fullWidth
                          value={editingUser?.phone}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, phone: e.target.value }
                            })
                          }}
                        >
                        </TextField>
                      </Grid>
                      <Grid item lg={6}>
                        <TextField
                          label="Username"
                          placeholder='Enter user name...'
                          variant='outlined'
                          fullWidth
                          value={editingUser?.username}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, username: e.target.value }
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
                          value={editingUser?.password}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, password: e.target.value }
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
          {/* Modal add user */}
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
            onOk={
              () => {
                onAddNewUser()
                resetAdding()
              }
            }
            closeIcon={
              <div style={{
                marginLeft: -30
              }}><CloseOutlined /></div>}
          >
            <Image src={editingUser?.image}></Image>
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
                          value={editingUser?.firstName}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, firstName: e.target.value }
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
                          value={editingUser?.phone}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, phone: e.target.value }
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
                          value={editingUser?.email}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, email: e.target.value }
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
                          value={editingUser?.password}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, password: e.target.value }
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
                          value={editingUser?.address}
                          onChange={(e) => {
                            setEditingUser(pre => {
                              return { ...pre, address: e.target.value }
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

