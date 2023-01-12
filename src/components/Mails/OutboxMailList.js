import { useDispatch, useSelector } from "react-redux";
import MailItem from "./MailItem";
import { mailActions } from "../../store/mails-slice/mails-slice";

const OutboxMailList = (props) => {
    const mailSlice = useSelector(state => state.mail);
    const dispatch = useDispatch()

    const deleteMail = (mail) => {
        dispatch(mailActions.deleteMail({ mail: mail, for: 'OUTBOX' }))
    }
    const itemList = mailSlice.outbox.map((itm) => (<MailItem key={itm.id} mail={itm} onDelete={deleteMail.bind(null, itm)} />));

    return (
        <ul>
            {mailSlice.outbox.length > 0 ? itemList : <h2>EMPTY OUTBOX</h2>}
        </ul>
    );
}

export default OutboxMailList;