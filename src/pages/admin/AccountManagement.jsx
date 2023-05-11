import React, { useState } from 'react'
import '../../styles/accountManagement.css'
import { Grid, Paper, TextField, Box } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllUsers } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Button, Input, Modal, Image, Badge, Tag } from 'antd'
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseOutlined,
} from '@ant-design/icons'
import { getAllAccount } from '../../API/admin/getAllAccounts'
import Dropdown from 'react-bootstrap/Dropdown';
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
  const [value, setValue] = useState()
  const handleChange = (value) => {
    setValue(value)
  }
  const [active, setActive] = useState(true)
  const [toggle, setToggle] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isAddingUser, setIsAddingUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [userArray, setUserArray] = useState([])
  const [account, setAccount] = useState([])
  const onDeleteRecord = (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this record?',
      okText: <div>Yes</div>,
      okType: 'danger',
      cancelText: <div>Cancel</div>,
      onOk: () => {
        fetch('https://momkitchen.azurewebsites.net/api/Account/' + record.id,
          {
            method: 'DELETE'
          }
        ).then((res) => {
          if (res.ok) {
            alert("Delete successfully.")
            getAllAccount().then((res) => {
              setDataSource(res)
            })
          } else {
            console.log("something went wrong!")
          }
        }).catch((error) => {
          console.log(error.message)
        })
      }
    })
  }
  const onEditRecord = (record) => {
    setIsEditing(true)
    setEditingUser({ ...record })
  }
  const updateAccount = () => {
    fetch('https://momkitchen.azurewebsites.net/api/Account?id=' + editingUser.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: editingUser.email,
        password: editingUser.password,
        roleId: editingUser.roleId,
      })
    })
    getAllAccount().then((res) => {
      setDataSource(res)
    }
    )
    resetEditing()
  }
  function handleFilter(event) {
    const newData = userArray.filter(row => {
      return row.email.toLowerCase().includes(event.target.value.toLowerCase())
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
  useEffect(() => {
    setLoading(true)
    getAllAccount().then((res) => {
      setUserArray(res)
      setDataSource(res)
      setLoading(false)
    }
    )
  }, [])
  const onBanAccount = (record) => {
    setLoading(true)
    let status
    if (record.accountStatus === "true" || record.accountStatus === "True") {
      status = false
    } else if (record.accountStatus === "false" || record.accountStatus === "False") {
      status = true
    }
    fetch('https://momkitchen.azurewebsites.net/api/Account' + '?email=' + record.email + '&status=' + status,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => {
        if (res.ok) {
          setLoading(true)
          getAllAccount().then((res) => {
            setDataSource(res)
          }
          )
          alert("Update successfully.")
          setLoading(false)
        } else {
          alert("Update fail!")
        }
      })

  }
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
                  dataIndex: "password"
                },
                {
                  title: 'Role',
                  dataIndex: "roleId",
                },
                {
                  title: 'Status',
                  dataIndex: "accountStatus",
                  render: (_, record) => (
                    <>
                      <Badge key={record.id}>
                        {(record.accountStatus === "true") || (record.accountStatus === "True") ? <Tag color='geekblue'
                          onClick={() => onBanAccount(record)}
                          style={{
                            cursor: 'pointer',
                          }}>Inactive</Tag> : <Tag color='green' style={{ cursor: 'pointer' }} onClick={() => onBanAccount(record)}>Active</Tag>}
                      </Badge>
                    </>
                  )
                },
                {
                  title: "Actions",
                  render: (record) => {
                    return (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                      }}>
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
            onOk={() => updateAccount()}
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
                      <Grid item lg={12}>
                        {/* <TextField
                        label="Role"
                        placeholder='Enter new role...'
                        variant='outlined'
                        fullWidth
                        value={editingUser?.roleId}
                        onChange={(e) => {
                          setEditingUser(pre => {
                            return { ...pre, roleId: e.target.value }
                          })
                        }}
                      >
                      </TextField> */}
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic" variant={value} onChange={handleChange}>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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

