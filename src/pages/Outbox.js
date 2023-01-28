import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import OutboxMailList from '../components/Mails/OutboxMailList'
import useHttp from '../hooks/useHttp';

const Outbox = (props) => {
    // const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const mailSlice = useSelector(state => state.mail);
    const sendRequest = useHttp();

    setTimeout(() => {
        props.setSuccess(false);
    }, 3000);

    // useEffect(() => {
    //     dispatch(fetchAllData(email));
    // }, [dispatch, email])
    useEffect(() => {
        // debugger
        sendRequest({ method: 'GET', userEmail: email })
    }, [sendRequest, email])

    // useEffect(() => {
    //     dispatch((postAllData(mailSlice.mails)));
    // }, [dispatch, mailSlice]);
    useEffect(() => {
        // debugger
        sendRequest({ method: 'POST', allMails: mailSlice.mails });
    }, [mailSlice.mails, sendRequest]);

    return (
        <div>
            {props.success && <p className="text-center">Mail sent....</p>}
            <OutboxMailList />
        </div>
    )
}

export default Outbox