import styles from "./userInfo.module.css";
import { ReactComponent as Avatar } from "../../../../Assets/Images/Avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function UserInfo() {
  return (
    <>
      <div className={`${styles.profileInfo} row mb-4`}>
        <div
          className="col-md-3 text-center mx-4"
          style={{ width: "223px", height: "223px" }}>
          <Avatar width="223" height="223" />
        </div>
        <div className="col-md-9" style={{ width: "fit-content" }}>
          <div className={`${styles.bottomPart}`}>
            <h2>Mohamed Hassan</h2>
            <p style={{ color: "#969696", fontSize: "20px" }}>Description</p>
            <button
              className="btn mb-3"
              style={{
                borderRadius: "15px",
                backgroundColor: "#7939FF",
                color: "#FFF",
                width: "80px",
              }}>
              Follow
            </button>
          </div>
        </div>
        <div className="d-flex col-md-3 text-center mx-4">
          <div className="me-3">
            <strong>448</strong> Followers
          </div>
          <div className="me-3">
            <strong>941</strong> Following
          </div>
          <div className="me-3">
            <strong style={{ display: "block" }}>3.5</strong>
            <div className="d-flex align-items-center">
              <span style={{ display: "inline", marginRight: "4px" }}>
                Rate
              </span>
              <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
