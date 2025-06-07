import UserInfo from "../../../Components/UserInfo/UserInfo";
import styles from "./certificates.module.css";
import defaultCertificateImage from "../../../../../Assets/Images/certificate.svg";
import { useEffect, useState } from "react";
import { Axios } from "../../../../../Api/Axios";
import { CERTIFICATES, REVIEWS, USER, USERS } from "../../../../../Api/Api";
import ButtonUpload from "../../../Components/UploadButton/ButtonUpload";
import { ThreeDots } from "react-loader-spinner";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Certificates() {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const defaultProfileImage = require("../../../../../Assets/Images/profile.jpg");
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await Axios.get(`${USER}`);
        const user = res.data;
        setUserData(user);

        const picture = user.profilePicture;
        if (picture && picture.trim() !== "") {
          const decodedImage = `data:image/jpeg;base64,${picture}`;
          setProfileImage(decodedImage);
        } else {
          setProfileImage(defaultProfileImage);
        }

        const resReviews = await Axios.get(`${USERS}/${user.id}/${REVIEWS}`);
        setRate(resReviews.data.average_rating);
        const resCertificates = await Axios.get(`${CERTIFICATES}`);
        setCertificates(resCertificates.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteCertificate = async (id) => {
    try {
      await Axios.delete(`${CERTIFICATES}/${id}`);
      setCertificates((prev) => [...prev.filter((certi) => certi.id !== id)]);
    } catch (error) {
      console.log(error);
    }
  }

  const mapCertificates = certificates
    .filter((certificate) => certificate.talent_id === userData.id)
    .map((certi) => {
      const certificateImg = certi.certification
        ? `data:image/jpeg;base64,${certi.certification}`
        : defaultCertificateImage; 

      return (
        <div key={certi.id} className={`${styles.card} card shadow-lg mb-4`}>
          <div
            className={`${styles.cardBody} card-body d-flex align-items-center justify-content-between gap-5`}
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
                  <span style={{ color: "#AFAFAF" }}>{certi.Type}</span>
                </div>
                <p style={{ width: "80%", marginTop: "20px" }}>
                  {certi.description}
                </p>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCertificate(certi.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div>
              <img
                src={certificateImg}
                alt="certificate"
                width={290}
                height={200}
              />
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      <UserInfo rate={rate} />
      <hr style={{ width: "20%" }} />
      {/* Card Certificates */}
      {loading ? (
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
      ) : (
        <div className={`${styles.second}`}>
          {mapCertificates.length > 0 ? mapCertificates : "No certificates yet"}
        </div>
      )}
      <ButtonUpload path={"/profile/upload-certificate"} />
    </>
  );
}
