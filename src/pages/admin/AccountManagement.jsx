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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllAccount } from '../../API/admin/getAllAccounts'
import Dropdown from 'react-bootstrap/Dropdown';
const AccountManagement = () => {
  const roleList = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "Customer",
    },
    {
      id: 3,
      name: "Chef",
    },
    {
      id: 4,
      name: "Shipper"
    }
  ]
  const twoRoleList = [
    {
      id: "3",
      name: "Chef",
    },
    {
      id: "4",
      name: "Shipper"
    }
  ]
  const [isEditing, setIsEditing] = useState(false)
  const [isAddingAccount, setIsAddingAccount] = useState(false)
  const [addingAccount, setAddingAccount] = useState({})
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [userArray, setUserArray] = useState([])
  const [emailAccount, setEmailAccount] = useState("")
  const [passwordAccount, setPasswordAccount] = useState("")
  const [roleAccount, setRoleAccount] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    setLoading(true)
    fetchAccount()
  }, [])
  // function handleFilter(event) {
  //   const filterValue = event.target.value.toLowerCase();
  //   const newData = filterValue === "" ? dataSource : dataSource.filter(row => {
  //     return row.email.toLowerCase().includes(filterValue);
  //   });
  //   setDataSource(newData);
  // }
  function handleFilter(event) {
    const newData = userArray.filter(row => {
      return row.email?.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setDataSource(newData)
  }
  const onEditRecord = (record) => {
    setIsEditing(true)
    setEditingUser({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false)
    setEditingUser(null)
  }
  const resetAdding = () => {
    setIsAddingAccount(false)
    setAddingAccount("")
    setEmailAccount("")
    setPasswordAccount("")
    // setRoleAccount(null)
    // setAddingAccount(null)
    // resetAdding()
  }
  const updateAccount = () => {
    fetch('https://momkitchen.azurewebsites.net/api/Account?email=' + editingUser.email, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: editingUser.password,
        roleid: editingUser.roleId,
      })
    }).then(response => {
      if (response.ok) {
        getAllAccount().then(res => {
          setDataSource(res)
          setUserArray(res)
        })
      } else {
        console.log("Something went wrong!")
      }
    })

    resetEditing()
  }
  const onAddNewUser = () => {
    fetch('https://momkitchen.azurewebsites.net/api/Registration/registerchefandshipper', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: passwordAccount,
        email: emailAccount,
        roleId: roleAccount,
      })
    }).then(res => {
      if (res.ok) {
        fetchAccount()
        alert("Add new account successfully.")
      } else {
        alert("Have to fill all field in form.")
      }
    })
    // resetAdding()
    // resetAdding()
  };
  const fetchAccount = () => {
    getAllAccount().then(data => {
      setUserArray(data)
      setDataSource(data)
      setLoading(false)
    }).catch((error) => {
      alert("Loi add account" + error)
    })
  }
  // function handleFilter(event) {
  //   const newData = dataSource.filter(row => {
  //     return row.email.toLowerCase().includes(event.target.value.toLowerCase())
  //   })
  //   setDataSource(newData)
  // }

  // alert(isAddingUser?.email)
  // console.log(addingUser?.email + addingUser?.password + addingUser?.roleId)


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
          fetchAccount()
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
                () => setIsAddingAccount(true)
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
                  dataIndex: "email",
                  defaultSortOrder: 'a-z',
                  sorter: (a, b) => a.email.localeCompare(b.email)
                },
                {
                  title: 'Role',
                  dataIndex: "roleId",
                  filters: [
                    {
                      text: 'Admin',
                      value: 1,
                    },
                    {
                      text: 'Customer',
                      value: 2,
                    },
                    {
                      text: 'Chef',
                      value: 3,
                    },
                    {
                      text: 'Shipper',
                      value: 4
                    }
                  ],
                  filterMode: 'tree',
                  filterSearch: true,
                  onFilter: (value, record) => record.roleId === value,
                  width: '30%',
                  render: (_, record) => (
                    <>
                      <Badge key={record.id}>
                        {
                          record.roleId == "1" ? <Tag color='pink' style={{ cursor: 'pointer' }}>Admin</Tag> :
                            record.roleId == "2" ? <Tag color='yellow' style={{ cursor: 'pointer' }}>Customer</Tag> :
                              record.roleId == "3" ? <Tag color='blue' style={{ cursor: 'pointer' }}>Chef</Tag> :
                                record.roleId == "4" ? <Tag color='orange' style={{ cursor: 'pointer' }}>Shipper</Tag> : ""
                        }
                      </Badge>
                    </>
                  )
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
                        flexDirection: 'row'
                      }}>
                        <EditOutlined
                          onClick={() => onEditRecord(record)
                          }
                          style={{ marginLeft: 0 }} />
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
            closeIcon={<CloseOutlined />}
          >
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
                      label="Email"
                      placeholder='Enter user e-mail'
                      variant='outlined'
                      fullWidth
                      disabled
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
                      disabled
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
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={editingUser?.roleId}
                        onChange={(e) => {
                          setEditingUser(
                            pre => {
                              return { ...pre, roleId: e.target.value }
                            }
                          )
                        }}
                        EditOutlined='none'
                      >
                        {
                          roleList.map((role) => (
                            <MenuItem value={role.id}>{role.name}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Modal>
          {/* Modal add account */}
          <Modal
            title="Add account"
            open={isAddingAccount}
            okText={<div>Save</div>}
            onCancel={() => {
              resetAdding()
              // setIsEditing(false)
            }
            }
            cancelText={<div>Cancel</div>}
            onOk={() => {
              onAddNewUser()
              resetAdding()
              setIsAddingAccount(false)
            }
            }
            closeIcon={
              <div><CloseOutlined /></div>}
          >
            <div>
              <Paper style={{
                marginTop: 20
              }} component={Box} p={4} mx="auto">

                <Grid
                  container
                  spacing={3}
                >
                  <Grid item lg={6}>
                    <TextField
                      label="E-mail"
                      defaultValue={emailAccount}
                      variant='outlined'
                      fullWidth
                      value={emailAccount}
                      onChange={(e) =>
                        setEmailAccount(e.target.value)
                      }
                    >
                    </TextField>
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      label="Password"
                      defaultValue=""
                      type='password'
                      variant='outlined'
                      fullWidth
                      value={passwordAccount}
                      onChange={(e) =>
                        setPasswordAccount(e.target.value)
                      }
                    >
                    </TextField>
                  </Grid>
                  <Grid item lg={12}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={roleAccount}
                        onChange={(e) =>
                          setRoleAccount(e.target.value)
                        }
                      >
                        {twoRoleList.map((role) => (
                          <MenuItem value={role.id}>{role.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Modal>
        </div>
      </div >
    </div >
  )
}

export default AccountManagement
