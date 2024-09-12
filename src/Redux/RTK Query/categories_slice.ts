import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IData, IDataResponse } from '../../Interface';
import { BaseUrl } from '../../Config/Base_Url';

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://127.0.0.1:8000',
//     prepareHeaders: (headers) => {
//         const storageKey = "user";
//         const userDataString = localStorage.getItem(storageKey);
//         const userData = userDataString ? JSON.parse(userDataString) : null;
//         const token = userData?.jwt;

//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//         }
//         return headers;
//     },
// });

export const categories_slice = createApi({
    reducerPath: 'categoriesApi',
    tagTypes: ['Category'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
    endpoints: (builder) => ({
        postCategory: builder.mutation({
            query: (formData) => ({
                url: 'api/v1/categories',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Category'],
        }),
        getCategories: builder.query<IDataResponse, void>({
            query: () => ({
                url: 'api/v1/categories'
            }),
            providesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<null, string>({
            query: (id) => ({
                url: `api/v1/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation<IData, { id: string, formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `api/v1/categories/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    usePostCategoryMutation, useGetCategoriesQuery, useDeleteCategoryMutation,useUpdateCategoryMutation
} = categories_slice;
