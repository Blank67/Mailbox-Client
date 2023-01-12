import { Button, Card } from "react-bootstrap";

const MailItem = (props) => {
    return (
        <li>
            <Card>
                <p>Id: {props.mail.id}</p>
                <p>From: {props.mail.sEmail}</p>
                <p>To: {props.mail.rEmail}</p>
                <Button onClick={props.onDelete}>Delete</Button>
            </Card>
        </li>
    );
}

export default MailItem;