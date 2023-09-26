import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slice/userSlice"
import categorySlice from "./slice/categorySlice"
import productSlice from "./slice/productSlice"
import orderSlice from "./slice/orderSlice"

export const store = configureStore({
    reducer: {
        users: userSlice,
        categories: categorySlice,
        products: productSlice,
        orders: orderSlice
    },


})

