import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token'),
    userID: localStorage.getItem('uID'),
    isLoggedIn: !!localStorage.getItem('token')
    // isLoggedIn: true
}

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.userID = action.payload.userID;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('uID', action.payload.userID);
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.clear('token');
            localStorage.clear('uID');
            state.token = localStorage.getItem('token');
            state.userID = localStorage.getItem('uID');
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;