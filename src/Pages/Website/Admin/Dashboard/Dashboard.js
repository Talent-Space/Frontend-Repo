import { Outlet } from "react-router-dom";
import styles from "./dashboard.module.css";
import WebsiteNavbar from "../../Components/WebsiteNavbar/WebsiteNavbar";
import SideBar from "../../Components/SideBar/SideBar";
import { useState } from "react";
import { ReactComponent as SavedVideos } from "../../../../Assets/svgs/videos.svg";
import { ReactComponent as EditProfileImg } from "../../../../Assets/svgs/EditProfile.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  let screen = true;
  let user = ["Admin"];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const itemsSidebar = {
    myProfile: {
      text: "My Profile",
      path: "my-profile",
      role: "Admin",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    users: {
      text: "Users",
      path: "users",
      role: "Admin",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
    addUser: {
      text: "Add User",
      path: "user/add-user",
      role: "Admin",
      icon: <FontAwesomeIcon icon={faUserPlus} />,
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
