import styles from "./userInfo.module.css";
import { ReactComponent as Avatar } from "../../../../Assets/svgs/Avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { USER } from "../../../../Api/Api";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";

export default function UserInfo() {
  const [userData, setUserData] = useState({});
  const cookie = Cookie();

  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => setUserData(res.data));
  }, []);

  // console.log(userData);

  return (
    <>
      <div className={`${styles.profileInfo} row mb-4`}>
        <div
          className={`${styles.avatar} col-md-3 text-center mx-4`}
          style={{ width: "223px", height: "223px" }}
        >
          <Avatar width="223" height="223" />
        </div>
        <div
          className={`${styles.info} col-md-9 d-flex align-items-center justify-content-evenly`}
        >
          <div className={`${styles.bottomPart}`}>
            <h2>{userData.name}</h2>
            <p style={{ color: "#969696", fontSize: "20px" }}>
              {userData.role}
            </p>
            <button
              className="btn mb-3"
              style={{
                borderRadius: "15px",
                backgroundColor: "#7939FF",
                color: "#FFF",
                width: "80px",
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
    </>
  );
}
