import SidebarOptions from "./SidebarOptions";
import '../../css/Sidebar.css'
import { Button } from "react-bootstrap";

const Sidebar = (props) => {
    const onShow = () => {
        props.onToggle();
    }

    return (
        <div className="sidebar d-flex justify-content-center">
            <Button className="m-2" onClick={onShow}>Compose</Button>
            <SidebarOptions name="Inbox" path="/inbox" />
            <SidebarOptions name="Sent" path="/sent" />
        </div>
    );
}

export default Sidebar;