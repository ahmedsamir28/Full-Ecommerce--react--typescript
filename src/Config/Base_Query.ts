// apiConfig.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseUrl } from './Base_Url';

const storageKey = "token";

export const baseQuery = fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers) => {
        const userDataString = localStorage.getItem(storageKey);
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const token = userData;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
