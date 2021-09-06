import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "./userSlice"
import { ProductListReducer, ProductDetailReducer } from "./productSlice"
import { OrderListReducer, OrderDetailReducer, OrderPayReducer } from "./orderSlice"
import CartReducer from './cartSlice'

const store = configureStore({
    reducer: {
        user: UserReducer,

        productList: ProductListReducer,
        productDetail: ProductDetailReducer,

        orderList: OrderListReducer,
        orderDetail: OrderDetailReducer,
        orderPay: OrderPayReducer,

        cart: CartReducer,
    },
})

export default store
