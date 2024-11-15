import { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import WebsiteNavbar from "../../Components/WebsiteNavbar/WebsiteNavbar";
import styles from "./profile.module.css";
import Gallery from "../../Components/Gallery/Gallery";
import { ReactComponent as SavedVideos } from "../../../../Assets/Images/videos.svg";
import { ReactComponent as EditProfileImg } from "../../../../Assets/Images/EditProfile.svg";
import ButtonUpload from "../../Components/UploadButton/ButtonUpload";
import UserInfo from "../../Components/UserInfo/UserInfo";

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
      icon: <SavedVideos />,
    },
    editProfile: {
      text: "Edit Profile",
      icon: <EditProfileImg />,
    },
  };

  

  return (
    <>
      <WebsiteNavbar screen={screen} onToggleSidebar={toggleSidebar} />
      <div className={`${styles.profile} d-flex align-items-center gap-4`}>
        <div
          className={`${styles.leftSide} ${
            showSidebar ? styles.show : styles.hide
          }`}>
          <SideBar items={itemsSidebar} type={user} />
        </div>
        <div
          className={`${styles.rightSide}`}
          style={{ backgroundColor: "#FFF" }}>
          <UserInfo />
          <Gallery />
        </div>
        <ButtonUpload />
      </div>
    </>
  );
}
