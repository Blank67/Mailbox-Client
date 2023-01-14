import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postAllData } from "../../store/http-request/mail-http";

const MailDetailPage = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const mailSlice = useSelector((state) => state.mail);

    const mail = mailSlice.mails.filter((itm) => itm.id === params.key);

    useEffect(() => {
        dispatch((postAllData(mailSlice.mails)));
    }, [dispatch, mailSlice]);

    return (
        <div>
            <div>{mail[0].sEmail}</div>
            <div>{mail[0].subject}</div>
            <div>{mail[0].body}</div>
        </div>
    );
}

export default MailDetailPage;