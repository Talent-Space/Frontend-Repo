import styles from "./editProfile.module.css";
import { useState } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faChevronRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import ButtonUpload from "../../../Components/UploadButton/ButtonUpload";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import EditProfileModal from "../../../Components/EditProfileModal/EditProfileModal";

export default function EditProfile() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  

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
    "Bio",
    "Birthday",
  ];

  const handleSettingClick = (setting) => {
    setSelectedSetting(setting);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSetting(null);
  };

  const handleSaveChanges = (formData) => {
    // Handle saving the form data
    console.log("Saving changes:", formData);
  };

  return (
    <>
      <div
        className={`${styles.rightSide}`}
        style={{ backgroundColor: "#FFF" }}
      >
        <UserInfo />
        {/* Second section  */}
        <Container>
          <ListGroup variant="flush">
            {settings.map((setting, index) => (
              <ListGroupItem
                key={index}
                className={`${styles.item} d-flex justify-content-between align-items-center py-3 border-bottom`}
                onClick={() => handleSettingClick(setting)}
                style={{ cursor: "pointer" }}
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
      <EditProfileModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
      />
    </>
  );
}
