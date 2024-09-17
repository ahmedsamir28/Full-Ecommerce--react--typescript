import { createApi } from '@reduxjs/toolkit/query/react';
import { IData, IDataResponse } from '../../Interface';
import { baseQuery } from '../../Config/Base_Query';


export const brands_slice = createApi({
    reducerPath: 'brandsApi',
    tagTypes: ['Brand'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postBrand: builder.mutation({
            query: (formData) => ({
                url: 'api/v1/brands',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Brand'],
        }),
        getBrands: builder.query<IDataResponse, void>({
            query: () => ({
                url: 'api/v1/brands'
            }),
            providesTags: ['Brand'],
        }),
        deleteBrand: builder.mutation<null, string>({
            query: (id) => ({
                url: `api/v1/brands/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brand'],
        }),
        updateBrand: builder.mutation<IData, { id: string, formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `api/v1/brands/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Brand'],
        }),
    }),
});

export const {
    usePostBrandMutation, useGetBrandsQuery, useDeleteBrandMutation, useUpdateBrandMutation
} = brands_slice;
