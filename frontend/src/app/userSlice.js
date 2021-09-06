import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from 'api/userAPI'


export const login = createAsyncThunk('user/login', async (params) => {
    const response = await userAPI.login(params)
    return response.data;
});

export const register = createAsyncThunk('user/register', async (params) => {
    const response = await userAPI.register(params)
    return response.data;
});

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        error: null,
        userInfo: JSON.parse(localStorage.getItem("userInfo")), // get userInfo saved in local every refresh page
    },

    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("userInfo")
            state.userInfo = null
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.userInfo = action.payload
            state.error = null
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        [login.rejected]: (state, action) => {
            state.userInfo = null
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },


        [register.fulfilled]: (state, action) => {
            state.userInfo = action.payload
            state.error = null
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        [register.rejected]: (state, action) => {
            state.userInfo = null
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },
    }
})


const { reducer, actions } = UserSlice

export const { logout } = actions
export default reducer