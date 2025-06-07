import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import {
  baseURL,
  FOLLOW,
  FOLLOWERS,
  FOLLOWING,
  REVIEWS,
  UNFOLLOW,
  USER,
  USERS,
} from "../../../Api/Api";
import styles from "./userProfilePage.module.css";
import ProfileStats from "../Components/UserInfo/ProfileStats";
import MyVideos from "../Components/MyVideos/MyVideos";
import WebsiteNavbar from "../Components/WebsiteNavbar/WebsiteNavbar";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Loading from "../../../Components/Loading/Loading";
import ButtonUpload from "../Components/UploadButton/ButtonUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Stars from "../Components/Stars/Stars";
import { formatDistanceToNow } from "date-fns";
import SendOfferModal from "../Components/SendOfferModal/SendOfferModal";

const getDataUrl = (base64String, mimeType) => {
  if (!base64String) return null;
  return `data:${mimeType};base64,${base64String}`;
};

export default function UserProfilePage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [followingStats, setfollowingStats] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [rate, setRating] = useState("");
  const [showOfferModal, setShowOfferModal] = useState(false);
  const defaultProfileImage = require("../../../Assets/Images/profile.jpg");
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [formValues, setFormValues] = useState({
    comment: "",
    rating: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      setUserData(null);

      if (!id) {
        setError("User ID not found in URL.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await Axios.get(`${baseURL}/users/${id}`);
        setUserData(response.data);
        const user = await Axios.get(`${USER}`);
        const userId = user.data.id;
        setCurrentUserId(user.data);
        if (userId == id) {
          navigate("/profile/talent-profile");
        }
        const resReviews = await Axios.get(`${USERS}/${id}/${REVIEWS}`);
        setReviewsData(resReviews.data.reviews);
        setRating(resReviews.data.average_rating);
        const userFollowers = await Axios.get(`/${FOLLOWERS}/${id}`);
        const userFollowing = await Axios.get(`/${FOLLOWING}/${id}`);
        setfollowingStats({
          followers: userFollowers.data,
          following: userFollowing.data,
        });
        // Check if current user is following this profile
        const isUserFollowing = userFollowers.data.followers.some(
          (follower) => follower.id === user.data.id
        );
        setIsFollowing(isUserFollowing);
        // console.log(resReviews);
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err.response && err.response.status === 404) {
          setError("User not found.");
        } else {
          setError("Failed to load user profile. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const profileImageSrc = userData?.profilePicture
    ? getDataUrl(userData.profilePicture, "image/jpeg")
    : defaultProfileImage;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!userData) {
    return (
      <div className={styles.notFound}>User data could not be loaded.</div>
    );
  }

  const handleFollowToggle = async (userId) => {
    try {
      if (isFollowing) {
        const response = await Axios.post(`${UNFOLLOW}/${userId}`);
        if (response.status === 200) {
          setIsFollowing(false);
          // Update following stats after unfollow
          const updatedFollowers = await Axios.get(`/${FOLLOWERS}/${id}`);
          const updatedFollowing = await Axios.get(`/${FOLLOWING}/${id}`);
          setfollowingStats({
            followers: updatedFollowers.data,
            following: updatedFollowing.data,
          });
          toast.success("Unfollowed successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          // alert("Unfollowed successfully");
        }
      } else {
        const response = await Axios.post(`${FOLLOW}/${userId}`);
        if (response.status === 200) {
          setIsFollowing(true);
          // Update following stats after follow
          const updatedFollowers = await Axios.get(`/${FOLLOWERS}/${id}`);
          const updatedFollowing = await Axios.get(`/${FOLLOWING}/${id}`);
          setfollowingStats({
            followers: updatedFollowers.data,
            following: updatedFollowing.data,
          });
          toast.success("Followed successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          // alert("Followed successfully");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update follow status");
    }
  };

  const handleSubmitRate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        reviewee_id: id,
        comment: formValues.comment,
        rating: formValues.rating,
      };
      const res = await Axios.post(`${REVIEWS}`, payload);
      console.log(res);
      if (res.status === 200) {
        toast.success("Review submitted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        const newReview = {
          reviewer: currentUserId,
          comment: formValues.comment,
          rating: formValues.rating,
          created_at: new Date().toISOString(),
        };

        setReviewsData((prev) => [newReview, ...prev]); // Add to top
        setFormValues({ comment: "", rating: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mapReviews = reviewsData.map((review, key) => {
    const mentorImage = review.reviewer.profilePicture
      ? `data:image/jpeg;base64,${review.reviewer.profilePicture}`
      : defaultProfileImage; // fallback to default
    return (
      <div
        key={key}
        className={`${styles.card} ${styles.fadeUp} card shadow-lg mb-4`}
      >
        <div
          className={`${styles.cardBody} card-body d-flex align-items-center justify-content-between gap-5 p-relative`}
        >
          <div style={{ width: "100%" }}>
            <div>
              <div className="d-flex align-items-center gap-4">
                <img
                  width={80}
                  height={80}
                  src={mentorImage}
                  alt="profile"
                  style={{ borderRadius: "50%", objectFit: "contain" }}
                />
                <span style={{ color: "#AFAFAF" }}>{review.reviewer.name}</span>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "46px",
                  top: "68px",
                  color: "#8E8E93",
                }}
              >
                {formatDistanceToNow(new Date(review.created_at), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p style={{ width: "80%", marginTop: "20px" }}>{review.comment}</p>
          </div>
          <div className="d-flex gap-2">
            <Stars rating={review.rating} />
          </div>
        </div>
      </div>
    );
  });

  const handleSendOfferClick = () => {
    setShowOfferModal(true);
  };

  const handleCloseModal = () => {
    setShowOfferModal(false);
  };

  const handleSaveModal = (formData) => {
    // Handle saving the form data
    console.log("Saving changes:", formData);
  };

  // console.log(currentUserId.role);

  // console.log(currentUserId.role);

  return (
    <>
      <WebsiteNavbar />
      <div className="p-4" style={{ marginTop: "80px" }}>
        <div
          className={`${styles.profileContainer} d-flex justify-content-center align-items-center flex-column`}
        >
          <div className={`${styles.profileInfo} row mb-4`}>
            <div
              className={`${styles.avatar} col-md-3 text-center mx-4`}
              style={{ width: "223px", height: "223px" }}
            >
              <img
                src={profileImageSrc}
                alt={`${userData.name}'s Profile`}
                width="223"
                height="223"
                style={{ borderRadius: "50%", objectFit: "contain" }}
              />
            </div>
            <div
              className={`${styles.info} col-md-9 d-flex align-items-center justify-content-evenly`}
            >
              <div className={`${styles.bottomPart}`}>
                <h2 style={{ textTransform: "capitalize" }}>
                  {userData.name.charAt(0).toUpperCase() +
                    userData.name.slice(1) || "No Name"}
                </h2>
                <p style={{ color: "#969696", fontSize: "18px" }}>
                  Role: {userData.role || "No Role"}
                </p>
                <p style={{ color: "#969696", fontSize: "14px" }}>
                  Bio: {userData.bio || "No Bio"}
                </p>
                <div className="d-flex align-items-center gap-2">
                  {userData.id != currentUserId.id && (
                    <button
                      onClick={() => handleFollowToggle(userData.id)}
                      className="btn mb-3"
                      disabled={userData.role === "Admin"}
                      style={{
                        borderRadius: "15px",
                        backgroundColor: isFollowing ? "#FF3939" : "#7939FF",
                        color: "#FFF",
                        width: "100px",
                        // opacity: userData.role === "Admin" ? 0.6 : 1,
                      }}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  )}
                  {currentUserId.role === "Investor" && (
                    <button
                      className="btn mb-3"
                      disabled={userData.role === "Admin"}
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#7939FF",
                        color: "#FFF",
                      }}
                      onClick={() => handleSendOfferClick(true)}
                    >
                      Submit Offer
                    </button>
                  )}
                </div>
              </div>

              <ProfileStats
                page="userProfile"
                rate={rate}
                role={userData.role}
                followingStats={followingStats}
              />
            </div>
            <hr style={{ width: "90%", marginTop: "40px" }} />
          </div>
          <MyVideos id={id} />
          {["Mentor", "Talent", "Admin", "Investor"].includes(
            currentUserId.role
          ) && <hr style={{ width: "90%", marginTop: "40px" }} />}

          {["Mentor", "Talent", "Admin", "Investor"].includes(
            currentUserId.role
          ) && (
            <>
              <h2>Feedbacks</h2>
              <div className={`${styles.second}`}>{mapReviews}</div>
            </>
          )}

          {currentUserId.role === "Mentor" && (
            <>
              <div className={`${styles.uploadRate}`}>
                <form onSubmit={handleSubmitRate}>
                  <label htmlFor="rate">Post Rate</label>
                  <textarea
                    placeholder="ُEnter Review.."
                    className="w-100"
                    name="rate"
                    id="rate"
                    value={formValues.comment}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        comment: e.target.value,
                      })
                    }
                  ></textarea>
                  <select
                    name="stars"
                    id="stars"
                    value={formValues.rating}
                    onChange={(e) =>
                      setFormValues({ ...formValues, rating: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Stars
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit">
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <SendOfferModal
      talentId={id}
        isOpen={showOfferModal}
        onClose={handleCloseModal}
        onSave={handleSaveModal}
      />
    </>
  );
}
