import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InboxMailList from "../components/Mails/InboxMailList";
import { fetchAllData, postAllData } from "../store/http-request/mail-http";

const Inbox = (props) => {
    const dispatch = useDispatch();
    const mailSlice = useSelector(state => state.mail);
    const email = useSelector(state => state.auth.email);

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
            <InboxMailList />
        </div>
    );
}

export default Inbox;