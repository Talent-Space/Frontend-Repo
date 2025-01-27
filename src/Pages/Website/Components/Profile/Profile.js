import styles from "./profile.module.css";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Gallery from "../Gallery/Gallery";
import { ReactComponent as SavedVideos } from "../../../../Assets/svgs/videos.svg";
import { ReactComponent as EditProfileImg } from "../../../../Assets/svgs/EditProfile.svg";
import ButtonUpload from "../UploadButton/ButtonUpload";
import UserInfo from "../UserInfo/UserInfo";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";


export default function Profile() {
  const [showSidebar, setShowSidebar] = useState(false);
  

  let screen = true;
  let user = ["Talent"];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const itemsSidebar = {
    myProfile: {
      text: "My Profile",
      path: "my-profile",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    savedVideos: {
      text: "Saved Videos",
      path: "saved-videos",
      icon: <FontAwesomeIcon icon={faBookmark} />,
    },
    editProfile: {
      text: "Edit Profile",
      path: "edit-profile-talent",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
  };

  

  return (
    <>
      <div className={`${styles.profile} position-relative`}>
        <WebsiteNavbar screen={screen} onToggleSidebar={toggleSidebar} />
        <div className="d-flex gap-1" style={{ marginTop: "80px" }}>
          <div className={`${showSidebar ? styles.show : styles.hide}`}>
            <SideBar items={itemsSidebar} type={user} />
          </div>
          <Outlet />
          <ButtonUpload />
        </div>
      </div>
    </>
  );
}
