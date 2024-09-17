import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';


export const profile_slice = createApi({
    reducerPath: 'profileApi',
    tagTypes: ['profile'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        putUserProfile: builder.mutation({
            query: (formData) => ({
                url: '/api/v1/users/changeMyPassword',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['profile'],
        }),

    }),
});

export const {
    usePutUserProfileMutation
} = profile_slice;
