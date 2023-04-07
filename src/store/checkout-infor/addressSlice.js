// import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";
const details =
    localStorage.getItem("addressDetail") !== null
        ? JSON.parse(localStorage.getItem("addressDetail"))
        : [];
        console.log("Nay la in detail?" + details.map((item) => item.name))
// const setItemFunc = (item) => {
//     localStorage.setItem("cartItems", JSON.stringify(item));
// };
const initialState =
{
    addresses: details
}

const addressSlice = createSlice({
    name: "addressForm",
    initialState,
    reducers: {
        addAddress(state, action) {
            console.log("co vao duoc ham them dia chi khong")
            const newAddress = action.payload
            console.log("gia tri lay tu action.payload"+newAddress)
            state.addresses.push({
                name: newAddress.name,
                phone: newAddress.phone,
                address: newAddress.address,
                address2: newAddress.address2,
                city: newAddress.city
            })
            console.log("cai nay la load mang xem co gi khong " + state.addresses)
            localStorage.setItem("addressDetail", JSON.stringify(state.addresses.map((address) => address))
            )
        },
    }
})

export const addressAction = addressSlice.actions;
export default addressSlice;