import { Button, Container } from "react-bootstrap";

const MailItem = (props) => {
    return (
        <li>
            <Container className="my-2">
                <div className="row">
                    {/* <div className="col-1">
                        {!props.mail.read ? <span style={{ color: "green" }} className="mx-1">●</span> : <span>{" "}</span>}
                    </div> */}
                    <div className="col">
                        {!props.mail.read ? <span style={{ color: "green" }} className="mx-1">●</span> : <span className="me-3" />}
                        <span className="mx-1" style={{ fontWeight: "600" }}>From: {props.mail.sEmail}</span>
                        <span className="mx-1">Body: {props.mail.body}</span>
                    </div>
                    <div className="col-2">
                        <div className="float-end">
                            <Button onClick={props.onDelete}>Delete</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </li>
    );
}

export default MailItem;