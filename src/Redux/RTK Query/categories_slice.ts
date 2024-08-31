import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from '../../Interface';

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://127.0.0.1:8000',
//     prepareHeaders: (headers) => {
//         const storageKey = "user";
//         const userDataString = localStorage.getItem(storageKey);
//         const userData = userDataString ? JSON.parse(userDataString) : null;
//         const token = userData?.jwt;

//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//         }
//         return headers;
//     },
// });

export const categories_slice = createApi({
    reducerPath: 'categoriesApi',
    tagTypes: ['Category'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery:  fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    endpoints: (builder) => ({
        postCategory: builder.mutation<ICategory, FormData>({
            query: (formData) => ({
                url: 'api/v1/categories',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Category'],
        }),

    }),
});

export const {
usePostCategoryMutation
} = categories_slice;
