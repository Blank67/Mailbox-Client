import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mails: [],
    inbox: [],
    outbox: []
}

const mailsSlice = createSlice({
    name: "Mails",
    initialState: initialState,
    reducers: {
        addMail(state, action) {
            const newMail = action.payload.mail;
            state.mails.push({ ...newMail, read: false });
        },
        deleteMail(state, action) { },
        replaceMailState(state, action) {
            state.mails = action.payload.mails;
            state.inbox = action.payload.inbox;
            state.outbox = action.payload.outbox;
        },
        clearSliceOnLogout(state) {
            state.mails = [];
            state.inbox = [];
            state.outbox = [];
        },
        addOutboxMails(state, action) {
            state.outbox.push({ ...action.payload.mail });
        }
    }
})

export const mailActions = mailsSlice.actions;
export default mailsSlice.reducer;