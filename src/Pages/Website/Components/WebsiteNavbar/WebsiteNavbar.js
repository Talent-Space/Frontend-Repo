import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./websiteNavbar.module.css";
import {
  faBars,
  faBell,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER } from "../../../../Api/Api";
import { Axios } from "../../../../Api/Axios";

export default function WebsiteNavbar(props) {

  const [currentUser, setCurrentUser] = useState();
  const [profileImage, setProfileImage] = useState(require("../../../../Assets/Images/profile.jpg"));


  // Get current user data
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then(async (res) => {
        // console.log(res);
        if (res.data.profilePicture) {
          const base64Response = await fetch(`data:image/jpeg;base64,${res.data.profilePicture}`);
          const blob = await base64Response.blob();
          const url = URL.createObjectURL(blob);
          setProfileImage(url);
        } else {
          setProfileImage(require("../../../../Assets/Images/profile.jpg"));
        }
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* <span>Test</span> */}
      <nav className={`${styles["web-nav"]}`}>
        <div className={`${styles["nav-container"]}`}>
          <div
            className={`d-flex align-items-center justify-content-center gap-5`}
            style={{ position: "relative" }}>
            {props.screen ? (
              <div className={`${styles.bars}`} onClick={props.onToggleSidebar}>
                <FontAwesomeIcon icon={faBars} style={{ cursor: "pointer" }} />
              </div>
            ) : (
              ""
            )}
            <div
              className={`d-flex align-items-center justify-content-between gap-5`}>
              <Link
                to={currentUser?.role === "Investor" ? "/homeInvestor" : "/home"}
                className={`${styles.logo} cursor-pointer fw-bold`}>
                <span
                  className="fw-bold"
                  style={{ color: "#7939FF", fontSize: "16px" }}>
                  Talents
                </span>
                <span className={`${styles.space}`} style={{ color: "black" }}>Space</span>
              </Link>

              <div className={`${styles["search-bar"]}`}>
                <input
                  className={`${styles["search-input"]}`}
                  type="search"
                  placeholder="Search..."
                />
                <FontAwesomeIcon
                  className={`${styles.icon}`}
                  icon={faMagnifyingGlass}
                />
              </div>

              <div
                className={`${styles["nav-links"]} d-flex align-items-center justify-content-center gap-5`}>
                <ul
                  className={`d-flex align-items-center justify-content-between gap-4`}>
                  <li>
                    <Link to={currentUser?.role === "Investor" ? "/homeInvestor" : "/home"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/categories"}>Categories</Link>
                  </li>
                  <li>
                    <Link to={"/about"}>About</Link>
                  </li>
                </ul>
                <div
                  className={`${styles["nav-icons"]} d-flex align-items-center justify-content-center gap-4`}>
                  <Link>
                    <FontAwesomeIcon icon={faBell} />
                  </Link>

                  <Link to={currentUser?.role === "Admin" ? "/dashboard/my-profile" : currentUser?.role === "Talent" ? "/profile/talent-profile" : currentUser?.role === "Mentor" ? "/profile/mentor-profile" : "/profile"}>
                    <div>
                      <img
                        src={profileImage}
                        alt="profilePicture"
                        width="24"
                        style={{ borderRadius: "50%", objectFit: "contain" }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
