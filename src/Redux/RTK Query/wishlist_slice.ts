import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';
import { ILoggedUserWishlist } from '../../Interface';


export const wishlist_slice = createApi({
    reducerPath: 'wishlistApi',
    tagTypes: ['wishlist'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        addToWishlist: builder.mutation({
            query: (productId) => ({
                url: `api/v1/wishlist`,
                method: 'POST',
                body: productId,
            }),
            invalidatesTags: ['wishlist'],
        }),
        deleteWishlist: builder.mutation<null, string>({
            query: (id) => ({
                url: `api/v1/wishlist/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['wishlist'],
        }),
        getWishlist: builder.query<ILoggedUserWishlist, void>({
            query: () => ({
                url: 'api/v1/wishlist'
            }),
            providesTags: ['wishlist'],
        }),
    }),
});

export const {
    useAddToWishlistMutation, useDeleteWishlistMutation, useGetWishlistQuery
} = wishlist_slice;
