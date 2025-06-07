import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import ButtonUpload from "../UploadButton/ButtonUpload";
import { Outlet } from "react-router-dom";

import { Axios } from "../../../../Api/Axios";
import { USER } from "../../../../Api/Api";

export default function Profile() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLogout, setIsLogout] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await Axios.get(`/${USER}`);
        const userData = userResponse.data;
        setUserRole(userData.role);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <div className={`${styles.profile} position-relative`}>
        <WebsiteNavbar screen={true} onToggleSidebar={toggleSidebar} />
        <div className="d-flex gap-1" style={{ marginTop: "80px" }}>
          <SideBar 
            type={userRole} 
            logout={isLogout} 
            isOpen={showSidebar}
            onClose={closeSidebar}
          />
          <div
            className={`${styles.rightSide}`}
            style={{ backgroundColor: "#FFF" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
