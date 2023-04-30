import React, { useState } from 'react'
import '../../styles/sessionAndBatchManagement.css'
import { Grid, Paper, TextField, Box } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllUsers } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Button, Input, Modal, Image } from 'antd'
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseOutlined,
} from '@ant-design/icons'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const SessionAndBatch = () => {
  const userTemplate = [
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: ""
    }
  ]
  const shipperList = [
    {
      name: "truong1",
    },
    {
      name: "truong2",
    },
    {
      name: "truong3",
    }
  ]
  const sessionList = [
    {
      title: 1,
    },
    {
      title: 2,
    },
    {
      title: 3
    }
  ]
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isAddingBatch, setIsAddingBatch] = useState(false)

  const [isAddingUser, setIsAddingUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [userArray, setUserArray] = useState([])
  const [toggle, setToggle] = useState(false)
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
  const resetAdding = () => {
    setIsAdding(false)
    setIsAddingUser(null)
  }

  const resetAddingBatch = () => {
    setIsAddingBatch(false)
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
      <div className='SideMenuAndPageContentSessionAndBatch'>
        <SideMenu />
        {/* sesstiontable */}
        <Space size={20} direction='vertical' width='100%' className='PageContentSessionBatch'>
          <div>
            <Typography.Title level={4} className='titlePage mt-2' style={{
              marginLeft: 10
            }}>Session and Batch</Typography.Title>
          </div>
          <Space style={
            {
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: -20
            }
          }>
            <Typography.Title level={4} className='titlePage mt-2' style={{
              marginLeft: 10
            }}>Session</Typography.Title>
            <div className='AddSeachBar' style={{
              marginRight: 20
            }}>
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
                Add session
              </Button>
            </div>
          </Space>
          <Space className='HorizontalTable' direction='horizontal' style={{
            marginTop: -15
          }}>
            <Table
              className='tableData'
              style={{
                borderRadius: 50,
              }}
              columns={[
                {
                  title: '#',
                  dataIndex: "id"
                },
                {
                  title: 'Create Date',
                  dataIndex: "email"
                },

                {
                  title: 'Start time',
                  dataIndex: "phone"
                },
                {
                  title: 'End time',
                  dataIndex: "phone"
                },
                {
                  title: 'Status',
                  dataIndex: 'id',
                  render: () => (
                    <span style={{
                      textDecorationLine: 'underline',
                      cursor: 'pointer',
                    }}
                      onClick={() => setToggle(!toggle)}
                    >{toggle ? 'On' : 'Off'}</span>
                  ),
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
                          style={{ color: "red", marginLeft: 10 }} />
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
          {/* batch table */}
          <Space style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <Typography.Title level={4} className='titlePage mt-2' style={{
                marginLeft: 10
              }}>Batch</Typography.Title>
            </div>
            <div className='AddSeachBar' style={{
              marginRight: 20
            }}>
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
                  () => setIsAddingBatch(true)
                }
              >
                <PlusCircleOutlined style={{
                  fontSize: '24px',
                  marginLeft: 0
                }}
                />
                Add Batch
              </Button>
            </div>
          </Space>
          <Space className='HorizontalTable' direction='horizontal' style={{
            marginTop: -15
          }}>
            <Table
              className='tableData'
              style={{
                borderRadius: 50,
                marginLeft: 10,
              }}

              columns={[
                {
                  title: '#',
                  dataIndex: "id",
                  width: 50
                },
                {
                  title: 'Session',
                  dataIndex: "id",
                  width: 100
                },
                {
                  title: 'Shipper',
                  dataIndex: "email",
                  width: 200,
                  render: () => (
                    <Nav style={{
                      width: 200,
                      marginLeft: -15
                    }}>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Choose shipper"
                        menuVariant="dark"
                        value={shipperList.name}
                      >
                        {
                          shipperList.map((shipper) =>
                            <NavDropdown.Item key={shipper.name} value={shipper.name}>{shipper.name}</NavDropdown.Item>
                          )
                        }
                      </NavDropdown>
                    </Nav>
                  )
                },

                {
                  title: 'Status',
                  dataIndex: "id",
                  width: 50,
                  defaultSortOrder: 'ascend',
                  sorter: (a, b) => a.id - b.id
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
                          style={{ color: "red", marginLeft: 10 }} />
                      </div>
                    )
                  },
                  width: 50
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
        </Space>
        <div>
          {/* Modal add session */}
          <Modal
            title="Add session"
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
          {/* modal add batch */}
          <Modal
            title="Add batch"
            open={isAddingBatch}
            okText={<div>Save</div>}
            onCancel={() => {
              resetAddingBatch()
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
                        <select style={{
                          height: 50,
                          borderRadius: 10
                        }}>
                          <option>Choose session</option>
                          {
                            sessionList.map(session => (
                              <option value={session.title}>{session.title}</option>
                            ))
                          }
                        </select>
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

export default SessionAndBatch

