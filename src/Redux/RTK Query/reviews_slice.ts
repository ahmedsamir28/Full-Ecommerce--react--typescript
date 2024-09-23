import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';
import {IReviewResponse } from '../../Interface';


export const reviews_slice = createApi({
    reducerPath: 'reviewsApi',
    tagTypes: ['review'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: ({productId,reviewData}) => ({
                url: `api/v1/products/${productId}/reviews`,
                method: 'POST',
                body: reviewData,
            }),
            invalidatesTags: ['review'],
        }),
        getReviews: builder.query<IReviewResponse, string>({
            query: (id) => ({
                url: `api/v1/products/${id}/reviews`
            }),
            providesTags: ['review'],
        }),
        updateReview: builder.mutation({
            query: ({ reviewId, reviewData }) => ({
                url: `api/v1/reviews/${reviewId}`,
                method: 'PUT',
                body: reviewData,
            }),
            invalidatesTags: ['review'],
        }),
        // getProductId: builder.query<IProductDetails, string>({
        //     query: (id) => ({
        //         url: `api/v1/products/${id}`
        //     }),
        //     providesTags: ['Product'],
        // }),
        // getProductsSearch: builder.query<IProducts, string>({
        //     query: (queryString) => ({
        //         url: `api/v1/products?${queryString}`
        //     }),
        //     providesTags: ['Product'],
        // }),
        // deleteProduct: builder.mutation<null, string>({
        //     query: (id) => ({
        //         url: `api/v1/products/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Product'],
        // }),

    }),
});

export const {
    useCreateReviewMutation,useGetReviewsQuery,useUpdateReviewMutation
} = reviews_slice;
