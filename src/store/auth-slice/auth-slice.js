import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token'),
    uuID: localStorage.getItem('uuID'),
    isLoggedIn: !!localStorage.getItem('token'),
    email: localStorage.getItem('email') || '',
    name: localStorage.getItem('name')
}

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('uuID', action.payload.uuID);
            localStorage.setItem('email',action.payload.email);
            localStorage.setItem('name',action.payload.name);
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.uuID = action.payload.uuID;
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
        logout(state) {
            // localStorage.clear('token');
            // localStorage.clear('uuID');
            // localStorage.clear('email');
            localStorage.clear();
            state.token = localStorage.getItem('token');
            state.uuID = localStorage.getItem('uuID');
            state.email = localStorage.getItem('email');
            state.name = localStorage.getItem('name');
            state.isLoggedIn = false;
            // state.email = '';
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;