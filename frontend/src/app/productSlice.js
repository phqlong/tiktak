import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productAPI from 'api/productAPI'
import queryString from 'query-string';


// productList ==============================================================================================

export const fetchProductList = createAsyncThunk('productList/fetchProductList', async (filters) => {
    const paramsString = queryString.stringify(filters);
    const response = await productAPI.getAll(paramsString)
    return response.data;
});

const ProductListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        page: 1,
        pages: 1
    },

    reducers: {
    },
    extraReducers: {
        [fetchProductList.fulfilled]: (state, action) => {
            state.products = action.payload.products
            state.page = action.payload.page
            state.pages = action.payload.pages
        },
    },
})
export const ProductListReducer = ProductListSlice.reducer


// productDetail ==============================================================================================

export const getProductDetail = createAsyncThunk('productDetail/getProductDetail', async (id) => {
    const response = await productAPI.get(id)
    return response.data;
});

// createReview ==============================================================================================

export const createReview = createAsyncThunk('productDetail/createReview', async (data) => {
    const { id, review } = data
    const response = await productAPI.createReview(id, review)
    return response.data;
});

const ProductDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        product: {},
        review: null,
        error: null,
    },
    reducers: {
    },
    extraReducers: {
        [getProductDetail.fulfilled]: (state, action) => {
            state.product = action.payload
            state.error = null
        },
        [getProductDetail.rejected]: (state, action) => {
            state.product = {}
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },

        [createReview.fulfilled]: (state, action) => {
            state.review = action.payload
            state.error = null
        },
        [createReview.rejected]: (state, action) => {
            state.review = {}
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },
    },
})
export const ProductDetailReducer = ProductDetailSlice.reducer


