import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mails: [],
}

const mailsSlice = createSlice({
    name: "Mails",
    initialState: initialState,
    reducers: {
        addMail(state, action) {
            const newMail = action.payload.mail;
            // debugger;
            state.mails.push({ id: newMail.id, sEmail: newMail.sEmail, rEmail: newMail.rEmail, subject: newMail.subject, read: false });
        },
        deleteMail(state, action) { },
        replaceMailState(state, action) {
            state.mails = action.payload.mails;
        },
        clearSliceOnLogout(state) {
            state.mails = [];
        },
    }
})

export const mailActions = mailsSlice.actions;
export default mailsSlice.reducer;