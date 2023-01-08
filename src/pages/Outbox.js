import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OutboxMailList from '../components/Mails/OutboxMailList'
import { fetchAllData } from '../store/http-request/mail-http';

const Outbox = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);

    useEffect(() => {
        dispatch(fetchAllData(email));
    }, [dispatch, email])

    return (
        <div>
            <OutboxMailList />
        </div>
    )
}

export default Outbox