import { createSlice } from '@reduxjs/toolkit'

import { fetchSingerInfoList } from '@/shared/api/carusel'

const initialState = {
    appSingerInfoList: [],
}

const singerSlice = createSlice({
    name: 'singerSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingerInfoList.fulfilled, (state, action) => {
            state.appSingerInfoList = action.payload
        })
    },
})

export const {} = singerSlice.actions
export default singerSlice.reducer
