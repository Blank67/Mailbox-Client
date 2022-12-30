import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice/auth-slice";

const Login = (props) => {
    const emailRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [wait, setWait] = useState(false);
    const [retryError, setRetryError] = useState(false);
    const dispatch = useDispatch();

    const signUpClickHandler = () => {
        navigate('/signup', { replace: true });
    }

    const loginUserAPI = async (user) => {
        const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNUaizoA-vIyFK5_hSty_cXOBrvb7wJFo';
        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                body: JSON.stringify({ ...user, returnSecureToken: true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('loginUserAPI function Error');
            }
            return response;
        } catch (err) {
            console.log(err.message);
        }
    }

    const signUpHandler = async (e) => {
        e.preventDefault();

        //Reset Values
        setEmailError(false);
        setPasswordError(false);
        setWait(false);
        setRetryError(false);

        //Validate Input
        if (!emailRef.current.value.includes('@')) {
            setEmailError(true);
            return;
        }
        if (passRef.current.value.length < 6) {
            setPasswordError(true);
            return;
        }
        setWait(true);
        const user = {
            email: emailRef.current.value,
            password: passRef.current.value
        }
        try {
            const response = await loginUserAPI(user);
            const transformedResponse = await response.json();
            setWait(false);
            if (!response.ok) {
                if (transformedResponse.error.message === 'INVALID_EMAIL' || transformedResponse.error.message === 'EMAIL_NOT_FOUND') {
                    setEmailError(true);
                    throw new Error('Invalid Email reponse');
                } else if (transformedResponse.error.message === 'INVALID_PASSWORD') {
                    setPasswordError(true);
                    throw new Error('Invalid Password response')
                } else if (transformedResponse.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.') {
                    setRetryError(true);
                    throw new Error('Too many attepts reponse');
                }
            }
            const token = transformedResponse.idToken;
            const uuID = transformedResponse.localId;
            dispatch(authActions.login({ token: token, uuID: uuID }));
            navigate('/inbox', { replace: true });
        } catch (err) {
            console.log('signUpHandler function error');
        }
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={4}>
                    <Card className="shadow-lg">
                        <Card.Header className="text-center p-3">
                            <h4>Login</h4>
                        </Card.Header>
                        <Card.Body style={{ backgroundColor: '#f7f5f0' }}>
                            <Form>
                                {emailError && <p className="text-center text-danger">Invalid Email.</p>}
                                {passwordError && <p className="text-center text-danger">Invalid Password.</p>}
                                {wait && <p className="text-center text-warning">Please Wait....</p>}
                                {retryError && <p className="text-center text-warning">Please wait some time before trying again.</p>}
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control id="email" type="email" required ref={emailRef} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="pass">Password</Form.Label>
                                    <Form.Control id="pass" type="password" required ref={passRef} />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="warning" type="submit" onClick={signUpHandler}>Login</Button>
                                </div>
                                <div className="text-center mt-2">
                                    <Button variant="link">Forget Password</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center pt-3">
                <Col xs={4}>
                    <div className="d-grid">
                        <Button onClick={signUpClickHandler}>New user? SignUp</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;