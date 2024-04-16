import { createSlice } from '@reduxjs/toolkit'

interface PlayerState {
    audioUrl: null | string
    name: null | string
    author: null | string
    size: null | number
    duration: number
    imgUrl: null | string
}

const initialState: { playerInfo: PlayerState } = {
    playerInfo: {
        audioUrl: null,
        name: null,
        author: null,
        size: null,
        duration: 0,
        imgUrl: null,
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
