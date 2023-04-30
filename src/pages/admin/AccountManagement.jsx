import React, { useState } from 'react'
import '../../styles/accountManagement.css'
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
import { render } from '@testing-library/react'
const AccountManagement = () => {
  const userTemplate = [
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: ""
    }
  ]

  const [toggle, setToggle] = useState(true)
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
      <div className='SideMenuAndPageContentAccount'>
        <Space size={20} direction='vertical' className='PageContentAccountManage'>
          <div>
            <Typography.Title level={4} className='titlePage mt-2' style={{
              marginLeft: 10
            }}>Account Management</Typography.Title>
          </div>
          <Space className='AddSeachBar'>
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
              Add account
            </Button>

          </Space>
          <Space className='HorizontalTable' direction='horizontal'>
            <Table
              className='tableData'
              style={{
                borderRadius: 50,
              }}
              columns={[
                {
                  title: 'Email',
                  dataIndex: "email"
                },
                {
                  title: 'Password',
                  dataIndex: "email"
                },

                {
                  title: 'Phone',
                  dataIndex: "phone"
                },
                {
                  title: 'Role',
                  dataIndex: "phone"
                },
                {
                  title: 'Status',
                  dataIndex: "id",
                  render: () => (
                    <span style={{
                      textDecorationLine: 'underline',
                      cursor: 'pointer',
                    }}
                      onClick={() => setToggle(!toggle)}
                    >{toggle ? 'Ban' : 'Unban'}</span>
                  )
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
                  pageSize: 9
                }
              }
            >
            </Table>
          </Space>
        </Space>
        <div>
          {/* modal edit */}
          <Modal
            title="Edit account"
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
                          label="Role"
                          placeholder='Role....'
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
          {/* Modal add account */}
          <Modal
            title="Add account"
            open={isAdding}
            okText={<div>Save</div>}
            onCancel={() => {
              resetAdding()
              // setIsEditing(false)
            }
            }
            cancelText={<div>Cancel</div>}
            onOk={
              () => onAddNewUser()
              // () => {
              //   resetAdding()
              // }
            }
            closeIcon={
              <div style={{
                marginLeft: -30
              }}><CloseOutlined /></div>}
          >
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
                          label="Role"
                          placeholder='Enter role...'
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

export default AccountManagement

