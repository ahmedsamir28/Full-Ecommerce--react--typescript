import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';


export const orders_slice = createApi({
    reducerPath: 'ordersApi',
    tagTypes: ['Orders'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postCoupons: builder.mutation({
            query: ({ id, shippingAddress }) => ({
                url: `api/v1/orders/${id}`,
                method: 'POST',
                body: shippingAddress,
            }),
            invalidatesTags: ['Orders'],
        }),
        // getCoupons: builder.query<CouponResponse, void>({
        //     query: () => ({
        //         url: 'api/v1/coupons'
        //     }),
        //     providesTags: ['Coupons'],
        // }),
        // updateCoupons: builder.mutation({
        //     query: ({ couponId, couponData }) => ({
        //         url: `api/v1/coupons/${couponId}`,
        //         method: 'PUT',
        //         body: couponData,
        //     }),
        //     invalidatesTags: ['Coupons'],
        // }),
        // deleteCoupons: builder.mutation({
        //     query: (id) => ({
        //         url: `api/v1/coupons/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Coupons'],
        // }),

    }),
});

export const {usePostCouponsMutation } = orders_slice;
