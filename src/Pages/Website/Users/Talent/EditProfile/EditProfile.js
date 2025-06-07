import styles from "./editProfile.module.css";
import { useEffect, useState } from "react";
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
import { Axios } from "../../../../../Api/Axios";
import { REVIEWS, USERS, USER } from "../../../../../Api/Api";

export default function EditProfile() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [rate, setRate] = useState(0);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await Axios.get(`${USER}`);
        const resReviews = await Axios.get(
          `${USERS}/${res.data.id}/${REVIEWS}`
        );
        setRate(resReviews.data.average_rating);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

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

  const handleSaveChanges = () => {
    // Handle saving the form data
    console.log("Saving changes:");
  };

  return (
    <>
      <UserInfo rate={rate} />
      <hr style={{ width: "20%" }} />
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
      <EditProfileModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
      />
    </>
  );
}
