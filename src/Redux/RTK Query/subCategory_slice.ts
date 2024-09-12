import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISubCategories, ISubCategory } from '../../Interface';
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

export const subCategory_slice = createApi({
    reducerPath: 'subCategoriesApi',
    tagTypes: ['subCategory'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
    endpoints: (builder) => ({
        postSubCategory: builder.mutation({
            query: (formData) => ({
                url: 'api/v1/subcategories',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['subCategory'],
        }),
        getSubCategories: builder.query<ISubCategories, void>({
            query: () => ({
                url: 'api/v1/subcategories'
            }),
            providesTags: ['subCategory'],
        }),
        getCategory_Sub: builder.query<ISubCategories, string>({
            query: (id) => ({
                url: `api/v1/categories/${id}/subcategories`
            }),
            providesTags: ['subCategory'],
        }),
        deleteSubCategory: builder.mutation<null, string>({
            query: (id) => ({
                url: `api/v1/subcategories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['subCategory'],
        }),
        updateSubCategory: builder.mutation<ISubCategory, { id: string; name: string }>({
            query: ({ id, name }) => ({
                url: `api/v1/subcategories/${id}`,
                method: 'PUT',
                body: { name }, // Send as a JSON object
            }),
            invalidatesTags: ['subCategory'],
        }),
    }),
});

export const {
    usePostSubCategoryMutation, useGetSubCategoriesQuery, useGetCategory_SubQuery,useDeleteSubCategoryMutation, useUpdateSubCategoryMutation
} = subCategory_slice;
