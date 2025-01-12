import { Outlet } from "react-router-dom";
import styles from "./dashboard.module.css";
import WebsiteNavbar from "../../Components/WebsiteNavbar/WebsiteNavbar";
import SideBar from "../../Components/SideBar/SideBar";
import { useState } from "react";
import { ReactComponent as SavedVideos } from "../../../../Assets/svgs/videos.svg";
import { ReactComponent as EditProfileImg } from "../../../../Assets/svgs/EditProfile.svg";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  let screen = true;
  let user = "user";

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const itemsSidebar = {
    users: {
      text: "Users",
      path: "users",
      icon: <SavedVideos />, // Update the icon to the correct SVG
    },
    editUsers: {
      text: "Add User",
      path: "add-user",
      icon: <EditProfileImg />, // Update the icon to the correct SVG
    },
  };

  return (
    <>
        <WebsiteNavbar screen={screen} onToggleSidebar={toggleSidebar} />
      <div className={`${styles.dashboard} position-relative`}>
        <div className="d-flex gap-1" style={{ marginTop: "80px" }}>
          <div className={`${showSidebar ? styles.show : styles.hide}`}>
            <SideBar items={itemsSidebar} type={user} />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
