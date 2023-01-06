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
            state.mails.push({id: newMail.id, sEmail: newMail.sEmail, rEmail: newMail.rEmail, read: false});
        },
        deleteMail(state, action) {}
    }
})

export const mailActions = mailsSlice.actions;
export default mailsSlice.reducer;