import { useEffect } from "react";
import { useSelector } from "react-redux";
import InboxMailList from "../components/Mails/InboxMailList";
import useHttp from "../hooks/useHttp";

const Inbox = (props) => {
    // const dispatch = useDispatch();
    const mailSlice = useSelector(state => state.mail);
    const email = useSelector(state => state.auth.email);
    const sendRequest = useHttp();

    setTimeout(() => {
        props.setSuccess(false);
    }, 3000);

    //GET Request is called after every 2 seconds. As it changes mailSlice, POST request is called.
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         console.log("Set interval called.");
    //         sendRequest({method: 'GET', userEmail: email});
    //     }, 2000);

    //     return () => clearInterval(intervalId);
    // },[email, sendRequest])

    // useEffect(() => {
    //     dispatch(fetchAllData(email));
    // }, [dispatch, email])
    useEffect(() => {
        // debugger
        sendRequest({method: 'GET', userEmail: email})
    }, [sendRequest, email])

    // useEffect(() => {
    //     dispatch((postAllData(mailSlice.mails)));
    // }, [dispatch, mailSlice]);
    useEffect(() => {
        // debugger
        sendRequest({method: 'POST', allMails: mailSlice.mails});
    }, [mailSlice.mails, sendRequest]);

    return (
        <div>
            {props.success && <p className="text-center text-success">Mail sent....</p>}
            <InboxMailList />
        </div>
    );
}

export default Inbox;