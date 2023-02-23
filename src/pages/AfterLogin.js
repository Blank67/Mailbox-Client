import { useState } from "react";
import { Modal, Form, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice/auth-slice";
import { mailActions } from "../store/mails-slice/mails-slice";

const AfterLogin = (props) => {
    const dispatch = useDispatch();
    const authSlice = useSelector((state) => state.auth);
    const [enteredName, setEnteredName] = useState('');
    const [error, setError] = useState(false);

    const logoutHandler = () => {
        dispatch(mailActions.clearSliceOnLogout());
        dispatch(authActions.logout());
    }
    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(false);
        if (enteredName.trim().length === 0) {
            setError(true);
            return;
        }
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCNUaizoA-vIyFK5_hSty_cXOBrvb7wJFo`, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authSlice.token,
                displayName: enteredName,
                returnSecureToken: true
            }),
            header: {
                "content-Type": "application/json"
            }
        });
        const transformedResponse = await response.json();
        console.log(response);
        console.log(transformedResponse);
        dispatch(authActions.login({ token: authSlice.token, uuID: authSlice.uuID, email: authSlice.email, name: transformedResponse.displayName }));
    }

    return (
        <Modal show fullscreen>
            <Modal.Header>
                <Modal.Title className="text-center">Hello, {authSlice.email}</Modal.Title>
                <Button className="float-end" onClick={logoutHandler}>Logout</Button>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">
                <Container style={{ width: '20vw' }}>
                    <Form onSubmit={submitHandler}>
                        {error && <p className="text-center text-danger">Name cannot be empty.</p>}
                        <Form.Group>
                            <Form.Label htmlFor="name">Enter Full Name:</Form.Label>
                            <Form.Control id="name" type="input" placeholder="Enter name..." value={enteredName} onChange={nameChangeHandler} />
                        </Form.Group>
                        {/* <Button className="my-3 float-end">Submit</Button> */}
                        <div className="my-3 justify-content-center d-flex">
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal >
    );
}

export default AfterLogin;
