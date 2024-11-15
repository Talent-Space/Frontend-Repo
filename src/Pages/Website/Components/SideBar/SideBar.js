import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./sidebar.module.css";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function SideBar(props) {
  const liColor = (e) => {
    const allLi = document.querySelectorAll(`.${styles.talents} li`);
    allLi.forEach((item) => {
      item.style.color = "";
      item.classList.remove(styles.activeLi);
    });

    e.target.style.color = "#7939FF";
    e.target.classList.add(styles.activeLi);
  };

  const mapItems = Object.keys(props.items).map((key) => (
    <li key={key} onClick={liColor} className="d-flex align-items-center">
      {props.items[key].icon && props.type === "user" ? (
        <span className="me-2">{props.items[key].icon}</span>
      ) : (
        ""
      )}
      {props.items[key].text || props.items[key]}
    </li>
  ));

  return (
    <>
      <div className={`${styles.sidebar} d-flex align-items-center`}>
        <div className={`${styles.topImage}`}>
          <img
            src={require("../../../../Assets/Images/Group 2.png")}
            alt="Top-Image"
          />
        </div>
        <ul className={`${styles.talents}`}>
          {mapItems}
          {props.type === "user" ? (
            <>
              <Link to={"/login"}>
                <div
                  className={`${styles.logOut} d-flex align-items-center justify-content-center mt-4`}
                  style={{ cursor: "pointer", color: "rgba(0, 0, 0, 70%)" }}>
                  <div className={`${styles.icon}`}>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      style={{ marginTop: "20px", marginRight: "10px" }}
                    />
                  </div>
                  <li
                    style={{
                      fontSize: "16px",
                    }}>
                    LogOut
                  </li>
                </div>
              </Link>
            </>
          ) : (
            ""
          )}
        </ul>
        <div className={`${styles.bottomImage}`}>
          <img
            src={require("../../../../Assets/Images/Group 3.png")}
            alt="Bottom-Image"
          />
        </div>
      </div>
    </>
  );
}
