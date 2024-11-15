import styles from "./editProfile.module.css";
import { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import WebsiteNavbar from "../../Components/WebsiteNavbar/WebsiteNavbar";
import { ReactComponent as SavedVideos } from "../../../../Assets/Images/videos.svg";
import { ReactComponent as EditProfileImg } from "../../../../Assets/Images/EditProfile.svg";
import ButtonUpload from "../../Components/UploadButton/ButtonUpload";
import UserInfo from "../../Components/UserInfo/UserInfo";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


export default function EditProfile() {
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

  const settings = [
    "Change Photo",
    "Edit Name",
    "Edit Email",
    "Change Password",
    "Phone Number",
    "Gender"
];

  return (
    <>
      <WebsiteNavbar screen={screen} onToggleSidebar={toggleSidebar} />
      <div className={`${styles.editProfile} d-flex align-items-center gap-4`}>
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
          {/* Second section  */}
          <Container className="mt-4">
            <ListGroup variant="flush">
              {settings.map((setting, index) => (
                <ListGroupItem
                  key={index}
                  className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <span className={`${styles.setting}`} style={{ fontSize: "22.21px", color: "#212121" }}>{setting}</span>
                  <FontAwesomeIcon icon={faChevronRight} size="16" color="#939196" />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Container>
        </div>
        <ButtonUpload />
      </div>
    </>
  );
}
