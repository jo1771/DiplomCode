import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice.js";
import categoriesSlice from "./categories/categoriesSlice.js";

export const store = configureStore({
    reducer:{
        products: productsSlice,
        categories: categoriesSlice,
    }
})