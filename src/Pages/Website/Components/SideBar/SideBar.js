import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./sidebar.module.css";
import { faChalkboardUser, faComments, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOGOUT, USER } from "../../../../Api/Api";
import Cookie from "cookie-universal";
import { Axios } from "../../../../Api/Axios";
import {
  faBookmark,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const itemsSidebar = {
  Talent: {
    myProfile: {
      text: "My Profile",
      path: "my-profile",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    savedVideos: {
      text: "Saved Videos",
      path: "saved-videos",
      icon: <FontAwesomeIcon icon={faBookmark} />,
    },
    editProfile: {
      text: "Edit Profile",
      path: "edit-profile-talent",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
  },
  Mentor: {
    feedbacks: {
      text: "Feedbacks",
      path: "feedbacks",
      icon: <FontAwesomeIcon icon={faComments} />,
    },
    peopleTrains: {
      text: "People Trains",
      path: "people-trains",
      icon: <FontAwesomeIcon icon={faChalkboardUser} />,
    },
    editProfile: {
      text: "Edit Profile",
      path: "edit-profile-mentor",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
  },
  Investor: {
    myProfile: {
      text: "My Profile",
      path: "my-profile",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    investments: {
      text: "My Investments",
      path: "my-investments",
      icon: <FontAwesomeIcon icon={faBookmark} />,
    },
    editProfile: {
      text: "Edit Profile",
      path: "edit-profile",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
  },
};

export default function SideBar(props) {
  const cookie = Cookie();
  const userItems = itemsSidebar[props.type] || {};

  const [activeKey, setActiveKey] = useState(null);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // Get User
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  const liColor = (key) => {
    setActiveKey(key);
  };

  // const mapItems = Object.keys(props.items).map((key) => (
  //   <NavLink to={props.items[key].path} key={key}>
  //     <li
  //       key={key}
  //       onClick={() => liColor(key)}
  //       className={`d-flex align-items-center ${activeKey === key ? styles.activeLi : ""
  //         }`}
  //       style={{ color: activeKey === key ? "#7939FF" : "" }}
  //     >
  //       {props.items[key].icon ? (
  //         <span className="me-2">{props.items[key].icon}</span>
  //       ) : (
  //         ""
  //       )}
  //       {props.items[key].text || props.items[key]}
  //     </li>
  //   </NavLink>
  // ));
  const mapItems = Object.keys(userItems).map((key) => (
    <NavLink to={userItems[key].path} key={key}>
      <li
        onClick={() => liColor(key)}
        className={`d-flex align-items-center ${activeKey === key ? styles.activeLi : ""
          }`}
        style={{ color: activeKey === key ? "#7939FF" : "" }}
      >
        {userItems[key].icon && (
          <span className="me-2">{userItems[key].icon}</span>
        )}
        <span>{userItems[key].text}</span>
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
      window.location.pathname = "/login";
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

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
          {props.type === "Admin" || "Talent" || "Mentor" || "Investor" ? (
            <>
              {props.logout === true ? (
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
              ) : (
                ""
              )}
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
