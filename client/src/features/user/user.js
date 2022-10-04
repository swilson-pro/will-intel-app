import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {name: "", email: ""}


export const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: {
        },
        isLoggedin:  false
    },
    reducers: {
        setUser: (state,action)=>{
            state.profile = {... action.payload}
            state.isLoggedin = true
        },
        logout: (state) => {
            localStorage.clear()
            state.profile = {}
            state.isLoggedin = false

        }
    },
});

export const {setUser, logout} = userSlice.actions;

export default userSlice.reducer