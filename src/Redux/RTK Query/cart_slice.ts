import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';
import { CartResponse } from '../../Interface';


export const cart_slice = createApi({
    reducerPath: 'cartApi',
    tagTypes: ['Cart'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postCart: builder.mutation({
            query: (formData) => ({
                url: 'api/v1/cart',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Cart'],
        }),
        getCart: builder.query<CartResponse, void>({
            query: () => ({
                url: 'api/v1/cart'
            }),
            providesTags: ['Cart'],
        }),
        updateQuantity: builder.mutation({
            query: ({ cartId, quantity }) => ({
                url: `api/v1/cart/${cartId}`,
                method: 'PUT',
                body: quantity,
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const { usePostCartMutation, useGetCartQuery ,useUpdateQuantityMutation} = cart_slice;
