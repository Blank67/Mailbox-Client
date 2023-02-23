import { Delete } from "@material-ui/icons";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../../css/MailItem.css';

const OutBoxMailItem = (props) => {

    return (
        <li>
            <Container className="my-2">
                <div className="row">
                    <div className="col border rounded" style={{ background: props.for === 'OUTBOX' ? '#F2F6FC' : props.mail.read ? "#F2F6FC" : " ", display: 'flex', alignItems: 'center' }}>
                        <NavLink className="" to={`/mail/${props.mail.id}`} style={{ textDecoration: 'none', color: "black", display: 'flex', flexDirection: 'row' }} >
                            <span className="mx-1">{props.mail.sName}&nbsp;</span>
                            <strong>&nbsp;{props.mail.subject}&nbsp;-&nbsp;</strong>
                            <span className="text-overflow text-secondary">{props.mail.body.replace(/(<([^>]+)>)/gi, "")}</span>
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