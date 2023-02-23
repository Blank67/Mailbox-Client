import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const emailRef = useRef();
    const passRef = useRef();
    const confRef = useRef();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [created, setCreated] = useState(false);
    const [wait, setWait] = useState(false);

    const loginClickHandler = () => {
        navigate('/login', { replace: true });
    }

    const registerUserAPI = async (user) => {
        const REGISTER_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNUaizoA-vIyFK5_hSty_cXOBrvb7wJFo';
        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                body: JSON.stringify({ ...user, returnSecureToken: true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('registerUserAPI function Error');
            }
            return response;
        } catch (err) {
            console.log(err.message);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        //Reset Values
        setCreated(false);
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
        setApiError(false);
        setWait(false);

        //Validating Input
        if (!emailRef.current.value.includes('@')) {
            setEmailError(true);
            return;
        }
        if (passRef.current.value.length < 6) {
            setPasswordError(true);
            return;
        }
        if (passRef.current.value !== confRef.current.value) {
            setConfirmPasswordError(true);
            return;
        }
        setWait(true);
        const user = {
            email: emailRef.current.value,
            password: passRef.current.value
        }
        try {
            const response = await registerUserAPI(user);
            setWait(false);
            if (!response.ok) {
                throw new Error('Register Email API Error.');
            }
        } catch (err) {
            // alert("Email Already Exist.");
            setApiError(true);
            console.log('submitHandler function error');
            return;
        }
        setCreated(true);
        // alert('Account Created Successfully!');
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={4}>
                    <Card className="shadow-lg">
                        <Card.Header className="text-center p-3">
                            <h4>SignUp</h4>
                        </Card.Header>
                        <Card.Body style={{ backgroundColor: '#f7f5f0' }}>
                            <Form>
                                {emailError && <p className="text-center text-danger">Invalid Email.</p>}
                                {passwordError && <p className="text-center text-danger">Password length should be greater than 5.</p>}
                                {confirmPasswordError && <p className="text-center text-danger">Password and Confirm Password don't match.</p>}
                                {wait && <p className="text-center text-warning">Please Wait....</p>}
                                {apiError && <p className="text-center text-danger">Email Already Exist.</p>}
                                {created && !apiError && <p className="text-center text-info">Account successfully created.</p>}
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control id="email" type="email" required ref={emailRef} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="pass">Password</Form.Label>
                                    <Form.Control id="pass" type="password" required ref={passRef} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="conPass">Confirm Password</Form.Label>
                                    <Form.Control id="conPass" type="password" required ref={confRef} />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="warning" type="submit" onClick={submitHandler}>SignUp</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center pt-3">
                <Col xs={4}>
                    <div className="d-grid">
                        <Button onClick={loginClickHandler}>Already have an account? Login</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;