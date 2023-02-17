import { Delete } from "@material-ui/icons";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { mailActions } from "../../store/mails-slice/mails-slice";

const OutBoxMailItem = (props) => {
    const dispatch = useDispatch();

    const markAsRead = (mail) => {
        dispatch(mailActions.read({ mail }));
    }

    return (
        <li>
            <Container className="my-2">
                <div className="row">
                    <div className="col border rounded" style={{ background: props.for==='OUTBOX'? '#F2F6FC' : props.mail.read ? "#F2F6FC" : " " }}>
                        <NavLink className="" to={`/mail/${props.mail.id}`} onClick={markAsRead.bind(null, props.mail)} style={{ textDecoration: 'none', color: "black" }} >
                            <span className="mx-1" style={{ fontWeight: "600" }}>{props.mail.sEmail}</span>
                            <span className="mx-1">{props.mail.subject}</span>
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

export default OutBoxMailItem;