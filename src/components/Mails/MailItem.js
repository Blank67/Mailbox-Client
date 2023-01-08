import { Button, Card } from "react-bootstrap";
import ExpenseDetails from "./ExpenseDetails";

const MailItem = (props) => {
    return (
        <li>
            <Card>
                <div className="d-flex justify-content-end p-2" style={{ marginBottom: "20px", marginTop: "-65px" }}>
                    <Button variant="warning">Edit</Button>
                    <Button variant="danger" className="mx-2" onClick={props.onRemove}>Delete</Button>
                </div>
            </Card>
        </li>
    );
}

export default MailItem;