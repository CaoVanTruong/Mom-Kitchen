import React, { useState } from 'react'
import '../../styles/sessionAndBatchManagement.css'
import { Grid, Paper, TextField, Box } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllUsers } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Button, Input, Modal, Image, Badge, Tag } from 'antd'
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseOutlined,
} from '@ant-design/icons'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createNewSession, deleteSesion, getAllSession } from '../../API/admin/SessionAndBatch'
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
      id: 1,
      name: "truong1",
    },
    {
      id: 2,
      name: "truong2",
    },
    {
      id: 3,
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
  const [shipper, setShipper] = useState(shipperList)
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    setShipper(event.target.value)
  };
  const [chosenShipper, setChosenShipper] = useState("")
  const handleShipper = (value) => {
    setChosenShipper(value.target.value)
  }
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isAddingBatch, setIsAddingBatch] = useState(false)

  const [isAddingUser, setIsAddingUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [sessionArray, setSessionArray] = useState([])
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
  const toggleSession = (record) => {
    setLoading(true)
    let status
    console.log("id la gi" + record.id)
    console.log("status cua record hien tai la" +record.status)
    if(record.status === true) {
      status = false
    } else if (record.status === false) {
      status = true
    }
    console.log("Status la" + status)

    fetch('https://momkitchen.azurewebsites.net/api/Session?id=' + record.id + '&status=' + status,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => {
        if (res.ok) {
          setLoading(true)
          getAllSession().then((res) => {
            setDataSource(res)
          }
          )
          setLoading(false)
        } else {
          alert("Update fail!")
        }
      })

  }
  const onEditRecord = (record) => {
    setIsEditing(true)
    setEditingUser({ ...record })
  }
  function handleFilter(event) {
    const newData = sessionArray.filter(row => {
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
    getAllSession().then(res => {
      setSessionArray(res)
      setDataSource(res)
      setLoading(false)
    })
  }, [])
  const onCreateNewSession = () => {
    fetch('https://momkitchen.azurewebsites.net/api/Session', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        console.log("Something went wrong")
      }
    }
    ).then((res) => {
      setLoading(true)
      getAllSession().then(res => {
        setDataSource(res)
        setLoading(false)
        alert("Create new session successfully.")
      })
    })
  }
  const onDeleteSessionRecord = (record) => {
    console.log(record.id)
    Modal.confirm({
      title: 'Are you sure, you want to delete this record?',
      okText: <div>Yes</div>,
      okType: 'danger',
      cancelText: <div>Cancel</div>,
      onOk: () => {
        fetch('https://momkitchen.azurewebsites.net/api/Session/' + record.id, {
          method: 'DELETE'
        }).then(res => {
          if (res.ok) {
            setLoading(true)
            getAllSession().then(res => {
              setDataSource(res)
              setLoading(false)
              alert("Delete session successfully.")
            })
          } else {
            alert("Delete fail.")
          }
        }
        )
      }
    })
  }
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
                  () => onCreateNewSession()
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
                  dataIndex: "createDate"
                },

                {
                  title: 'Start time',
                  dataIndex: "startTime"
                },
                {
                  title: 'End time',
                  dataIndex: "endTime"
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  render: (_, record) => (
                    <>
                      <Badge key={record.id}>
                        {(record.status === true) ? <Tag color='geekblue'
                          onClick={() => toggleSession(record)}
                          style={{
                            cursor: 'pointer',
                          }}>Off</Tag> : <Tag color='green' style={{ cursor: 'pointer' }} onClick={() => toggleSession(record)}>On</Tag>}
                      </Badge>
                    </>
                  )
                },
                {
                  title: "Actions",
                  render: (record) => {
                    return (
                      <div>
                        <DeleteOutlined
                          onClick={() => onDeleteSessionRecord(record)}
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
                  render: (_, record) => (
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={shipper.name}
                          onChange={handleChange}
                          EditOutlined='none'
                        >
                          {
                            shipperList.map((shipper) => (
                              <MenuItem value={shipper.id}>{shipper.name}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Box>
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
            // onOk={
            //   // () => {
            //   //   resetAdding()
            //   // }
            // }
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
            // onOk={
            //   // () => {
            //   //   resetAdding()
            //   // }
            // }
            closeIcon={
              <div style={{
                marginLeft: -30
              }}><CloseOutlined /></div>}
          >
            {/* new batch */}
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
                          <Box sx={{ Width: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-helper-label">Session</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={shipper.name}
                                label="Choose session"
                                onChange={handleChange}
                                EditOutlined='none'
                              >
                                {
                                  shipperList.map((shipper) => (
                                    <MenuItem value={shipper.id}>{shipper.name}</MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                          </Box>
                        </select>
                      </Grid>
                      <Grid item lg={6}>
                        <TextField
                          label="Role"
                          placeholder='Enter role...'
                          variant='outlined'
                          fullWidth
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

