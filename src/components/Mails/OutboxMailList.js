import { useSelector } from "react-redux";
import MailItem from "./MailItem";

const OutboxMailList = (props) => {
    const mailSlice = useSelector(state => state.mail);

    const itemList = mailSlice.outbox.map((itm) => (<MailItem key={itm.id} mail={itm} />));

    return (
        <ul>
            {mailSlice.outbox.length > 0 ? itemList : <h2>EMPTY INBOX</h2>}
        </ul>
    );
}

export default OutboxMailList;