import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./usersSlice.js"
import loaderSlice from "./loaderSlice.js";

const store=configureStore({
    reducer:{
        auth:authSlice,
        loaders: loaderSlice,

    },
    devTools:true
})
export default   store