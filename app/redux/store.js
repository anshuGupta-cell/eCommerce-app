import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice.js"
import loaderReducer from "./loader/loaderSlice.js"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        loader: loaderReducer
    },
})