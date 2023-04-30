import React, { useState } from 'react'
import '../../styles/adminProfile.css'
import BootstrapNavbar from '../../components/Sidebar/BootstrapNavbar'
import SideMenu from '../../components/Sidebar/SideMenu'
import { Grid, Paper, TextField, makeStyles, Box, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Space, Typography, Table, Avatar, Rate, Input, Modal, Image, } from 'antd'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const AdminProfile = () => {
    const userTemplate = [
        {
            name: "",
            email: "",
            phone: "",
            address: ""
        }
    ]
    const [users, setUsers] = useState([userTemplate])
    return (
        <div>
            <BootstrapNavbar />
            <div className='SideMenuAndPageContentAdminProfile'>
                <SideMenu />
                <Space size={20} direction='vertical' width='100%' className='pageContent'>
                    <div>
                        <Typography.Title level={4} className='titlePage mt-2' style={{
                            marginLeft:10
                        }}>Information</Typography.Title>
                    </div>
                    <Space className='HorizontalTable' direction='horizontal'>
                        <div className='sideMenuInfor' style={{
                            marginTop: -220
                        }}>
                            <Paper className='profilePaper' style={{
                                marginLeft: 10
                            }}>
                                <div className='imageDiv' style={{
                                    paddingLeft: 50,
                                    paddingTop: 30
                                }}>
                                    <img
                                        className=''
                                        style={{
                                            position: 'relative',
                                            width: 120,
                                            height: 120,
                                            zIndex: 1,
                                            marginRight: 50,
                                            borderRadius: 100
                                        }}
                                        src='https://images2.thanhnien.vn/Uploaded/nguyenvan/2022_09_09/thanh-loc-doanhnhansaigon1-1508430693-750x0-8136.jpg'></img>
                                </div>
                                <div className='userProfile'>
                                    <div className='userProfile_Item' style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <h5>Tran Minh Tuan</h5>
                                    </div>
                                    <div className='userProfile_Item' style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <h6 style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>Admin</h6>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                        <div>
                            <Paper component={Box} p={4} mx="auto" style={{
                                marginRight: 20
                            }}>
                                <h4>Profile</h4>
                                <p>Manage profile information for account security</p>
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
                                                    placeholder='Enter your full name'
                                                    variant='outlined'
                                                    fullWidth>
                                                </TextField>
                                            </Grid>
                                            <Grid item lg={6}>
                                                <TextField
                                                    label="Phone "
                                                    placeholder='Enter your phone number'
                                                    variant='outlined'
                                                    fullWidth>
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
                                            <Grid item lg={6}>
                                                <TextField
                                                    label="E-mail"
                                                    placeholder='Enter your e-mail'
                                                    variant='outlined'
                                                    fullWidth>
                                                </TextField>
                                            </Grid>
                                            <Grid item lg={6}>
                                                <TextField
                                                    label="Address"
                                                    placeholder='Enter your address'
                                                    variant='outlined'
                                                    fullWidth>
                                                </TextField>
                                            </Grid>

                                        </Grid>
                                    ))
                                }
                                <div className='userProfile_btn'>
                                    <Button variant='contained'>Save</Button>
                                </div>
                            </Paper>
                        </div>
                        {/* </Container> */}
                    </Space>
                    <div>
                    </div>
                </Space>
            </div>
        </div >
    )
}

export default AdminProfile

