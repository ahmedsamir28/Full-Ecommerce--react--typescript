import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IProductDetails, IProducts } from '../../Interface';
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

export const products_slice = createApi({
    reducerPath: 'productsApi',
    tagTypes: ['Product'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
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
    usePostProductMutation, useGetProductsQuery,useGetProductIdQuery,useGetProductsSearchQuery ,useDeleteProductMutation, useUpdateProductMutation
} = products_slice;
