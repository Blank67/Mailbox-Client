import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TextEditor from "../components/Editor/TextEditor";

const Inbox = (props) => {
    const [compose, setCompose] = useState(false);

    const toggleCompose = () => {
        setCompose((prevState) => (!prevState));
    }

    return (
        <div>
            <Button className="m-2" onClick={toggleCompose}>Compose</Button>

            {compose && <Container style={{ width: "50rem" }}>
                <Row className="my-1">
                    <Col xs={1}>
                        <label htmlFor="rEmail">To: </label>
                    </Col>
                    <Col>
                        <Form.Control id="rEmail" type="email" />
                    </Col>
                </Row>
                <Row className="my-1">
                    <Col xs={1}>
                        <label htmlFor="subject">Subject: </label>
                    </Col>
                    <Col>
                        <Form.Control id="subject" />
                    </Col>
                </Row>
                <div className="sender__body">
                    <TextEditor className="my-1" />
                </div>
                <div className="sender__footer">
                    <Button className="d-flex float-end">Send</Button>
                </div>
            </Container>
            }

            <h1>INBOX PAG</h1>
        </div>
    );
}

export default Inbox;