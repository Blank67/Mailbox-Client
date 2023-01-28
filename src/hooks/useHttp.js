import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../axios/axios';
import { mailActions } from '../store/mails-slice/mails-slice';

const useHttp = () => {
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const sendRequest = useCallback(async (config) => {
        try {
            if (config.method.toUpperCase() === 'GET' || config.method === undefined || config.method === null) {
                // debugger
                const response = await axios.get(`.json`);
                const data = response.data;
                if (response.statusText !== 'OK') {
                    throw new Error('GET REQ FAILED');
                }
                if (data === null) {
                    setMessage('Firebase is empty.')
                } else {
                    const inbox = data.filter((itm) => itm.rEmail === config.userEmail && !itm.rDelete);
                    const outbox = data.filter((itm) => itm.sEmail === config.userEmail && !itm.sDelete);
                    dispatch(mailActions.replaceMailState({ mails: data, inbox: inbox, outbox: outbox }));
                }
            } else if (config.method.toUpperCase() === 'POST') {
                if (config.allMails.length !== 0) {
                    // debugger
                    const response = await axios.put(`.json`, config.allMails);
                    if (response.statusText !== 'OK') {
                        throw new Error('POST REQ FAILED.');
                    } else {
                        setMessage("SUCESS POST.");
                    }
                } else {
                    setMessage("First time post req as empty array stopped.");
                }
            }
        } catch (err) {
            setError(err.message || 'Error in hook useHttp.')
        }
    }, [dispatch]);

    //To log 
    if (error) {
        console.log(error);
    }
    if (message) {
        console.log(message);
    }

    return sendRequest;
}

export default useHttp;