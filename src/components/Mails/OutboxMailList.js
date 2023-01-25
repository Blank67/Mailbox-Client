import { useDispatch, useSelector } from "react-redux";
import OutBoxMailItem from "./OutboxMailItem";
import { mailActions } from "../../store/mails-slice/mails-slice";

const OutboxMailList = (props) => {
    const mailSlice = useSelector(state => state.mail);
    const dispatch = useDispatch()

    const deleteMail = (mail) => {
        dispatch(mailActions.deleteMail({ mail: mail, for: 'OUTBOX' }))
    }
    const itemList = mailSlice.outbox.map((itm) => (<OutBoxMailItem key={itm.id} mail={itm} onDelete={deleteMail.bind(null, itm)} />));

    return (
        <ul style={{ listStyle: "none" }} className="justify-content-start mt-4">
            {mailSlice.outbox.length > 0 ? itemList : <h2>EMPTY OUTBOX</h2>}
        </ul>
    );
}

export default OutboxMailList;