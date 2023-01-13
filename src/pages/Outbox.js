import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OutboxMailList from '../components/Mails/OutboxMailList'
import { fetchAllData, postAllData } from '../store/http-request/mail-http';

const Outbox = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const mailSlice = useSelector(state => state.mail);

    useEffect(() => {
        dispatch(fetchAllData(email));
    }, [dispatch, email])
    
    useEffect(() => {
        dispatch((postAllData(mailSlice.mails)));
    }, [dispatch, mailSlice]);

    return (
        // <div>
            <OutboxMailList />
        // </div>
    )
}

export default Outbox