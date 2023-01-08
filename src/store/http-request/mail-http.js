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
            if(data.length > 0) {
                const inbox = data.filter((itm) => itm.rEmail === userEmail);
                const outbox = data.filter((itm) => itm.sEmail === userEmail);
                dispatch(mailActions.replaceMailState({mails: data, inbox: inbox, outbox: outbox}));
            }else{
                console.log("No mails in firebase");
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
            if(allUserMails.length !== 0){
                const response = await axios.put(`/.json`, allUserMails);
                if (response.statusText !== 'OK') {
                    throw new Error('POST REQ FAILED');
                }else{
                    console.log("SUCESS POST");
                }
            }else{
                console.log("First time post req as empty array stopped");
            }
        }

        try {
            await postRequest();
        } catch (err) {
            console.log("MAIL-SLICE POST ERROR");
        }
    }
}