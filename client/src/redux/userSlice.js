import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   currentUser: null,
    loading: false,      // it will be false after hitting signin and if api request is right this will be true else it will be false and will show error
    error: false
}

export const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
             loginStart: (state,action) => {
                state.loading = true;  
             },
             loginSuccess: (state,action) => {
                state.loading = false;  
                state.currentUser = action.payload;
               //  console.log("currentUser => " + JSON.stringify(state.currentUser));
             },
             loginFailure: (state,action) => {
                state.loading = false;  
                state.error = true;
             },
             logout: (state, action) => {
                state.currentUser = null;
                state.loading = false;
                state.error = false
             },
             subscription: (state, action) => {
               if(state.currentUser.subscribedUsers.includes(action.payload)){
                  state.currentUser.subscribedUsers.splice(
                     state.currentUser.subscribedUsers.findIndex(
                        itemId => itemId === action.payload
                     )
                  )
               }else{
                  state.currentUser.subscribedUsers.push(action.payload)
               }
             },
        }
    }
);

export const { loginStart, loginSuccess,
     loginFailure, logout, subscription } = userSlice.actions;

export default userSlice.reducer;


