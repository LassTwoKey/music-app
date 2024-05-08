import { configureStore } from '@reduxjs/toolkit'

import appMediaSlise from './appMediaSlise'
import appPlayerSlice from './appPlayerSlice'
import appPlayerStatus from './appPlayerStatus'
import appSingerSlice from './appSingerSlice'

export const store = configureStore({
    reducer: {
        appPlayerSlice,
        appPlayerStatus,
        appSingerSlice,
        appMediaSlise,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
