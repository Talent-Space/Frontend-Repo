import { Outlet } from "react-router-dom";
import styles from "./dashboard.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../../Components/SideBar/SideBar";
import WebsiteNavbar from "../../../Components/WebsiteNavbar/WebsiteNavbar";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLogout, setIsLogout] = useState(true);

  let screen = true;
  let user = ["Admin"];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <WebsiteNavbar screen={screen} onToggleSidebar={toggleSidebar} />
      <div className={`${styles.dashboard} position-relative`}>
        <div className="d-flex gap-1" style={{ marginTop: "80px" }}>
          <div className={`${showSidebar ? styles.show : styles.hide}`}>
            <SideBar type={user} logout={isLogout} />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
