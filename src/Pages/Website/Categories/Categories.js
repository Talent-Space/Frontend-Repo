import { useState } from "react";
import Gallery from "../Components/Gallery/Gallery";
import WebsiteNavbar from "../Components/WebsiteNavbar/WebsiteNavbar";
import styles from "./categories.module.css";
import SideBar from "../Components/SideBar/SideBar";

export default function Categories() {
  const [showSidebar, setShowSidebar] = useState(false);
  let screen = true;

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
    singing: "Singing",
    drawing: "Drawing",
    photography: "Photography",
    acting: "Acting",
    writing: "Writing",
}

  return (
    <>
      <div className={`${styles.categories}`}>
        <WebsiteNavbar screen={screen} onToggleSidebar={toggleSidebar} />
        <div className={`${styles.categories} d-flex align-items-center gap-4`}>
          <div className={`${styles.leftSide} ${showSidebar ? styles.show : styles.hide}`}>
            <SideBar items={itemsSidebar} />
            {/* <div className={`${styles.sidebar} d-flex align-items-center`}>
              <div className={`${styles.topImage}`}>
                <img
                  src={require("../../../Assets/Images/Group 2.png")}
                  alt="Top-Image"
                />
              </div>
              <ul className={`${styles.talents}`}>
                <li onClick={liColor}>Singing</li>
                <li onClick={liColor}>Drawing</li>
                <li onClick={liColor}>Photography</li>
                <li onClick={liColor}>Acting</li>
                <li onClick={liColor}>Writing</li>
              </ul>
              <div className={`${styles.bottomImage}`}>
                <img
                  src={require("../../../Assets/Images/Group 3.png")}
                  alt="Bottom-Image"
                />
              </div>
            </div> */}
          </div>
          <div className={`${styles.content}`}>
            <Gallery />
          </div>
        </div>
      </div>
    </>
  );
}
