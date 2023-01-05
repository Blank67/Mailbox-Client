import { NavLink } from "react-router-dom";
import "../../css/SidebarOptions.css";

const SidebarOptions = (props) => {
    return (
        <div className={`option__item my-1`}>
            <NavLink className="nav-link" to={props.path}>{props.name}</NavLink>
        </div>
    );
}

export default SidebarOptions;