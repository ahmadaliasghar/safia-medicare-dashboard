import { apiSlice } from '@/features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

