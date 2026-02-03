import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentApi = createApi({
    reducerPath: "departmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://apireactorm.inficare.net/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Department"],
    endpoints: (builder) => ({
        getDepartments: builder.query({
            // Accept page params
            query: ({ pageNumber = 1, pageSize = 10 } = {}) => ({
                url: "/departments/getAllDepartments",
                params: { pageNumber, pageSize }, // <-- send query params
            }),
            providesTags: ["Department"],
        }),
        addDepartment: builder.mutation({
            query: (data) => ({
                url: "/departments/createDepartment",
                method: "POST",
            }),
            invalidatesTags: ["Department"],
        }),
        updateDepartment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: "",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Department"],
        }),
        deleteDepartment: builder.mutation({
            query: ({ id }) => ({
                url: "",
                method: "DELETE"
            }),
            invalidatesTags: ["Department"],
        })
    })
})

export const { useGetDepartmentsQuery, useAddDepartmentMutation, useUpdateDepartmentMutation, useDeleteDepartmentMutation } = departmentApi;
