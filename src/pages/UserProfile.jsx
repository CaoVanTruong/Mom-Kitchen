import { Grid, Paper, TextField, makeStyles, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import '../styles/user-profile.css'
import { Link } from 'react-router-dom'
import UserSideBar from '../components/User/UserSideBar'
const UserProfile = () => {
    const userTemplate = [
        {
            name: "",
            email: "",
            phone: "",
            address: ""
        }
    ]
    const [users, setUsers] = useState([userTemplate])
    const user = localStorage.getItem('user-infor')
    return (
        <div>
            <Header />
            <Container className='userProfile__container' style={{
                display: 'flex'
            }}>
                <UserSideBar />
                <div>
                    <Paper component={Box} p={4} mx="auto">
                        <h4 style={{
                            color: 'red'
                        }}>Hi {user} Welcome to Mom-kitchen.</h4>
                        <h4>My profile</h4>
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
                                            label="Account"
                                            placeholder='Your account'
                                            variant='outlined'
                                            fullWidth>
                                        </TextField>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            label="Password"
                                            placeholder='Your password'
                                            variant='outlined'
                                            fullWidth>
                                        </TextField>
                                    </Grid>
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
                                        <TextField
                                            label="E-mail"
                                            placeholder='Enter your e-mail'
                                            variant='outlined'
                                            fullWidth>
                                        </TextField>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            label="Default Building"
                                            placeholder='Enter your address'
                                            variant='outlined'
                                            fullWidth>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            ))
                        }
                        <div className='userProfile_btn'>
                            <Button variant='contained'>Submit</Button>
                        </div>
                    </Paper>
                </div>
            </Container>
            <Footer />
        </div>
    )
}

export default UserProfile