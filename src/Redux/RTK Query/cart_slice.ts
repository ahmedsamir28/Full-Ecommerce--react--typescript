import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';


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
    }),
});

export const { usePostCartMutation} = cart_slice;
