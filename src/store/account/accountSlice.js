import { createSlice } from "@reduxjs/toolkit"
const acc =
    localStorage.getItem("account") !== null
        ? JSON.parse(localStorage.getItem("account"))
        : [];
const initialState = {
    accounts: [
        acc
    ]
}
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        addAccount(state, action) {
            const newAccount = action.payload;
            state.accounts.push({
                email: newAccount.email,
                password: newAccount.password
            })
            // localStorage.setItem("accounts", JSON.stringify(state.accounts.map((account) => account)));
            console.log("email moi la " + newAccount.email)
            // localStorage.setItem("account", JSON.stringify(state.accounts.map((account) => account)))
            localStorage.setItem("account", JSON.stringify(newAccount))

            // state.cartItems.map((item) => item)
            // localStorage.setItem("acc", JSON.stringify(newAccount.map((acc)=>acc)))
        },
    }
})
export const accountAction = accountSlice.actions
export default accountSlice