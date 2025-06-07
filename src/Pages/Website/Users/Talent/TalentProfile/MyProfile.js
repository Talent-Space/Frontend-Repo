import { useEffect, useState } from "react";
import MyVideos from "../../../Components/MyVideos/MyVideos";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import { REVIEWS, USER, USERS } from "../../../../../Api/Api";
import { Axios } from "../../../../../Api/Axios";
import ButtonUpload from "../../../Components/UploadButton/ButtonUpload";

export default function MyProfile() {
  const [rate, setRating] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await Axios.get(`${USER}`);
        const userId = res.data.id;
        setUserRole(res.data.role);
        const resReviews = await Axios.get(`${USERS}/${userId}/${REVIEWS}`);
        setRating(resReviews.data.average_rating);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  // console.log(rate);

  return (
    <>
      <UserInfo rate={rate} />
      <MyVideos />
      {userRole === "Talent" ? (
        <ButtonUpload path="/profile/upload-video" />
      ) : userRole === "Mentor" ? (
        <ButtonUpload path="/profile/upload-rate" />
      ) : (
        ""
      )}
    </>
  );
}
