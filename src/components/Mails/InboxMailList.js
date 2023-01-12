import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mails-slice/mails-slice";
import MailItem from './MailItem';

const InboxMailList = () => {
    const mailSlice = useSelector(state => state.mail);
    const dispatch = useDispatch();

    const deleteMail = (mail) => {
        dispatch(mailActions.deleteMail({mail: mail, for: 'INBOX'}));
    }

    const itemList = mailSlice.inbox.map((itm) => (<MailItem key={itm.id} mail={itm} onDelete={deleteMail.bind(null,itm)}/>));

    return (
        <ul>
            {mailSlice.inbox.length > 0 ? itemList : <h2>EMPTY INBOX</h2>}
        </ul>
    );
}

export default InboxMailList;