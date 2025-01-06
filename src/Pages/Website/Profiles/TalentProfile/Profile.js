import { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import WebsiteNavbar from "../../Components/WebsiteNavbar/WebsiteNavbar";
import styles from "./profile.module.css";
import Gallery from "../../Components/Gallery/Gallery";
import { ReactComponent as SavedVideos } from "../../../../Assets/svgs/videos.svg";
import { ReactComponent as EditProfileImg } from "../../../../Assets/svgs/EditProfile.svg";
import ButtonUpload from "../../Components/UploadButton/ButtonUpload";
import UserInfo from "../../Components/UserInfo/UserInfo";
import { Outlet } from "react-router-dom";

export default function Profile() {
  const [showSidebar, setShowSidebar] = useState(false);
  let screen = true;
  let user = "user";

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const itemsSidebar = {
    savedVideos: {
      text: "Saved Videos",
      path: "savedVideos",
      icon: <SavedVideos />,
    },
    editProfile: {
      text: "Edit Profile",
      path: "editProfileTalent",
      icon: <EditProfileImg />,
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
          <div
            className={`${styles.rightSide}`}
            style={{ backgroundColor: "#FFF" }}
          >
            <UserInfo />
            <Gallery />
          </div>
          <ButtonUpload />
        </div>
      </div>
    </>
  );
}
