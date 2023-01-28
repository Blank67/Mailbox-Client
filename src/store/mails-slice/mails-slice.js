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
            state.mails.unshift({ ...newMail });
            if (action.payload.for) {
                state.inbox.unshift({ ...newMail });
            }
        },
        deleteMail(state, action) {
            const indexOfItemToDeleteMails = state.mails.findIndex((itm) => itm.id === action.payload.mail.id);
            const indexOfItemToDeleteOutbox = state.outbox.findIndex((itm) => itm.id === action.payload.mail.id);
            const indexOfItemToDeleteInbox = state.inbox.findIndex((itm) => itm.id === action.payload.mail.id);
            const itemToDeleteMails = state.mails[indexOfItemToDeleteMails];
            const itemToDeleteInbox = state.mails[indexOfItemToDeleteInbox];
            const itemToDeleteOutbox = state.mails[indexOfItemToDeleteOutbox];
            if (action.payload.for === 'OUTBOX') {
                state.mails[indexOfItemToDeleteMails] = { ...itemToDeleteMails, sDelete: true };
                // state.inbox[indexOfItemToDeleteInbox] = {...itemToDeleteInbox, sDelete:true};
                state.outbox[indexOfItemToDeleteOutbox] = { ...itemToDeleteOutbox, sDelete: true };

                state.inbox = state.inbox.filter((itm) => !itm.rDelete);
                state.outbox = state.outbox.filter((itm) => !itm.sDelete);
            } else if (action.payload.for === 'INBOX') {
                state.mails[indexOfItemToDeleteMails] = { ...itemToDeleteMails, rDelete: true };
                state.inbox[indexOfItemToDeleteInbox] = { ...itemToDeleteInbox, rDelete: true };
                // state.outbox[indexOfItemToDeleteOutbox] = {...itemToDeleteOutbox, sDelete:true};

                state.inbox = state.outbox.filter((itm) => !itm.rDelete);
                state.outbox = state.outbox.filter((itm) => !itm.sDelete);
            } else {
                console.log("Unexpected Data received.");
            }

        },
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
            state.outbox.unshift({ ...action.payload.mail });
        },
        read(state, action) {
            const indexInMails = state.mails.findIndex((itm) => itm.id === action.payload.mail.id);
            const itemInMails = state.mails[indexInMails];
            state.mails[indexInMails] = { ...itemInMails, read: true };

            const indexInInbox = state.inbox.findIndex((itm) => itm.id === action.payload.mail.id);
            const indexInOutbox = state.outbox.findIndex((itm) => itm.id === action.payload.mail.id);
            if (indexInInbox !== -1) {
                const item = state.inbox[indexInInbox];
                state.inbox[indexInInbox] = { ...item, read: true };
            } else if (indexInOutbox !== -1) {
                const item = state.outbox[indexInOutbox];
                state.outbox[indexInOutbox] = { ...item, read: true };
            }
        }
    }
})

export const mailActions = mailsSlice.actions;
export default mailsSlice.reducer;