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

export const updateProfile = createAsyncThunk('user/updateProfile', async (data) => {
    const response = await userAPI.updateUserProfile(data)
    return response.data;
});

export const getProfile = createAsyncThunk('user/getProfile', async (id) => {
    const response = await userAPI.getUserProfile(id)
    return response.data;
});

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: JSON.parse(localStorage.getItem("userInfo")), // get userInfo saved in local every refresh page
        error: null,
        loading: false,
        success: false,
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

        [getProfile.fulfilled]: (state, action) => {
            state.userInfo = action.payload
            state.error = null
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        [getProfile.rejected]: (state, action) => {
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },

        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true
            state.userInfo = action.payload
            state.error = null
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        [updateProfile.pending]: (state, action) => {
            state.loading = true
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.error.response && action.error.response.data.detail
                ? action.error.response.data.detail
                : action.error.message
        },
    }
})


const { reducer, actions } = UserSlice

export const { logout } = actions
export default reducer