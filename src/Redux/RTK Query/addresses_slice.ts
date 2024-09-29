import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';
import { AddressResponse } from '../../Interface';


export const address_slice = createApi({
    reducerPath: 'addressApi',
    tagTypes: ['Address'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postAddress: builder.mutation({
            query: (formData) => ({
                url: 'api/v1/addresses',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Address'],
        }),
        getAddresses: builder.query<AddressResponse, void>({
            query: () => ({
                url: 'api/v1/addresses'
            }),
            providesTags: ['Address'],
        }),
    }),
});

export const { usePostAddressMutation ,useGetAddressesQuery} = address_slice;
