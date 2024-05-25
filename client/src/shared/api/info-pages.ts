import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { coreApi } from '.'

export const fetchSingerPageInfoList = createAsyncThunk('player/fetchSingerInfoList', async (id:string | undefined) => {
    const response = await axios.get(`${coreApi}/singer/${id}`) 
    return response.data
})
export const fetchGenrePageInfoList = createAsyncThunk('player/fetchGenreInfoList', async (id:string | undefined) => {
    const response = await axios.get(`${coreApi}/genres/${id}`) 
    return response.data
})