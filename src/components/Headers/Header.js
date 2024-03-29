import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = (props) => {
    const loginStatus = useSelector((state) => (state.auth.isLoggedIn));
    // const dispatch = useDispatch();

    // const logoutHandler = () => {
    //     dispatch(authActions.logout());
    // }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div>
                    <button className="navbar-toggler ms-3" data-bs-toggle="collapse" data-bs-target="#navBar1" aria-controls="navBar1" aria-label="Expand Navigation">
                        <div className="navbar-toggler-icon" />
                    </button>
                    <NavLink className="navbar-brand ms-3" to={loginStatus ? "/inbox" : "/login"}>Mailbox Client</NavLink>
                </div>

                <div className="collapse navbar-collapse d-flex justify-content-center" id="navBar1">
                    <ul className="navbar-nav mr-auto ms-sm-3">
                        {loginStatus && <li className="nav-item">
                            <NavLink to="/inbox" className="nav-link">Inbox</NavLink>
                        </li>}
                        {!loginStatus && <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>}
                        {!loginStatus && <li className="nav-item">
                            <NavLink to="/signup" className="nav-link" >Sign Up</NavLink>
                        </li>}
                    </ul>
                </div>
                {/* <div>
                    {loginStatus && <NavLink to="/profile" className="nav-link text-white me-2" >My Profile</NavLink>}
                </div> */}
                {/* {loginStatus && <Button className="me-3" onClick={logoutHandler}>Logout</Button>} */}
            </nav>
        </Fragment>
    );
}

export default Header;