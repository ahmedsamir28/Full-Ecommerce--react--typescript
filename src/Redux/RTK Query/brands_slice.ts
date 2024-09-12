import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IData, IDataResponse } from '../../Interface';
import { BaseUrl } from '../../Config/Base_Url';

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

export const brands_slice = createApi({
    reducerPath: 'brandsApi',
    tagTypes: ['Brand'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
    endpoints: (builder) => ({
        postBrand: builder.mutation({
            query: (formData) => ({
                url: 'api/v1/brands',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Brand'],
        }),
        getBrands: builder.query<IDataResponse, void>({
            query: () => ({
                url: 'api/v1/brands'
            }),
            providesTags: ['Brand'],
        }),
        deleteBrand: builder.mutation<null, string>({
            query: (id) => ({
                url: `api/v1/brands/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brand'],
        }),
        updateBrand: builder.mutation<IData, { id: string, formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `api/v1/brands/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Brand'],
        }),
    }),
});

export const {
    usePostBrandMutation, useGetBrandsQuery, useDeleteBrandMutation, useUpdateBrandMutation
} = brands_slice;
