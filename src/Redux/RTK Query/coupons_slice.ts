import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';


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
        // getAddresses: builder.query<AddressResponse, void>({
        //     query: () => ({
        //         url: 'api/v1/addresses'
        //     }),
        //     providesTags: ['Coupons'],
        // }),
        // deleteAddresses: builder.mutation({
        //     query: (id) => ({
        //         url: `api/v1/addresses/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Coupons'],
        // }),
        // updateAddresses: builder.mutation({
        //     query: ({ addressId, addressData }) => ({
        //         url: `api/v1/addresses/${addressId}`,
        //         method: 'PUT',
        //         body: addressData,
        //     }),
        //     invalidatesTags: ['Coupons'],
        // }),
    }),
});

export const { usePostCouponsMutation} = coupons_slice;
