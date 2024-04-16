import { configureStore } from '@reduxjs/toolkit'

import appPlayerSlice from './appPlayerSlice'

export const store = configureStore({
    reducer: {
        appPlayerSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
