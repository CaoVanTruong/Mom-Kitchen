import React, { useState } from 'react'
import '../../styles/sessionAndBatchManagement.css'
import { Grid, Paper, TextField, Box, Menu } from '@mui/material'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { useEffect } from 'react'
import { getAllUsers } from '../../API/recentOrder'
import { Space, Typography, Table, Avatar, Rate, Button, Input, Modal, Image, Badge, Tag, Select } from 'antd'
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseOutlined,
} from '@ant-design/icons'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { createNewSession, deleteBatch, deleteSesion, getAllBatch, getAllSession, getAllShipper } from '../../API/admin/SessionAndBatch'
import { re } from 'mathjs'
import { render } from '@testing-library/react'
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
  const [shipper, setShipper] = useState()

  const [session, setSession] = useState()
  const handleChange = (event) => {
    setShipper(event.target.value)
  };
  const handleSession = (event) => {
    setSession(event.target.value)
  }
  const [isAdding, setIsAdding] = useState(false)
  const [isAddingBatch, setIsAddingBatch] = useState(false)
  const [isAddingSession, setIsAddingSession] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [dataSourceBatch, setDataSourceBatch] = useState([])
  const [sessionArray, setSessionArray] = useState([])
  const [shipperList, setShipperList] = useState([])
  const [sessionTitle, setSessionTitle] = useState()
  const [batchArray, setBatchArray] = useState([])
  const [sessionOnChange, setSessionOnChange] = useState()
  const [batchStatusOnChange, setBatchStatusOnChange] = useState()
  const [recordBatch, setRecordBatch] = useState({})
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
  const onChangeShipper = (e) => {
    const value = e.target.value
    setShipper(value)
  }
  const onChangeStatusSession = (record) => {
    setLoading(true)
    fetch('https://momkitchen.azurewebsites.net/api/Session/enablestarttime?id=' + record.id,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

        })
      }).then(res => {
        if (res.ok) {
          fetchAllSession()
        } else {
          alert("Update fail!")
        }
      })
  }
  useEffect(() => {
    setLoading(true)
    fetchAllSession()
    fetchAllBatch()
    fetchAllShipper()
  }, [])
  // function fetchAllSession() {
  //   getAllSession().then(data => {
  //     return setSessionArray(data)
  //     setLoading(false)
  //   }
  //   )
  // }

  function handleFilter(event) {
    const newData = sessionArray.filter(row => {
      return row.title.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setDataSource(newData)
  }
  function handleFilterBatch(event) {
    const newData = batchArray.filter(row => {
      return row.session.title.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setDataSourceBatch(newData)
  }
  const resetAdding = () => {
    setIsAdding(false)
    setIsAddingSession(false)
  }

  const resetAddingBatch = () => {
    setIsAddingBatch(false)
  }

  const fetchAllSession = () => {
    getAllSession().then(res => {
      setSessionArray(res)
      setDataSource(res)
      setLoading(false)
    })
  }
  const fetchAllBatch = () => {
    getAllBatch().then(res => {
      setBatchArray(res)
      setDataSourceBatch(res)
      setLoading(false)
    })
  }
  const fetchAllShipper = async () => {
    try {
      const response = await fetch('https://momkitchen.azurewebsites.net/api/Batch');
      if (response) {
        const responseData = await response.json();
        setShipperList(responseData);
        console.log(response.ok)
        console.log(responseData)

      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const chooseShipperForBatch = (value, id) => {
    console.log("record batch là" + value + id)
    fetch('https://momkitchen.azurewebsites.net/api/Batch/chooseshipperforbatch?batchid=' + id + "&emailshipper=" + value, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
    }).then(response => {
      if (response.ok) {
        fetchAllBatch()
        console.log("thanh cong")
      } else {
        console.log("that bai")
      }
    })
  }
  const chooseSessionForBatch = (id,value) => {
    console.log("record batch là" + value + id)
    fetch('https://momkitchen.azurewebsites.net/api/Session/choosesessionforbatch?batchid=' + id + "&sessionid=" + value, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }).then(response => {
      if (response.ok) {
        fetchAllBatch()
        console.log("thanh cong")
      } else {
        console.log("that bai")
      }
    })
  }
  const onCreateNewSession = () => {
    fetch('https://momkitchen.azurewebsites.net/api/Session', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: sessionTitle
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
              setIsAddingSession(false)
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
  const onDeleteBatchRecord = (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this record?',
      okText: <div>Yes</div>,
      okType: 'danger',
      cancelText: <div>Cancel</div>,
      onOk: () => {
        deleteBatch(record.id).then(res => {
          if (res.ok) {
            fetchAllBatch()
          } else {
            alert("Delete fail.")
          }
        })
      }
    })
  }
  const createNewBatch = () => {
    fetch('https://momkitchen.azurewebsites.net/api/Batch', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: batchStatusOnChange,
        sessionId: sessionOnChange
      })
    })
      .then(res => {
        if (res.ok) {
          fetchAllBatch()
          alert("Create new batch completed.")
        } else {
          alert("Can not create new batch!")
        }
      })
      .catch(error => {
        console.error("Error creating new batch:", error);
        alert("An error occurred while creating new batch.");
      });
  };
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
                  () => setIsAddingSession(true)
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
                  title: 'Title',
                  dataIndex: "title"
                },
                {
                  title: 'Create Date',
                  dataIndex: "createDate",
                  defaultSortOrder: 'ascend',
                  sorter: (a, b) => new Date(b.createDate) - new Date(a.createDate)
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
                          onClick={() => onChangeStatusSession(record)}
                          style={{
                            cursor: 'pointer',
                          }}>Off</Tag> : <Tag color='green' style={{ cursor: 'pointer' }} onClick={() => onChangeStatusSession(record)}>On</Tag>}
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
                  onChange={handleFilterBatch}
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
                  dataIndex: "session.title",
                  key: 'session',
                  width: 100,
                  render: (_, record) => {
                    // const defaultValue = record.shipper.name
                    return (
                      <Select
                        style={{ width: 200 }}
                        value={record.session?.title}
                        onChange={(value) => {
                          chooseSessionForBatch(record.id, value)
                          // chooseShipperForBatch(record.id)
                        }
                        }
                      >
                        {
                          dataSource.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.title}
                            </MenuItem>
                          ))}
                      </Select>
                    )
                  }
                },
                {
                  title: 'Shipper',
                  dataIndex: "shipper.name",
                  key: "shipper",
                  width: 200,
                  render: (_, record) => {
                    // const defaultValue = record.shipper.name
                    return (
                      <Select
                        style={{ width: 200 }}
                        value={record.shipper?.name}
                        onChange={(value) => {
                          chooseShipperForBatch(value, record.id)
                          // chooseShipperForBatch(record.id)
                        }
                        }
                      >
                        {
                          shipperList.map((option) => (
                            <MenuItem key={option.id} value={option.email}>
                              {option.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )
                  }
                },
                {
                  title: 'Status',
                  key: "status",
                  width: 50,
                  render: (_, record) => (

                    <Badge key={record.id}>
                      {(record.status == false) ? <Tag color='geekblue'
                      >Collect</Tag> : <Tag color='green'>Delivery</Tag>}
                    </Badge>
                  )
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
                          onClick={() => onDeleteBatchRecord(record)}
                          style={{ color: "red", marginLeft: 10 }} />
                      </div>
                    )
                  },
                  width: 50
                }
              ]}
              loading={loading}
              dataSource={dataSourceBatch}
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
            open={isAddingSession}
            okText={<div>Save</div>}
            onCancel={() => {
              resetAdding()
              // setIsEditing(false)
            }
            }
            cancelText={<div>Cancel</div>}
            onOk={() => {
              onCreateNewSession()
              setIsAddingSession(false)
            }
            }
            closeIcon={
              <div><CloseOutlined /></div>}
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
                      <Grid item lg={12}>
                        <TextField
                          label="Title"
                          placeholder='Enter session title...'
                          variant='outlined'
                          fullWidth
                          onChange={(e) => setSessionTitle(e.target.value)}
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
              () => {
                createNewBatch()
                setIsAddingBatch(false)
              }
            }
            closeIcon={
              <div style={{
                marginLeft: -30
              }}><CloseOutlined /></div>}
          >
            {/* new batch */}
            <Paper style={{
              marginTop: 20
            }} component={Box} p={4} mx="auto">
              {
                <Grid
                  container
                  spacing={3}
                  className='inputGroup'
                >
                  <Grid item lg={12}>
                    <Select
                      defaultValue="Select session"
                      value={sessionOnChange}
                      onChange={(value) => setSessionOnChange(value)}
                    >
                      {dataSource.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item lg={12}>
                    <Select
                      defaultValue="Select batch status"
                      value={batchStatusOnChange}
                      onChange={value => setBatchStatusOnChange(value)}
                    >
                      <MenuItem value="true">Delivery</MenuItem>
                      <MenuItem value="false">Collect</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              }

            </Paper>

          </Modal>
        </div>
      </div >
    </div >
  )
}
export default SessionAndBatch

