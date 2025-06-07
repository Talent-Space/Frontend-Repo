import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./websiteNavbar.module.css";
import {
  faBars,
  faBell,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NOTIFICATIONS, USER } from "../../../../Api/Api";
import { Axios } from "../../../../Api/Axios";
import { useRef } from "react";

export default function WebsiteNavbar(props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isActive, setIsActive] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [profileImage, setProfileImage] = useState(
    require("../../../../Assets/Images/profile.jpg")
  );
  const notificationRef = useRef(null);

  const location = useLocation();
  const currentPath = location.pathname;

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  useEffect(() => {
    Axios.get(`/${NOTIFICATIONS}`).then((res) =>
      setNotifications(res.data.data)
    );
    Axios.get(`/${NOTIFICATIONS}/unread-count`).then((res) =>
      setUnreadNotificationCount(res.data.count)
    );
    Axios.get(`/${USER}`)
      .then(async (res) => {
        // console.log(res);
        if (res.data.profilePicture) {
          const base64Response = await fetch(
            `data:image/jpeg;base64,${res.data.profilePicture}`
          );
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

  // console.log(unreadNotificationCount);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (tabName) => {
    setIsActive(tabName);
  };

  console.log(notifications)

  // Add this function to filter notifications based on type
  const filterNotifications = (notifications, filterType) => {
    switch (filterType) {
      case "All":
        return notifications;
      case "Follows":
        return notifications.filter(
          notification => notification.type === "App\\Notifications\\NewFollowerNotification"
        );
      case "Likes&Comments":
        return notifications.filter(
          notification => 
            notification.type === "App\\Notifications\\NewLikeNotification" ||
            notification.type === "App\\Notifications\\NewCommentNotification"
        );
      default:
        return notifications;
    }
  };

  // Update the mapNotifications to use filtered notifications
  const mapNotifications = filterNotifications(notifications, isActive).map((notification) => {
    const decodedImage = `data:image/jpeg;base64,${notification.data.file_media_thumbnail}`;
    return (
      <div key={notification.id} className="ps-2 pe-2 mt-2 mb-1">
        <div
          className={`${styles.notification} d-flex align-items-center p-3 border rounded-3`}
          style={{
            backgroundColor: 'white',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            gap: '15px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ 
              width: "50px", 
              height: "50px",
              minWidth: "50px"
            }}
          >
            <img
              src={decodedImage}
              alt="notification"
              style={{ 
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: '2px solid #7939FF'
              }}
            />
          </div>
          <div className="flex-grow-1">
            <p 
              className="mb-0" 
              style={{
                fontSize: '0.9rem',
                color: '#333',
                fontWeight: '500',
                lineHeight: '1.4'
              }}
            >
              {notification.data.message}
            </p>
            <small 
              className="text-muted"
              style={{
                fontSize: '0.75rem',
                display: 'block',
                marginTop: '4px'
              }}
            >
              {new Date(notification.created_at).toLocaleString()}
            </small>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* <span>Test</span> */}
      <nav className={`${styles["web-nav"]}`}>
        <div className={`${styles["nav-container"]}`}>
          <div
            className={`d-flex align-items-center justify-content-center gap-5`}
            style={{ position: "relative" }}
          >
            {props.screen ? (
              <div className={`${styles.bars}`} onClick={props.onToggleSidebar}>
                <FontAwesomeIcon icon={faBars} style={{ cursor: "pointer" }} />
              </div>
            ) : (
              ""
            )}
            <div
              className={`d-flex align-items-center justify-content-between gap-5`}
            >
              <Link
                to={
                  currentUser?.role === "Investor" ? "/homeInvestor" : "/home"
                }
                className={`${styles.logo} cursor-pointer fw-bold`}
              >
                <span
                  className="fw-bold"
                  style={{ color: "#7939FF", fontSize: "16px" }}
                >
                  Talents
                </span>
                <span className={`${styles.space}`} style={{ color: "black" }}>
                  Space
                </span>
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
                className={`${styles["nav-links"]} d-flex align-items-center justify-content-center gap-5`}
              >
                <ul
                  className={`d-flex align-items-center justify-content-between gap-4`}
                >
                  <li>
                    <Link
                      to={
                        currentUser?.role === "Investor"
                          ? "/homeInvestor"
                          : "/home"
                      }
                      style={{
                        color: currentPath === "/home" ? "#7939FF" : "",
                      }}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/categories/singing"}
                      style={{
                        color:
                          currentPath === "/categories/singing" ||
                          currentPath === "/categories/drawing" ||
                          currentPath === "/categories/photography" ||
                          currentPath === "/categories/acting" ||
                          currentPath === "/categories/writing"
                            ? "#7939FF"
                            : "",
                      }}
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/about"}
                      style={{
                        color: currentPath === "/about" ? "#7939FF" : "",
                      }}
                    >
                      About
                    </Link>
                  </li>
                </ul>
                <div
                  className={`${styles["nav-icons"]} d-flex align-items-center justify-content-center gap-4`}
                >
                  <div ref={notificationRef} style={{ position: "relative" }}>
                    <button
                      onClick={toggleNotifications}
                      className={styles.bellButton}
                    >
                      <FontAwesomeIcon icon={faBell} />
                      {unreadNotificationCount > 0 && (
                        <span className={`${styles.notificationsCount}`}>
                          {unreadNotificationCount}
                        </span>
                      )}
                    </button>
                    {showNotifications && (
                      <div className={styles.notificationDropdown}>
                        <div className={styles.notificationFilterButtons}>
                          <button
                            onClick={() => handleClick("All")}
                            style={{
                              borderBottom: isActive === "All" ? "2px solid #7939FF" : "none",
                              color: isActive === "All" ? "#7939FF" : "gray",
                              padding: "8px 16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontWeight: "500"
                            }}
                          >
                            All
                          </button>
                          <button
                            onClick={() => handleClick("Follows")}
                            style={{
                              borderBottom: isActive === "Follows" ? "2px solid #7939FF" : "none",
                              color: isActive === "Follows" ? "#7939FF" : "gray",
                              padding: "8px 16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontWeight: "500"
                            }}
                          >
                            Follows
                          </button>
                          <button
                            onClick={() => handleClick("Likes&Comments")}
                            style={{
                              borderBottom: isActive === "Likes&Comments" ? "2px solid #7939FF" : "none",
                              color: isActive === "Likes&Comments" ? "#7939FF" : "gray",
                              padding: "8px 16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontWeight: "500"
                            }}
                          >
                            Likes & Comments
                          </button>
                        </div>
                        <div className={styles.notificationList}>
                          {filterNotifications(notifications, isActive).length > 0 ? (
                            mapNotifications
                          ) : (
                            <p className="p-3 text-center text-muted">No notifications in this category</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    to={
                      currentUser?.role === "Admin"
                        ? "/dashboard/my-profile"
                        : currentUser?.role === "Talent"
                        ? "/profile/talent-profile"
                        : currentUser?.role === "Mentor"
                        ? "/profile/mentor-profile"
                        : currentUser?.role === "Investor"
                        ? "/profile/investor-profile"
                        : "/profile"
                    }
                  >
                    <div>
                      <img
                        src={profileImage}
                        alt="profilePicture"
                        width="30"
                        height="30"
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
