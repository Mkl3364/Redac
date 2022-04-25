import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        user: false,
        cart: <any>[],
        loading: true,
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = [...state.cart, action.payload]
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setCart, setUser } = appSlice.actions;
export default appSlice.reducer