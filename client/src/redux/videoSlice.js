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
               //  console.log("action.payload => " + JSON.stringify(action.payload));
                state.currentVideo = action.payload
             },
             fetchFailure: (state,action) => {
                state.loading = false;  
                state.error = true;
             },
             like: (state, action) => {
               if(!state.currentVideo.likes.includes(action.payload)){
                  state.currentVideo.likes.push(action.payload);
                  state.currentVideo.dislikes.splice(
                     state.currentVideo.dislikes.findIndex(
                        (item) => item === action.payload
                     ),1
                  )
               }
             },
             dislike: (state, action) => {
               if(!state.currentVideo.dislikes.includes(action.payload)){
                  state.currentVideo.dislikes.push(action.payload);
                  state.currentVideo.likes.splice(
                     state.currentVideo.likes.findIndex(
                        (item) => item === action.payload
                     ),1
                  )
               }
             },
        }
    }
);

export const { fetchStart, fetchSuccess,
     fetchFailure , like, dislike } = videoSlice.actions;

export default videoSlice.reducer;
