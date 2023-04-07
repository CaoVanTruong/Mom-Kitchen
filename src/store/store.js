import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import addressSlice from "./checkout-infor/addressSlice"
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    addressSlice:addressSlice.reducer
  },
});

export default store;
