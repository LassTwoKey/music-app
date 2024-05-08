import { createSlice } from '@reduxjs/toolkit'

import { fetchMediaInfoList } from '@/shared/api/carusel'

const initialState = {
    appMedianfoList: [],
}

const singerSlice = createSlice({
    name: 'mediaSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMediaInfoList.fulfilled, (state, action) => {
            state.appMedianfoList = action.payload
        })
    },
})

export const {} = singerSlice.actions
export default singerSlice.reducer
