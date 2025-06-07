import { useState } from "react";
import Gallery from "../Components/Gallery/Gallery";
import WebsiteNavbar from "../Components/WebsiteNavbar/WebsiteNavbar";
import styles from "./categories.module.css";
import SideBar from "../Components/SideBar/SideBar";
import {
  faCameraRetro,
  faChildReaching,
  faMusic,
  faPencil,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";

export default function Categories() {
  const [showSidebar, setShowSidebar] = useState(false);
  let screen = true;
  let categories = true;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const liColor = (e) => {
    const allLi = document.querySelectorAll(`.${styles.talents} li`);
    allLi.forEach((item) => {
      item.style.color = "";
      item.classList.remove(styles.activeLi);
    });

    e.target.style.color = "#7939FF";
    e.target.classList.add(styles.activeLi);
  };

  const itemsSidebar = {
    singing: {
      text: "Singing",
      path: "singing",
      icon: <FontAwesomeIcon icon={faMusic} />,
    },
    drawing: {
      text: "Drawing",
      path: "drawing",
      icon: <FontAwesomeIcon icon={faWandMagicSparkles} />,
    },
    photography: {
      text: "Photography",
      path: "photography",
      icon: <FontAwesomeIcon icon={faCameraRetro} />,
    },
    acting: {
      text: "Acting",
      path: "acting",
      icon: <FontAwesomeIcon icon={faChildReaching} />,
    },
    writing: {
      text: "Writing",
      path: "writing",
      icon: <FontAwesomeIcon icon={faPencil} />,
    },
  };

  return (
    <>
      <div className={`${styles.categories}`}>
        <WebsiteNavbar screen={screen} onToggleSidebar={toggleSidebar} />
        <div className={`${styles.categories} d-flex gap-1`} style={{ marginTop: "80px" }}>
          <div
            className={`${
              showSidebar ? styles.show : styles.hide
            }`}
          >
            <SideBar categories={true} items={itemsSidebar} />
          </div>
          <div
            className={`${styles.rightSide}`}
            style={{ backgroundColor: "#FFF" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
