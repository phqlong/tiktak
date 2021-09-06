import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: 'cart',
    initialState: JSON.parse(localStorage.getItem('cartInfo') || "[]"),
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload.product
            const addQty = action.payload.qty

            const existItem = state.find(x => x.product.id === item.id)

            if (existItem) {
                existItem.qty += addQty
                existItem.qty = existItem.qty < 5 ? existItem.qty : 5
                existItem.qty = existItem.qty < existItem.product.quantity ? existItem.qty : existItem.product.quantity
            }
            else {
                state.push(action.payload)
            }
            localStorage.setItem("cartInfo", JSON.stringify(state))
        },

        setQtyInCart: (state, action) => {
            const itemId = action.payload.id
            const newQty = action.payload.qty

            const existItem = state.find(x => x.product.id === itemId)

            if (existItem) {
                existItem.qty = newQty < 5 ? (newQty > 1 ? newQty : 1) : 5
                existItem.qty = existItem.qty < existItem.product.quantity ? existItem.qty : existItem.product.quantity
            }
            localStorage.setItem("cartInfo", JSON.stringify(state))
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload

            const cart = state.filter(item => item.product.id !== itemId)

            localStorage.setItem("cartInfo", JSON.stringify(cart))
            return cart
        },

        clearCart: (state, action) => {
            const cart = []
            localStorage.setItem("cartInfo", JSON.stringify(cart))
            return cart
        }

    }
})


const { reducer, actions } = CartSlice
export const { addToCart, setQtyInCart, removeFromCart, clearCart } = actions
export default reducer