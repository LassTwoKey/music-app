import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { MusicInfo} from '@/entities/music/types/Music'

interface PlayerStatus {
    appPlayerStatus: 'loading' | 'idle' | 'error',
    musicInfoList: MusicInfo[],
}

const initialState: PlayerStatus = {
    appPlayerStatus: 'idle',
    musicInfoList: [],
}

export const fetchMusicInfoList = createAsyncThunk('player/fetchMusicInfoList', async () => {
    const response = await axios.get('http://localhost:3000/music', {
        headers: { 'Access-Control-Allow-Origin': '*' },
    })
    return response.data
})



const appPlayerStatus = createSlice({
    name: 'playerStatus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMusicInfoList.pending, (state) => {
            state.appPlayerStatus = 'loading'
        })
        builder.addCase(fetchMusicInfoList.fulfilled, (state, action) => {
            ;(state.appPlayerStatus = 'idle'), (state.musicInfoList = action.payload.musicList)
        })
        builder.addCase(fetchMusicInfoList.rejected, (state) => {
            state.appPlayerStatus = 'error'
        })
    }
})

export const {} = appPlayerStatus.actions
export default appPlayerStatus.reducer
