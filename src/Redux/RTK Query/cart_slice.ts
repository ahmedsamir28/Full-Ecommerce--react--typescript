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
            query: ({ cartId, count }: { cartId: string; count: number }) => ({
                url: `api/v1/cart/${cartId}`,
                method: 'PUT',
                body: { count },
            }),
            invalidatesTags: ['Cart'],
        }),
        removeFromCart: builder.mutation({
            query: (cartId: string) => ({
                url: `api/v1/cart/${cartId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
        removeAllCart: builder.mutation<void, void>({
            query: () => ({
                url: 'api/v1/cart',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
        applyCoupon: builder.mutation({
            query: ({couponName }) => ({
                url: `api/v1/cart/applyCoupon`,
                method: 'PUT',
                body: { couponName },
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const { usePostCartMutation, useGetCartQuery, useUpdateQuantityMutation, useRemoveFromCartMutation, useRemoveAllCartMutation ,useApplyCouponMutation} = cart_slice;