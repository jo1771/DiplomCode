import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: null,
    status: "",
};

export const getProducts = createAsyncThunk('productsSlice/getProducts', async () => {
    const response = await axios.get(`https://dummyjson.com/products?limit=100`);
    return response.data.products;
});

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {
        
    },
        extraReducers: (builder) => {
            builder.addCase(getProducts.pending, (state) => {
                state.status = "Loading";
            });
            builder.addCase(getProducts.fulfilled, (state, action) => {
                state.data = action.payload;
            });
            builder.addCase(getProducts.rejected, (state) => {
                state.status = "Error";
            });
        }
    });

export default productsSlice.reducer;