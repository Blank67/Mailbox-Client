import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token'),
    uuID: localStorage.getItem('uuID'),
    isLoggedIn: !!localStorage.getItem('token')
}

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('uuID', action.payload.uuID);
            state.token = action.payload.token;
            state.uuID = action.payload.uuID;
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.clear('token');
            localStorage.clear('uuID');
            state.token = localStorage.getItem('token');
            state.uuID = localStorage.getItem('uuID');
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;