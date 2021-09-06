import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderAPI from 'api/orderAPI'
import queryString from 'query-string';


// orderList ==============================================================================================

export const fetchOrderList = createAsyncThunk('orderList/fetchOrderList', async (filters) => {
    const paramsString = queryString.stringify(filters);
    const response = await orderAPI.getAll(paramsString)
    return response.data;
});

const OrderListSlice = createSlice({
    name: 'orderList',
    initialState: {
        orders: [],
        page: 1,
        pages: 1
    },

    reducers: {
    },
    extraReducers: {
        [fetchOrderList.fulfilled]: (state, action) => {
            state.orders = action.payload.orders
            state.page = action.payload.page
            state.pages = action.payload.pages
        },
    },
})
export const OrderListReducer = OrderListSlice.reducer


// orderDetail ==============================================================================================

export const getOrderDetail = createAsyncThunk('orderDetail/getOrderDetail', async (id) => {
    const response = await orderAPI.getOrderById(id)
    return response.data;
});

export const createOrder = createAsyncThunk('orderDetail/createOrder', async (data) => {
    const response = await orderAPI.createOrder(data)
    return response.data;
});

const OrderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        order: {},
        loading: true,
        error: null,
    },
    reducers: {
        clearOrderDetail: (state, action) => {
            state.order = {}
            state.error = null
        }
    },
    extraReducers: {
        [getOrderDetail.fulfilled]: (state, action) => {
            state.loading = false
            // console.log(action.payload)
            state.order = action.payload
            state.error = null
        },
        [getOrderDetail.pending]: (state, action) => {
            state.loading = true
        },
        [getOrderDetail.rejected]: (state, action) => {
            state.loading = false
            state.order = {}
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },

        [createOrder.fulfilled]: (state, action) => {
            state.order = action.payload
            state.error = null
        },
        [createOrder.rejected]: (state, action) => {
            state.order = {}
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },
    },
})
export const OrderDetailReducer = OrderDetailSlice.reducer
export const clearOrderDetail = OrderDetailSlice.actions.clearOrderDetail


// OrderPay ==============================================================================================
export const payOrder = createAsyncThunk('orderPay/payOrder', async (id, data) => {
    const response = await orderAPI.payOrder(id, data)
    return response.data;
});

const OrderPaySlice = createSlice({
    name: 'orderPay',
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: {
        [payOrder.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
        },
        [payOrder.pending]: (state, action) => {
            state.loading = true
        },
        [payOrder.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },
    },
})
export const OrderPayReducer = OrderPaySlice.reducer
// export const clearOrderDetail = OrderPaySlice.actions.clearOrderDetail
