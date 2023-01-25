import SidebarOptions from "./SidebarOptions";
import '../../css/Sidebar.css'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TextEditor from "../Editor/TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { mailActions } from "../../store/mails-slice/mails-slice";

const Sidebar = (props) => {
    const [compose, setCompose] = useState(false);
    const dispatch = useDispatch();
    const sEmail = useSelector(state => state.auth.email);
    const rEmail = useRef('');
    const subject = useRef('');
    const [body, setBody] = useState('');
    const email = useSelector(state => state.auth.email);
    const [sEmailError, setSEmailError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const toggleCompose = () => {
        setCompose((prevState) => (!prevState));
        setSEmailError(false);
        setSubjectError(false);
        setMessageError(false);
        props.setSuccess(false);
    }

    const onMailSend = () => {
        setSEmailError(false);
        setSubjectError(false);
        setMessageError(false);
        props.setSuccess(false);
        const rMail = rEmail.current.value;
        const subj = subject.current.value;
        if (!rEmail.current.value.includes('@')) {
            setSEmailError(true);
            return;
        }
        if (subj.length === 0) {
            setSubjectError(true);
            return;
        }
        if (body.length === 0) {
            setMessageError(true);
            return;
        }
        setSEmailError(false);
        setSubjectError(false);
        setMessageError(false);
        const mail = {
            id: rMail + '_' + subj.replace(/\s+/g, ''),
            sEmail,
            rEmail: rMail,
            subject: subj,
            body,
            read: false,
            rDelete: false,
            sDelete: false
        }
        if (rEmail === email) {
            dispatch(mailActions.addMail({ mail: mail, for: sEmail }));
        }
        dispatch(mailActions.addMail({ mail: mail }));
        dispatch(mailActions.addOutboxMails({ mail: mail }));
        toggleCompose();
        props.setSuccess(true);
    }

    return (
        <div>
            {compose && <Container style={{ zIndex: "1", position: "fixed", bottom: "0px", right: "0px", background: "whitesmoke", width: "40rem" }}>
                <Row className="rounded-top" style={{ background: "#4d4f52" }}>
                    <Col>
                        <div>
                            <span>New Message</span>
                            <div className="btn float-end" onClick={toggleCompose}>X</div>
                        </div>
                    </Col>
                </Row>
                {sEmailError && <p className="text-center text-danger">Invalid "To".</p>}
                {subjectError && <p className="text-center text-danger">"Subject" cannot be empty.</p>}
                {messageError && <p className="text-center text-danger">"Message" cannot be empty.</p>}
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

                <Row className="sender__body my-2">
                    <Col>
                        <TextEditor className="my-1 mt-3" body={setBody} />
                    </Col>
                </Row>
                <div className="sender__footer">
                    <Button className="float-end my-1" onClick={onMailSend}>Send</Button>
                </div>
            </Container>
            }
            
            <div className="sidebar d-flex justify-content-center">
                <Button className="m-2" onClick={toggleCompose}>Compose</Button>
                <SidebarOptions name="Inbox" path="/inbox" />
                <SidebarOptions name="Sent" path="/sent" />
            </div>
        </div>
    );
}

export default Sidebar;