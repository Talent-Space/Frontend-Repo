import styles from "./reviews.module.css";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import { useEffect, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { REVIEWS, USERS, USER } from "../../../../../Api/Api";
import { Axios } from "../../../../../Api/Axios";
import { formatDistanceToNow } from "date-fns";
import Stars from "../../../Components/Stars/Stars";

export default function Reviews() {
  const defaultProfileImage = require("../../../../../Assets/Images/profile.jpg");
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [reviewsData, setReviewsData] = useState([]);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await Axios.get(`${USER}`);
        const userId = res.data.id;
        const resReviews = await Axios.get(`${USERS}/${userId}/${REVIEWS}`);
        setReviewsData(resReviews.data.reviews);
        setRate(resReviews.data.average_rating);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);


  const mapReviews = reviewsData.map((review, key) => (
    <div key={key} className={`${styles.card} card shadow-lg mb-4`}>
      <div
        className={`${styles.cardBody} card-body d-flex align-items-center justify-content-between gap-5 p-relative`}
      >
        <div style={{ width: "100%" }}>
          <div>
            <div className="d-flex align-items-center gap-4">
              <img
                width={80}
                height={80}
                src={profileImage}
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
  ));

  return (
    <>
      <UserInfo rate={rate} />
      <h1>Reviews</h1>
      <div className={`${styles.second}`}>
        {mapReviews}
      </div>
    </>
  );
}
