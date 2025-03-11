import styles from "./userInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { baseURL, USER } from "../../../../Api/Api";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { Modal, Button } from "react-bootstrap";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    photo: "",
    role: "",
    id: ""
  });
  const [profileInfo, setProfileInfo] = useState({
    address: "",
    bio: "",
    profilePicture: "",
  });
  // Initialize with the default profile image
  const defaultProfileImage = require("../../../../Assets/Images/profile.jpg");
  const [profileImage, setProfileImage] = useState(require("../../../../Assets/Images/profile.jpg"));
  // const [userID, setUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookie = Cookie();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      setProfileImage(defaultProfileImage)

      try {
        // Fetch basic user info
        const userResponse = await Axios.get(`/${USER}`);
        console.log(userResponse.data)
        const userData = userResponse.data;
        setUserInfo({
          name: userData.name || "",
          email: userData.email || "",
          password: userData.password || "",
          phone: userData.phone || "",
          gender: userData.gender || "",
          photo: userData.photo || "",
          role: userData.role || "",
          id: userData.id || "",
        });
          setProfileInfo({
            address: userData.address || "",
            bio: userData.bio || "",
            profilePicture: userData.profilePicture || defaultProfileImage,
          });

          // Update profile image only if profilePicture exists and is non-empty
          if (userData.profilePicture && userData.profilePicture.trim() !== "") {
            const decodedImage = `data:image/jpeg;base64,${userData.profilePicture}`;
            setProfileImage(decodedImage);
          } else {
            // Keep the default image if no profilePicture is available
            setProfileImage(defaultProfileImage);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

      Axios.put(`${baseURL}/users/${userInfo.id}`, {
        profilePicture: base64String,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Upload successful:", response.data);
          // Update profile info with new profile picture
          setProfileInfo((prev) => ({
            ...prev,
            profilePicture: base64String,
          }));
          // Update the profile image state with the uploaded image
          setProfileImage(reader.result); // Full data URL for preview
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          if (error.response) {
            console.error("Server responded with:", error.response.data);
            alert(`Upload failed. Server says: ${error.response.data.message || "Check console for details"}`);
          } else if (error.request) {
            console.error("No response received:", error.request);
            alert("Upload failed. No response from server.");
          } else {
            console.error("Error setting up the request:", error.message);
            alert(`Upload failed. Error: ${error.message}`);
          }
        });
    };
    reader.readAsDataURL(selectedFile);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={`${styles.profileInfo} row mb-4`}>
        <div
          className={`${styles.avatar} col-md-3 text-center mx-4`}
          style={{ width: "223px", height: "223px" }}
          onClick={handleAvatarClick}
        >
          <img
            src={profileImage}
            alt="profilePicture"
            width="223"
            height="223"
            style={{ borderRadius: "50%", objectFit: "contain" }}
          />
        </div>
        <div
          className={`${styles.info} col-md-9 d-flex align-items-center justify-content-evenly`}
        >
          <div className={`${styles.bottomPart}`}>
            <h2>
              {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1) || "No Name"}
            </h2>
            <p style={{ color: "#969696", fontSize: "20px" }}>
              {userInfo.role || "No Role"}
            </p>
            <button
              className="btn mb-3"
              disabled={userInfo.role === "Admin"}
              style={{
                borderRadius: "15px",
                backgroundColor: "#7939FF",
                color: "#FFF",
                width: "80px",
                opacity: userInfo.role === "Admin" ? 0.6 : 1,
              }}
            >
              Follow
            </button>
          </div>
          <div className={`${styles.details} d-flex col-md-3 text-center mx-4`}>
            <div className="me-3">
              <strong>448</strong> Followers
            </div>
            <div className="me-3">
              <strong>941</strong> Following
            </div>
            <div className="">
              <strong style={{ display: "block" }}>3.5</strong>
              <div className="d-flex align-items-center">
                <span style={{ display: "inline" }}>Rate</span>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "gold", marginLeft: "4px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}