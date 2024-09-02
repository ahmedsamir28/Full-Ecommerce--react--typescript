import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISubCategories, ISubCategory } from '../../Interface';

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
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
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
        deleteCategory: builder.mutation<null, string>({
            query: (id) => ({
                url: `api/v1/subcategories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['subCategory'],
        }),
        updateCategory: builder.mutation<ISubCategory, { id: string, formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `api/v1/subcategories/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['subCategory'],
        }),
    }),
});

export const {
    usePostSubCategoryMutation, useGetSubCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation
} = subCategory_slice;
