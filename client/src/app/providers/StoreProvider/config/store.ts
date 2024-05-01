import { configureStore } from '@reduxjs/toolkit'

import appPlayerSlice from './appPlayerSlice'
import appPlayerStatus from './appPlayerStatus'

export const store = configureStore({
    reducer: {
        appPlayerSlice,
        appPlayerStatus,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
