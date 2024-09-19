import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../Config/Base_Query';
import { LoggedUser } from '../../Interface';


export const logged_users_slice = createApi({
    reducerPath: 'profileApi',
    tagTypes: ['profile'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        updateUserPassword: builder.mutation({
            query: (formData) => ({
                url: '/api/v1/users/changeMyPassword',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['profile'],
        }),
        updateUserData: builder.mutation({
            query: (formData) => ({
                url: '/api/v1/users/updateMe',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['profile'],
        }),
        getLoggedUser: builder.query<LoggedUser, void>({
            query: () => ({
                url: '/api/v1/users/getMe'
            }),
            providesTags: ['profile'],
        }),

    }),
});

export const {
    useUpdateUserPasswordMutation, useUpdateUserDataMutation,useGetLoggedUserQuery
} = logged_users_slice;
