import axios from '../../axios/axios';
import { mailActions } from '../mails-slice/mails-slice';

export const fetchAllData = (userEmail) => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await axios.get(`.json`);
            if (response.statusText !== 'OK') {
                throw new Error('GET REQ FAILED');
            }
            return response.data;
        }

        try {
            let data = await getData();
            if (data === null) {
                // console.log("Firebase is empty");
            } else {
                const inbox = data.filter((itm) => itm.rEmail === userEmail && !itm.rDelete);
                const outbox = data.filter((itm) => itm.sEmail === userEmail && !itm.sDelete);
                dispatch(mailActions.replaceMailState({ mails: data, inbox: inbox, outbox: outbox }));
            }
        } catch (err) {
            console.log("MAIL-SLICE GET ERROR");
        }
    }
}

//POST ONLY MAILS ARRAY
export const postAllData = (allUserMails) => {

    return async (dispatch) => {
        const postRequest = async () => {
            if (allUserMails.length !== 0) {
                const response = await axios.put(`/.json`, allUserMails);
                if (response.statusText !== 'OK') {
                    throw new Error('POST REQ FAILED');
                } else {
                    // console.log("SUCESS POST");
                }
            } else {
                // console.log("First time post req as empty array stopped");
            }
        }

        try {
            await postRequest();
        } catch (err) {
            console.log("MAIL-SLICE POST ERROR");
        }
    }
}