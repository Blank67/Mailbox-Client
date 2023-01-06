import { IconButton } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice/auth-slice";
import SearchIcon from '@material-ui/icons/Search';
import "../../css/LoginHeader.css";
import { mailActions } from "../../store/mails-slice/mails-slice";

const LoginHeader = (props) => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(mailActions.clearSliceOnLogout());
        dispatch(authActions.logout());
    }
    return (
        <div className="header">
            <div className="header__left">
                {/* <IconButton>
                    <ReorderIcon />
                </IconButton> */}
                <h4>Mailbox Client</h4>
            </div>

            <div className="header__middle">
                <div className="search__mail">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <input type="text" placeholder="Search Mail" />
                </div>
            </div>

            <div className="header__right">
                <Button className="me-3" onClick={logoutHandler}>Logout</Button>
            </div>
        </div>
    );
}

export default LoginHeader;