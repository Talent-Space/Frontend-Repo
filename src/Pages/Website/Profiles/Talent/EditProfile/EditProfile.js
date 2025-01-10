import styles from "./editProfile.module.css";
import { useState } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faChevronRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ButtonUpload from "../../../Components/UploadButton/ButtonUpload";
import WebsiteNavbar from "../../../Components/WebsiteNavbar/WebsiteNavbar";
import SideBar from "../../../Components/SideBar/SideBar";
import UserInfo from "../../../Components/UserInfo/UserInfo";

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
      path: "saved-videos",
      icon: <FontAwesomeIcon icon={faBookmark} />,
    },
    editProfile: {
      text: "Edit Profile",
      path: "edit-profile-talent",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
  };

  const settings = [
    "Change Photo",
    "Edit Name",
    "Edit Email",
    "Change Password",
    "Phone Number",
    "Gender",
  ];

  return (
    <>
        <div
          className={`${styles.rightSide}`}
          style={{ backgroundColor: "#FFF" }}
        >
          <UserInfo />
          {/* Second section  */}
          <Container className="mt-4">
            <ListGroup variant="flush">
              {settings.map((setting, index) => (
                <ListGroupItem
                  key={index}
                  className={`${styles.item} d-flex justify-content-between align-items-center py-3 border-bottom`}
                >
                  <span
                    className={`${styles.setting}`}
                    style={{ fontSize: "22.21px", color: "#212121" }}
                  >
                    {setting}
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    size="1x"
                    color="#939196"
                  />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Container>
        </div>
        <ButtonUpload />
    </>
  );
}
