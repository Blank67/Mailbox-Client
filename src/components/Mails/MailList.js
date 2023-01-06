import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData, postAllData } from "../../store/http-request/mail-http";

const MailList = (props) => {
    const items = useSelector(state => state.mail.mails);
    const dispatch = useDispatch();
    const mailSlice = useSelector(state => state.mail);
    const uuID = useSelector(state => state.auth.uuID);

    const itemList = items.map((itm) => (
        <li key={itm.id}>
            <div>id: {itm.id}</div>
            <div>sEmail: {itm.sEmail}</div>
            <div>rEmail: {itm.rEmail}</div>
            <div>subject: {itm.subject}</div>
            <div>read: {itm.read}</div>
        </li>
    ));

    useEffect(() => {
        dispatch(fetchAllData(uuID));
    }, [dispatch, uuID])

    useEffect(() => {
        dispatch((postAllData(mailSlice, uuID)));
    }, [dispatch, mailSlice, uuID]);

    return (
        <ul>
            {items.length > 0 ? itemList : <h2>EMPTY INBOX</h2>}
        </ul>
    );
}

export default MailList;