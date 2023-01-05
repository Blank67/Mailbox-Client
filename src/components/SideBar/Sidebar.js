import SidebarOptions from "./SidebarOptions";
import '../../css/Sidebar.css'

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <SidebarOptions name="Inbox" path="/inbox" />
            <SidebarOptions name="Sent" path="/sent" />
        </div>
    );
}

export default Sidebar;