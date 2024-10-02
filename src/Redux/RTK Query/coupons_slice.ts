import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';
import { CouponResponse } from '../../Interface';


export const coupons_slice = createApi({
    reducerPath: 'couponsApi',
    tagTypes: ['Coupons'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postCoupons: builder.mutation({
            query: (formData) => ({
                url: 'api/v1/coupons',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Coupons'],
        }),
        getCoupons: builder.query<CouponResponse, void>({
            query: () => ({
                url: 'api/v1/coupons'
            }),
            providesTags: ['Coupons'],
        }),
        updateCoupons: builder.mutation({
            query: ({ couponId, couponData }) => ({
                url: `api/v1/coupons/${couponId}`,
                method: 'PUT',
                body: couponData,
            }),
            invalidatesTags: ['Coupons'],
        }),
        // deleteAddresses: builder.mutation({
        //     query: (id) => ({
        //         url: `api/v1/addresses/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Coupons'],
        // }),

    }),
});

export const { usePostCouponsMutation, useGetCouponsQuery , useUpdateCouponsMutation} = coupons_slice;
