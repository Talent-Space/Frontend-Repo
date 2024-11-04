import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./websiteNavbar.module.css";
import {
  faBell,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function WebsiteNavbar() {
  return (
    <>
      <nav className={`${styles["web-nav"]}`}>
        <div
          className={`${styles["nav-container"]} d-flex align-items-center justify-content-between gap-5`}>
          <h1 className={`${styles.logo} fw-bold`}>
            <span
              className="fw-bold"
              style={{ color: "#7939FF", fontSize: "16px" }}>
              Talents
            </span>
            Space
          </h1>

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
              <Link>
                <FontAwesomeIcon icon={faCircleUser} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
