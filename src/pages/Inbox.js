import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../components/Editor/TextEditor";
import MailList from "../components/Mails/MailList";
import { mailActions } from "../store/mails-slice/mails-slice";

const Inbox = (props) => {
    const [compose, setCompose] = useState(false);
    const dispatch = useDispatch();
    const sEmail = useSelector(state => state.auth.email);
    const rEmail = useRef('');
    const subject = useRef('');
    const [body, setBody] = useState('');

    const toggleCompose = () => {
        setCompose((prevState) => (!prevState));
    }

    const onMailSend = () => {
        const rMail = rEmail.current.value;
        const subj = subject.current.value;
        const mail = {
            id: rMail + '_' + subj.replace(/\s+/g, ''),
            sEmail,
            rEmail: rMail,
            subject: subj,
            body
        }
        // console.log(mail);
        // debugger;
        dispatch(mailActions.addMail({ mail: mail }));
    }

    return (
        <div>
            <Button className="m-2" onClick={toggleCompose}>Compose</Button>
            {compose && <Container className="" style={{ position: "fixed", bottom: "0px", right: "0px", background: "whitesmoke", width: "40rem" }}>
                <Row className="rounded-top" style={{ background: "#4d4f52" }}>
                    <Col>
                        <div>
                            <span>New Message</span>
                            <div className="btn float-end" onClick={toggleCompose}>X</div>
                        </div>
                    </Col>
                </Row>

                <Row className="my-2">
                    <Col xs={1}>
                        <label htmlFor="rEmail">To: </label>
                    </Col>
                    <Col>
                        <Form.Control id="rEmail" type="email" ref={rEmail} />
                    </Col>
                </Row>

                <Row className="my-1">
                    <Col xs={1} className="ps-1">
                        <label htmlFor="subject">Subject: </label>
                    </Col>
                    <Col>
                        <Form.Control id="subject" ref={subject} />
                    </Col>
                </Row>

                <div className="sender__body">
                    <TextEditor className="my-1 mt-3" body={setBody} />
                </div>
                <div className="sender__footer">
                    <Button className="float-end my-1" onClick={onMailSend}>Send</Button>
                </div>
            </Container>
            }

            <MailList />
        </div>
    );
}

export default Inbox;