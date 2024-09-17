import { createApi } from '@reduxjs/toolkit/query/react';
import { IProduct, IProductDetails, IProducts } from '../../Interface';
import { baseQuery } from '../../Config/Base_Query';


export const products_slice = createApi({
    reducerPath: 'productsApi',
    tagTypes: ['Product'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postProduct: builder.mutation({
            query: (formData) => ({
                url: 'api/v1/products',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
        getProducts: builder.query<IProducts, void>({
            query: () => ({
                url: 'api/v1/products'
            }),
            providesTags: ['Product'],
        }),
        getProductId: builder.query<IProductDetails, string>({
            query: (id) => ({
                url: `api/v1/products/${id}`
            }),
            providesTags: ['Product'],
        }),
        getProductsSearch: builder.query<IProducts, string>({
            query: (queryString) => ({
                url: `api/v1/products?${queryString}`
            }),
            providesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<null, string>({
            query: (id) => ({
                url: `api/v1/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<IProduct, { id: string, formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `api/v1/products/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    usePostProductMutation, useGetProductsQuery, useGetProductIdQuery, useGetProductsSearchQuery, useDeleteProductMutation, useUpdateProductMutation
} = products_slice;
