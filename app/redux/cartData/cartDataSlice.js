import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: []
}

export const cartDataSlice = createSlice({
    name: 'cartData',
    initialState,
    reducers: {
        setCartData: ( state, action) => {
            state.cartItems = [...state.cartItems, action.payload]

            console.log("state.cartItems", state.cartItems);
            
        }
    }
})

export const { setCartData } = cartDataSlice.actions

export default cartDataSlice.reducer
