import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token'),
    uuID: localStorage.getItem('uuID'),
    isLoggedIn: !!localStorage.getItem('token'),
    email: localStorage.getItem('email') || ''
}

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('uuID', action.payload.uuID);
            localStorage.setItem('email',action.payload.email);
            state.token = action.payload.token;
            state.uuID = action.payload.uuID;
            state.isLoggedIn = true;
            state.email = action.payload.email;
        },
        logout(state) {
            localStorage.clear('token');
            localStorage.clear('uuID');
            localStorage.clear('email');
            state.token = localStorage.getItem('token');
            state.uuID = localStorage.getItem('uuID');
            state.isLoggedIn = false;
            state.email = '';
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;