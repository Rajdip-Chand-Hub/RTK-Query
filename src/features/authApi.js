import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://apireactorm.inficare.net/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if(token)
            {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login:builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method:"POST",
                body: credentials,
            }),
        }),
    }),
});

export const {useLoginMutation} = authApi;