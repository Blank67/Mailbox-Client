import { useSelector } from "react-redux";

const InboxMailList = () => {
    const mailSlice = useSelector(state => state.mail);
    
    const itemList = mailSlice.inbox.map((itm) => (
        <li key={itm.id}>
            <div>id: {itm.id}</div>
            <div>sEmail: {itm.sEmail}</div>
            <div>rEmail: {itm.rEmail}</div>
            <div>subject: {itm.subject}</div>
            <div>read: {itm.read}</div>
        </li>
    ));

    return (
        <ul>
            {mailSlice.inbox.length > 0 ? itemList : <h2>EMPTY INBOX</h2>}
        </ul>
    );
}

export default InboxMailList;