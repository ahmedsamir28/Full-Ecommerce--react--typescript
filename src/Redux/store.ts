import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import registerSlice from './Slice/registerSlice';
import loginSlice from './Slice/loginSlice';
import { categories_slice } from './RTK Query/categories_slice';
import { brands_slice } from './RTK Query/brands_slice';
import { subCategory_slice } from './RTK Query/subCategory_slice';
import { products_slice } from './RTK Query/products_slice';
import { logged_users_slice } from './RTK Query/logged_users_slice';

export const store = configureStore({
    reducer: {
        register: registerSlice,
        login: loginSlice,
        [categories_slice.reducerPath]: categories_slice.reducer,
        [brands_slice.reducerPath]: brands_slice.reducer,
        [subCategory_slice.reducerPath]: subCategory_slice.reducer,
        [products_slice.reducerPath]: products_slice.reducer,
        [logged_users_slice.reducerPath]: logged_users_slice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        categories_slice.middleware,
        brands_slice.middleware,
        subCategory_slice.middleware,
        products_slice.middleware,
        logged_users_slice.middleware

    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
