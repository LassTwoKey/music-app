import { createSlice } from '@reduxjs/toolkit'

interface AppPlayerState {
    audioUrl: null | string
    name: null | string
    author: null | string
    size: null | number
    duration: number
    imgUrl: null | string
}

const initialState: { playerInfo: AppPlayerState } = {
    playerInfo: {
        audioUrl: null,
        name: null,
        author: null,
        size: null,
        duration: 0,
        imgUrl: null,
    },
}

const appPlayerSlice = createSlice({
    name: 'appPlayer',
    initialState,
    reducers: {
        setAppPlayerInfo(state, action) {
            state.playerInfo = {
                ...state.playerInfo,
                ...action.payload,
            }
        },
    },
})

export const { setAppPlayerInfo } = appPlayerSlice.actions
export default appPlayerSlice.reducer
