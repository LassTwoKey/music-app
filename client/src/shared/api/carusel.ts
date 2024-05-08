import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { coreApi } from '.'

export const fetchSingerInfoList = createAsyncThunk('player/fetchSingerInfoList', async () => {
    const response = await axios.get(`${coreApi}/singer`)
    return response.data
})

export const fetchMediaInfoList = createAsyncThunk('player/fetchMediaInfoList', async () => {
    const response = await axios.get(`${coreApi}/genres`)
    return response.data
})
