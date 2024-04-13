import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    playerInfo: {
        audioUrl: null,
        name: null,
        author: null,
        size: null,
        duration: 0,
        imgUrl: 'https://thicc-af.mywaifulist.moe/waifus/makima/YlEvAFSWo7WrlgXmwIRyksCooOxsX1rVCqxUN4Vz.png?class=thumbnail',
    },
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayerInfo(state, action) {
            state.playerInfo = {
                ...state.playerInfo,
                ...action.payload,
            }
        },
    },
})

export const { setPlayerInfo } = playerSlice.actions
export default playerSlice.reducer
