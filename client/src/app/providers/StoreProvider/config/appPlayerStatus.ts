import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { MusicInfo } from '@/entities/music/types/Music'
import { fetchMusicInfoList } from '@/shared/api/music'

interface PlayerStatus {
    appPlayerStatus: 'loading' | 'idle' | 'error'
    musicInfoList: MusicInfo[]
}

const initialState: PlayerStatus = {
    appPlayerStatus: 'idle',
    musicInfoList: [],
}

const appPlayerStatus = createSlice({
    name: 'playerStatus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMusicInfoList.pending, (state) => {
            state.appPlayerStatus = 'loading'
        })
        builder.addCase(
            fetchMusicInfoList.fulfilled,
            (state, action: PayloadAction<MusicInfo[]>) => {
                state.appPlayerStatus = 'idle'
                state.musicInfoList = action.payload
            },
        )
        builder.addCase(fetchMusicInfoList.rejected, (state) => {
            state.appPlayerStatus = 'error'
        })
    },
})

export const {} = appPlayerStatus.actions
export default appPlayerStatus.reducer
