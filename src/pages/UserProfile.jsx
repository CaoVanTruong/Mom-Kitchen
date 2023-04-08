import { Grid, Paper, TextField, makeStyles, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import '../styles/user-profile.css'
import { Link } from 'react-router-dom'
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
    return (
        <div>
            <Header />
            <Container className='userProfile__container'>
                <div>
                    <div>
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
                        <div className='userProfile_Item'>
                            <i class="ri-account-circle-line"></i>
                            <Link to='/#'><p>Your account</p></Link>
                        </div>
                        <div className='userProfile_Item'>
                            <i class="ri-article-line"></i>
                            <Link to='/#'><p>Order history</p></Link>

                        </div>
                    </div>
                </div>
                <div>
                    <Paper component={Box} p={4} mx="auto">
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