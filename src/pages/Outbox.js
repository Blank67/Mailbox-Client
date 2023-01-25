import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OutboxMailList from '../components/Mails/OutboxMailList'
import { fetchAllData, postAllData } from '../store/http-request/mail-http';

const Outbox = (props) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const mailSlice = useSelector(state => state.mail);

    setTimeout(() => {
        props.setSuccess(false);
    }, 3000);

    useEffect(() => {
        dispatch(fetchAllData(email));
    }, [dispatch, email])

    useEffect(() => {
        dispatch((postAllData(mailSlice.mails)));
    }, [dispatch, mailSlice]);

    return (
        <div>
            {props.success && <p className="text-center">Mail sent....</p>}
            <OutboxMailList />
        </div>
    )
}

export default Outbox