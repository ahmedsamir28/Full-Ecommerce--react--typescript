import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { categories_slice } from './RTK Query/categories_slice'

export const store = configureStore({
    reducer: {
        [categories_slice.reducerPath] : categories_slice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categories_slice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
