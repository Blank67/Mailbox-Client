import { Delete } from "@material-ui/icons";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { mailActions } from "../../store/mails-slice/mails-slice";

const InboxMailItem = (props) => {
    const dispatch = useDispatch();

    const markAsRead = (mail) => {
        dispatch(mailActions.read({ mail }));
    }

    return (
        <li>
            <Container className="my-2">
                <div className="row">
                    <div className="col border rounded" style={{ background: props.mail.read ? "#F2F6FC" : " " }}>
                        <NavLink className="" to={`/mail/${props.mail.id}`} onClick={markAsRead.bind(null, props.mail)} style={{ textDecoration: 'none', color: "black" }} >
                            {!props.mail.read ? <span style={{ color: "green" }} className="mx-1">●</span> : <span className="me-3" />}
                            <span className="mx-1" style={{ fontWeight: "600" }}>From: {props.mail.sEmail}</span>
                            <span className="mx-1">Body: {props.mail.body}</span>
                        </NavLink>
                    </div>
                    <div className="col-2">
                        <div className="float-end">
                            <Button variant="danger" className="float-end" onClick={props.onDelete}>
                                <Delete />
                            </Button>
                            {/* <Button onClick={props.onDelete}>Delete</Button> */}
                        </div>
                    </div>
                </div>
            </Container>
        </li>
    );
}

export default InboxMailItem;