import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import addressSlice, { addressAction } from '../../../store/checkout-infor/addressSlice';
// const addressArray = [
//     {
//         name:"",
//         phone:0,
//         address:"",
//         address2:"",
//         city:""
//     }
// ]
export default function AddressForm() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(0)
    const [address, setAddress] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    // const [addresses,setAddresses] = useState(addressArray)
    const dispatch = useDispatch()
    dispatch(
        addressAction.addAddress({
            name: name,
            phone: phone,
            address: address,
            address2: address2,
            city: city
        })
    )
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    } 
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    } 
    const handleAddress2Change = (e) => {
        setAddress2(e.target.value)
    } 
    const handleCityChange = (e) => {
        setCity(e.target.value)
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={name}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone"
                        fullWidth
                        autoComplete="phone"
                        variant="standard"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={address}
                        onChange={handleAddressChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        value={address2}
                        onChange={handleAddress2Change}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={city}
                        onChange={handleCityChange}
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                    />
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                    />
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    />
                </Grid> */}
                {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid> */}
            </Grid>
        </React.Fragment>
    );
}