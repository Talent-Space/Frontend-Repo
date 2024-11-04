import Gallery from "../Components/Gallery/Gallery";
import WebsiteNavbar from "../Components/WebsiteNavbar/WebsiteNavbar";
import styles from "./categories.module.css";

export default function Categories() {
  const liColor = (e) => {
    const allLi = document.querySelectorAll(`.${styles.talents} li`);
    allLi.forEach((item) => {
      item.style.color = "";
      item.classList.remove(styles.activeLi);
    });

    e.target.style.color = "#7939FF";
    e.target.classList.add(styles.activeLi);
  };

  return (
    <>
      <div className={`${styles.categories}`}>
        <WebsiteNavbar />
        <div className={`${styles.categories} d-flex align-items-center gap-4`}>
          <div className={`${styles.leftSide}`}>
            <div className={`${styles.sidebar} d-flex align-items-center`}>
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
            </div>
          </div>
          <div className={`${styles.content}`}>
            <Gallery />
          </div>
        </div>
      </div>
    </>
  );
}
