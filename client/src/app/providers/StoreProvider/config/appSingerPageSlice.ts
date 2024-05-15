import { createSlice } from '@reduxjs/toolkit'

import { fetchSingerPageInfoList } from '@/shared/api/info-pages'



export interface Music {
    id: string;
    name: string;
    author: string;
    audioId: string;
    imgUrl: string;
    genres: string[];
}

export interface Musician {
    id: string | null;
    name: string | null;
    imgUrl: string | null;
    music: Music[];
}
const initialState:{appSingerPageInfoList:Musician} = {
    appSingerPageInfoList:{
        id:null,
        name:null,
        imgUrl:null,
        music:[]
    },
}

const singerSlice = createSlice({
    name: 'singerPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingerPageInfoList.fulfilled, (state, action) => {
            state.appSingerPageInfoList = action.payload
        })
    },
})

export const {} = singerSlice.actions
export default singerSlice.reducer
