import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice.js";

export const store = configureStore({
    reducer:{
        products: productsSlice,
    }
})