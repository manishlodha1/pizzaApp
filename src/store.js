import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";



const store = configureStore(
{
    reducer:
    {
        user: userReducer,
        cart: cartReducer
    }
});

export default store;

//npm i redux-devtools-extension --legacy-peer-deps
//npm i @reduxjs/toolkit --legacy-peer-deps