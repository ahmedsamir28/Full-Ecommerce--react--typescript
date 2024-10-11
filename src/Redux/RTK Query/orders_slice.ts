import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';
import { ordersResponse, specificOrder } from '../../Interface';

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
        getSpecificOrder: builder.query<specificOrder,string>({
            query: (id) => ({
                url: `api/v1/orders/${id}`
            }),
            providesTags: ['Orders'],
        }),
        updateOrderToPaid: builder.mutation({
            query: (id) => ({
                url: `api/v1/orders/${id}/pay`,
                method: 'PUT',
            }),
            invalidatesTags: ['Orders'],
        }),
        updateOrderToDeliver: builder.mutation({
            query: (id) => ({
                url: `api/v1/orders/${id}/deliver`,
                method: 'PUT',
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

export const { usePostOrderMutation, useGetCheckOutSessionQuery ,useGetAllOrdersQuery,useGetSpecificOrderQuery,useUpdateOrderToPaidMutation,useUpdateOrderToDeliverMutation} = orders_slice;