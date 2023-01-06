import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/auth-slice';
import mailReducer from './mails-slice/mails-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        mail: mailReducer
    }
});

export default store;