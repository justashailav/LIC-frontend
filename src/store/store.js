import {configureStore} from "@reduxjs/toolkit"
import planReducer from "./slices/planSlice"
import adminLoginSlice from "./slices/adminSlice"
export const store=configureStore({
    reducer:{
        plan:planReducer,
        auth:adminLoginSlice
    }
}) 
export default store