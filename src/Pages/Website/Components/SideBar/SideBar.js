import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./sidebar.module.css";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LOGOUT, USER, baseURL } from "../../../../Api/Api";
import Cookie from "cookie-universal";
import { Axios } from "../../../../Api/Axios";

export default function SideBar(props) {
  const cookie = Cookie();

  const [activeKey, setActiveKey] = useState(null);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  //Get User
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => {
        setUser(res.data);
        // console.log(res.data.role);
      })
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  const liColor = (key) => {
    setActiveKey(key);
  };

  const mapItems = Object.keys(props.items).map((key) => (
    <NavLink to={props.items[key].path} key={key}>
      <li
        key={key}
        onClick={() => liColor(key)}
        className={`d-flex align-items-center ${
          activeKey === key ? styles.activeLi : ""
        }`}
        style={{ color: activeKey === key ? "#7939FF" : "" }}
      >
        {props.items[key].icon && props.type.includes(user.role) ? (
          <span className="me-2">{props.items[key].icon}</span>
        ) : (
          ""
        )}
        {props.items[key].text || props.items[key]}
      </li>
    </NavLink>
  ));

  const handleLogOut = async () => {
    try {
      const token = cookie.get("talent-space");
      if (!token) {
        console.error("Token is missing");
        return;
      }
      const res = await Axios.post(`/${LOGOUT}`);
      cookie.remove("talent-space");
      // console.log(res);
      window.location.pathname = "/login";
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // console.log(mapItems);

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
          {props.type === "Admin" || "Talent" ? (
            <>
              <button
                onClick={handleLogOut}
                className={`${styles.logOut} d-flex align-items-center justify-content-center mt-4`}
                style={{ cursor: "pointer", color: "rgba(0, 0, 0, 70%)" }}
              >
                <div className={`${styles.icon}`}>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    style={{ marginTop: "20px", marginRight: "10px" }}
                  />
                </div>
                <li
                  style={{
                    fontSize: "16px",
                  }}
                >
                  LogOut
                </li>
              </button>
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
