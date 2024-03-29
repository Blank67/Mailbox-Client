import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mails-slice/mails-slice";
import InboxMailItem from './InboxMailItem';
import Spinner from 'react-bootstrap/Spinner';

const InboxMailList = () => {
    const mailSlice = useSelector(state => state.mail);
    const dispatch = useDispatch();

    const deleteMail = (mail) => {
        dispatch(mailActions.deleteMail({ mail: mail, for: 'INBOX' }));
    }

    const itemList = mailSlice.inbox.map((itm) => (<InboxMailItem key={itm.id} mail={itm} onDelete={deleteMail.bind(null, itm)} />));

    return (
        <ul style={{ listStyle: "none" }} className="justify-content-start mt-4">
            {mailSlice.inbox.length > 0 ? itemList : mailSlice.mails.length === 0 ? <span className="d-flex justify-content-center"><Spinner animation="grow" variant="secondary" style={{ marginTop: '250px', marginRight: '150px' }} /></span> : <h2 className="text-center" style={{ marginTop: '250px', marginRight: '150px' }}>Sorry, you don't have any mails.</h2>}
        </ul>
    );
}

export default InboxMailList;