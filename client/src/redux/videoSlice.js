import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   currentVideo: null,
    loading: false,      // it will be false after hitting signin and if api request is right this will be true else it will be false and will show error
    error: false
}

export const videoSlice = createSlice(
    {
        name: 'video',
        initialState,
        reducers: {
             fetchStart: (state,action) => {
                state.loading = true;  
             },
             fetchSuccess: (state,action) => {
                state.loading = false;  
                state.currentVideo = action.payload
             },
             fetchFailure: (state,action) => {
                state.loading = false;  
                state.error = true;
             },
        }
    }
);

export const { fetchStart, fetchSuccess,
     fetchFailure} = videoSlice.actions;

export default videoSlice.reducer;
