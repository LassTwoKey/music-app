import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    audioUrl:null,
}

const playerSlice = createSlice({
    name:'player',
    initialState,
    reducers:{
         onGetAudioUrl: (state, action) =>{
             state.audioUrl = action.payload;
         }
    }
})


export const {
    onGetAudioUrl
} = playerSlice.actions
export default playerSlice.reducer