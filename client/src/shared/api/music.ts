import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { MusicInfo } from '@/entities/music/types/Music'

import { coreApi } from '.'

export const fetchMusicInfoList = createAsyncThunk<MusicInfo[]>(
    'player/fetchMusicInfoList',
    async () => {
        const response = await axios.get(`${coreApi}/music`, {
            headers: { 'Access-Control-Allow-Origin': '*' },
        })
        return response.data
    },
)

export const onGetAudioInfoById = async (id: string) => {
    const coreApi = `https://music-app-production-0189.up.railway.app`
    const response = await axios.get(`${coreApi}/audio/${id}`)
    return response.data
}
