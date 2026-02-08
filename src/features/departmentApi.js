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
            query: ({ pageNumber = 1, pageSize = 20 } = {}) => ({
                url: "/departments/getAllDepartments",
                params: { pageNumber, pageSize }, // <-- send query params
            }),
            providesTags: ["Department"],
        }),
        addDepartment: builder.mutation({
            query: (data) => ({
                url: "/departments/createDepartment",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Department"],
        }),
        updateDepartment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/departments/updateDepartment/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Department", id: Number(id) }],
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/departments/deleteDepartment/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Department"],
        }),
        getDepartmentsById: builder.query({
            query: (id) => ({
                url: `/departments/departmentDetails/${id}`,
                providesTags: (result, error, id) => [{ type: "Department", id: Number(id)}],
            }),
        })
    })
})

export const { useGetDepartmentsQuery, useAddDepartmentMutation, useUpdateDepartmentMutation,
    useGetDepartmentsByIdQuery, useDeleteDepartmentMutation } = departmentApi;
