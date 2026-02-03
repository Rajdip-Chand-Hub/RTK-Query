import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/authApi";
import { departmentApi } from "../features/departmentApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
        authApi.middleware,
        departmentApi.middleware
    ),
})