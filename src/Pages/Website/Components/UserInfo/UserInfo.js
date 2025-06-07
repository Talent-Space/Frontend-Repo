import styles from "./userInfo.module.css";
import { baseURL, FOLLOWERS, FOLLOWING, USER } from "../../../../Api/Api";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import ProfileImageModal from "./ProfileImageModal";
import ProfileStats from "./ProfileStats";
import { ThreeDots } from "react-loader-spinner";

export default function UserInfo({ rate }) {
  const initialUserState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    photo: "",
    role: "",
    id: "",
    bio: "",
  };

  const location = window.location.pathname;
  // console.log(location);

  const [userInfo, setUserInfo] = useState(initialUserState);
  const [followingStats, setfollowingStats] = useState({});
  const [profileInfo, setProfileInfo] = useState({
    address: "",
    bio: "",
    profilePicture: "",
  });

  const defaultProfileImage = require("../../../../Assets/Images/profile.jpg");
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  const cookie = Cookie();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Get User Data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      setProfileImage(defaultProfileImage);

      try {
        // Fetch basic user info
        const userResponse = await Axios.get(`/${USER}`);
        // console.log(userResponse.data.id)
        const userData = userResponse.data;
        setUserInfo({
          ...initialUserState,
          ...userData,
        });
        setProfileInfo({
          address: userData.address || "",
          bio: userData.bio || "",
          profilePicture: userData.profilePicture || defaultProfileImage,
        });

        const userFollowers = await Axios.get(
          `/${FOLLOWERS}/${userResponse.data.id}`
        );
        const userFollwing = await Axios.get(
          `/${FOLLOWING}/${userResponse.data.id}`
        );
        setfollowingStats({
          followers: userFollowers.data,
          following: userFollwing.data,
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

  // console.log(followingStats);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      try {
        await Axios.put(
          `${baseURL}/users/${userInfo.id}`,
          { profilePicture: base64String },
          { headers: { "Content-Type": "application/json" } }
        );

        setProfileImage(reader.result);
        setShowModal(false);
      } catch (error) {
        handleUploadError(error);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUploadError = (error) => {
    console.error("Upload failed:", error);
    if (error.response) {
      alert(
        `Upload failed. Server says: ${
          error.response.data.message || "Check console for details"
        }`
      );
    } else if (error.request) {
      alert("Upload failed. No response from server.");
    } else {
      alert(`Upload failed. Error: ${error.message}`);
    }
  };

  if (isLoading)
    return (
      <ThreeDots
        visible={true}
        height="60"
        width="60"
        color="#7939FF"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={`${styles.profileInfo} row mb-4`}>
        <div
          className={`${styles.avatar} col-md-3 text-center mx-4`}
          style={{ width: "223px", height: "223px" }}
          onClick={() => setShowModal(true)}
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
          className={`col-md-9 d-flex align-items-center justify-content-between`}
        >
          <div className={`${styles.bottomPart}`}>
            <h2 className="text-bold">
              {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1) ||
                "No Name"}
            </h2>
            <p style={{ color: "#969696", fontSize: "18px" }}>
              <strong>Role: </strong>
              <span style={{ color: "#A780F7" }}>
                {userInfo.role || "No Role"}
              </span>
            </p>
            <p style={{ color: "#969696", fontSize: "14px" }}>
              <strong>Bio: </strong>
              <span style={{ color: "#A780F7" }}>
                {userInfo.bio || "No Bio"}
              </span>
            </p>
            {location === "/profile/investor-profile" ||
            "/profile/talent-profile" ||
            "/profile/mentor-profile" ? (
              ""
            ) : (
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
            )}
          </div>

          <ProfileStats
            rate={rate}
            role={userInfo.role}
            followingStats={followingStats}
          />
        </div>
      </div>

      <ProfileImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onFileChange={handleFileChange}
        onUpload={handleUpload}
      />
    </>
  );
}
