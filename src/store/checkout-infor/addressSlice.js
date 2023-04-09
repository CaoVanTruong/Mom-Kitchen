// import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";
const items =
    localStorage.getItem("addressDetails") !== null
        ? JSON.parse(localStorage.getItem("addressDetails"))
        : [];

console.log(items.map((item) => item))
const setItemFunc = (item) => {
    localStorage.setItem("addressDetails", JSON.stringify(item));
};
const addressSlice = createSlice({
    name: "address",
    initialState: [
        {
            name:"",
            phone:1,
            address:"",
            address2:"",
            city:""
        }
    ],
    reducers: {
        addAddress(state, action) {
            const newAddress = [action.payload]
            state.push({
                // newAddress
                name: newAddress.name,
                phone:newAddress.phone,
                address: newAddress.addAddress,
                address2: newAddress.address2,
                city: newAddress.city
            })
            setItemFunc(state)
            // console.log("con cac j loi quai"+state.addresses)
        },
    }
})

export const addressAction = addressSlice.actions;
export default addressSlice;