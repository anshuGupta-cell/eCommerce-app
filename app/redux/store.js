import { configureStore } from "@reduxjs/toolkit";
import qtyCounterReducer from "./qtyCounter/qtyCounterSlice.js"
import loaderReducer from "./loader/loaderSlice.js"
import cartDataReducer from "./cartData/cartDataSlice.js";

export const store = configureStore({
    reducer: {
        qtyCounter: qtyCounterReducer,
        loader: loaderReducer,
        cartData: cartDataReducer
    },
})