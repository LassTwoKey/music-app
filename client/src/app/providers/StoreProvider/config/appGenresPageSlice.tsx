import { createSlice } from '@reduxjs/toolkit'

import { fetchGenrePageInfoList } from '@/shared/api/info-pages'



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
const initialState:{appGenrePageInfoList:Musician} = {
    appGenrePageInfoList:{
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
        builder.addCase(fetchGenrePageInfoList.fulfilled, (state, action) => {
            state.appGenrePageInfoList = action.payload
        })
    },
})

export const {} = singerSlice.actions
export default singerSlice.reducer
