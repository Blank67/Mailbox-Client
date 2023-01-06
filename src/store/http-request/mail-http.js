import axios from '../../axios/axios';
import { mailActions } from '../mails-slice/mails-slice';

export const fetchAllData = (userID) => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await axios.get(`/${userID}.json`);
            if (response.statusText !== 'OK') {
                throw new Error('GET REQ FAILED');
            }
            debugger;
            console.log(response);
            return response.data;
        }

        try {
            let data = await getData();
            // debugger;
            console.log(data);
            if (!data) {
                data = { mails: []};
            }
            dispatch(mailActions.replaceMailState(data));
        } catch (err) {
            console.log("EXPENSE-SLICE GET ERROR");
        }
    }
}

export const postAllData = (mailsState, userID) => {

    return async (dispatch) => {
        const postRequest = async () => {
            const response = await axios.put(`/${userID}.json`, mailsState);
            // debugger;
            console.log(response);
            if (response.statusText !== 'OK') {
                throw new Error('POST REQ FAILED');
            }
        }

        try {
            await postRequest();
        } catch (err) {
            console.log("EXPENSE-SLICE POST ERROR");
        }
    }
}