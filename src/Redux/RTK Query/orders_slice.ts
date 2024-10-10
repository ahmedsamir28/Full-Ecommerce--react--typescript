import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';
import { ordersResponse } from '../../Interface';

export const orders_slice = createApi({
    reducerPath: 'ordersApi',
    tagTypes: ['Orders'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: ({ id, shippingAddress }) => ({
                url: `api/v1/orders/${id}`,
                method: 'POST',
                body: { shippingAddress },
            }),
            invalidatesTags: ['Orders'],
        }),
        getCheckOutSession: builder.query({
            query: ({ id, shippingAddress }) => ({
                url: `api/v1/orders/checkout-session/${id}`,
                method: 'GET',
                params: { shippingAddress },
            }),
            providesTags: ['Orders'],
        }),
        getAllOrders: builder.query<ordersResponse,void>({
            query: () => ({
                url: 'api/v1/orders'
            }),
            providesTags: ['Orders'],
        }),
    }),
});

export const { usePostOrderMutation, useGetCheckOutSessionQuery ,useGetAllOrdersQuery} = orders_slice;