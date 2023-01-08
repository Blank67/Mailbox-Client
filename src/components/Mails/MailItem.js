import { Card } from "react-bootstrap";

const MailItem = (props) => {
    return (
        <li>
            <Card>
                <p>{props.mail.sEmail}</p>
            </Card>
        </li>
    );
}

export default MailItem;