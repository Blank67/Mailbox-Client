import { useSelector } from "react-redux";
import MailItem from './MailItem';

const InboxMailList = () => {
    const mailSlice = useSelector(state => state.mail);

    const itemList = mailSlice.inbox.map((itm) => (<MailItem key={itm.id} mail={itm} />));

    return (
        <ul>
            {mailSlice.inbox.length > 0 ? itemList : <h2>EMPTY INBOX</h2>}
        </ul>
    );
}

export default InboxMailList;