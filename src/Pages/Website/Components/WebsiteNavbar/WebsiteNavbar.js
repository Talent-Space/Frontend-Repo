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

  {/* Get current user data */}
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

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
                to={"/"}
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
                    <Link to={"/"}>Home</Link>
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
                  
                  <Link to={currentUser?.role === "Admin" ? "/dashboard/my-profile" : "/profile/my-profile"}>
                    <FontAwesomeIcon icon={faCircleUser} />
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
