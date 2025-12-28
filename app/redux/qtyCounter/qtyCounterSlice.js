import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    qty: 0
}

export const qtyCounterSlice = createSlice({
    name: 'qtyCounter',
    initialState,
    reducers: {
        increment: (state) => {
            state.qty += 1
        },
        decrement: (state) => {
            state.qty -= 1
        }
    }
})

export const { increment, decrement } = qtyCounterSlice.actions

export default qtyCounterSlice.reducer
