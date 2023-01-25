import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../css/SidebarOptions.css";

const SidebarOptions = (props) => {
    const mailSlice = useSelector((state) => state.mail);

    const count = props.name === "Inbox" ? mailSlice.inbox.length : mailSlice.outbox.length;
    return (
        <div className={`option__item`}>
            <NavLink className="nav-link px-3 mr-2" to={props.path}>{props.name}</NavLink>
            <span>{count}</span>
        </div>
    );
}

export default SidebarOptions;