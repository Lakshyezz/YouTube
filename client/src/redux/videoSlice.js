import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   currentUser: null,
    loading: false,      // it will be false after hitting signin and if api request is right this will be true else it will be false and will show error
    error: false
}

export const videoSlice = createSlice(
    {
        name: 'video',
        initialState,
        reducers: {
             loginStart: (state,action) => {
                state.loading = true;  
             },
             loginSuccess: (state,action) => {
                state.loading = false;  
                state.currentUser = action.payload
             },
             loginFailure: (state,action) => {
                state.loading = false;  
                state.error = true;
             },
             logout: (state, action) => {
                state.currentUser = null;
                state.loading = false;
                state.error = false
             }
        }
    }
);

export const { loginStart, loginSuccess,
     loginFailure, logout } = videoSlice.actions;

export default videoSlice.reducer;
