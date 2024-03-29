import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postAllData } from "../../store/http-request/mail-http";
import parse from 'html-react-parser';

const MailDetailPage = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const mailSlice = useSelector((state) => state.mail);

    const mail = mailSlice.mails.filter((itm) => itm.id === params.key);

    // const deleteMail = () => {
    //     debugger;
    //     console.log("Button Clicked!");
    //     console.log(mail);
    //     dispatch(mailActions.deleteMail({ mail: mail, for: 'INBOX' }));
    // }
    useEffect(() => {
        dispatch((postAllData(mailSlice.mails)));
    }, [dispatch, mailSlice]);

    return (
        <Container style={{ marginTop: "60px" }}>
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <span>From: {mail[0].sName} ({mail[0].sEmail})</span>
                        </Col>
                        {/* <Col>
                            <Button variant="danger" className="float-end" onClick={deleteMail}>
                                <Delete />
                            </Button>
                        </Col> */}
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Subject: {mail[0].subject}</Card.Title>
                    <hr></hr>
                    <span id={mail[0].id}>
                        {/* {mail[0].body.replace(/<[^>]+>/g, '')} */}
                        {parse(mail[0].body)}
                    </span>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default MailDetailPage;