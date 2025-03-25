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

  let screen = true;
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await Axios.get(`/${USER}`);
        const userData = userResponse.data;
        setUserRole(userData.role)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  

  return (
    <>
      <div className={`${styles.profile} position-relative`}>
        <WebsiteNavbar screen={screen} onToggleSidebar={toggleSidebar} />
        <div className="d-flex gap-1" style={{ marginTop: "80px" }}>
          <div className={`${showSidebar ? styles.show : styles.hide}`}>
            <SideBar type={userRole} logout={isLogout} />
          </div>
          <Outlet />
          {userRole === "Talent" && <ButtonUpload />}
        </div>
      </div>
    </>
  );
}
