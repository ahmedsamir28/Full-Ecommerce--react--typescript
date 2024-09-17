import { createApi } from '@reduxjs/toolkit/query/react';
import { ISubCategories, ISubCategory } from '../../Interface';
import { baseQuery } from '../../Config/Base_Query';



export const subCategory_slice = createApi({
    reducerPath: 'subCategoriesApi',
    tagTypes: ['subCategory'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
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
