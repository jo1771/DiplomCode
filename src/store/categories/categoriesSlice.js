import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: null,
    status: "",
    category: '',
    prodByCategory: [],
};

export const getCategories = createAsyncThunk('categoriesSlice/getCategories', async () => {
    const response = await axios.get('https://dummyjson.com/products/categories');
    return response.data;
});

export const fetchProductsByCategory = createAsyncThunk('categories/fetchProductsByCategory', async (category) => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return response.data.products; // Возвращаем только массив продуктов
});

const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.status = "Loading";
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.status = "Success";
            state.data = action.payload;
        });
        builder.addCase(getCategories.rejected, (state) => {
            state.status = "Error";
        });
        builder.addCase(fetchProductsByCategory.pending, (state) => {
            state.status = "Loading";
        });
        builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            state.status = "Success";
            state.prodByCategory = action.payload;
        });
        builder.addCase(fetchProductsByCategory.rejected, (state) => {
            state.status = "Error";
        });
    }
});

export const { setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;