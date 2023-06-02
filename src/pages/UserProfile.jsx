import { Grid, Paper, TextField, makeStyles, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import '../styles/user-profile.css'
import { Link } from 'react-router-dom'
import UserSideBar from '../components/User/UserSideBar'
import Carts from "../components/UI/cart/Carts.jsx";
import { useSelector } from 'react-redux'
import { useInsertionEffect } from 'react'
import { useEffect } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
const UserProfile = () => {
    const showCart = useSelector((state) => state.cartUi.cartIsVisible);
    const user = localStorage.getItem('user-infor')
    const [inforUser, setInforUser] = useState({})
    const [password, setPassword] = useState('')
    // useEffect(() => {
    //     fetch('https://momkitchen.azurewebsites.net/api/Account/getallcustomerbyemail?email=' + (localStorage.getItem('user-infor') || ""), {
    //         method: 'GET'
    //     }).then(response => {
    //         return response.json()
    //     }).then(data => {
    //         setInforUser(data)
    //         setdefaultBuildingChange(data.defaultBuilding)
    //     })
    //     getAccountByEmail()
    // }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://momkitchen.azurewebsites.net/api/Account/getallcustomerbyemail?email=' + (localStorage.getItem('user-infor') || ""), {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setInforUser(data);
                setdefaultBuildingChange(data.defaultBuilding);

                // Call the getAccountByEmail function here
                getAccountByEmail();
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);
    const getAccountByEmail = () => {
        fetch(`https://momkitchen.azurewebsites.net/api/Account/getaccountbyemail?email=${localStorage.getItem('user-infor')}`).then(response => {
            return response.json()
        }).then(data => {
            setPassword(data.password)
        })
    }
    const { name, phone, image, email, defaultBuilding } = inforUser
    const [defaultBuildingChange, setdefaultBuildingChange] = useState()
    // console.log("default value là", defaultValue)
    console.log(email + defaultBuilding)
    return (
        <div>
            <Header />
            {showCart && <Carts />}
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
                        <Grid
                            container
                            spacing={3}
                            className='inputGroup'
                        >
                            <Grid item lg={12} md={12} xs={12}>
                                <TextField
                                    disabled
                                    label="E-mail"
                                    defaultValue=" "
                                    value={email}
                                    fullWidth>
                                </TextField>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                                <TextField
                                    label="Password"
                                    type='password'
                                    defaultValue="*****"
                                    value={password?.slice(-10)}
                                    variant='outlined'
                                    fullWidth
                                >
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} xs={6}>
                                <TextField
                                    label="Name"
                                    placeholder='Enter your full name'
                                    defaultValue=" "
                                    value={name}
                                    variant='outlined'
                                    fullWidth>
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} xs={6}>
                                <TextField
                                    label="Phone "
                                    placeholder='Enter your phone number'
                                    defaultValue=" "
                                    value={phone}
                                    variant='outlined'
                                    fullWidth>
                                </TextField>
                            </Grid>
                            <Grid item lg={12} md={12} xs={12}>
                                <TextField
                                    label="Default Building"
                                    type='number'
                                    defaultValue="1"
                                    value={defaultBuildingChange}
                                    onChange={(e) => setdefaultBuildingChange(e.target.value)}
                                    variant='outlined'
                                    fullWidth>
                                    InputProps={{
                                        inputProps: { min: 1, max: 15 }
                                    }}
                                </TextField>
                            </Grid>
                        </Grid>

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