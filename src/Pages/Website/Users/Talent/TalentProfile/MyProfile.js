import Gallery from "../../../Components/Gallery/Gallery";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import styles from "./profile.module.css";

export default function MyProfile() {
  return (
    <div className={`${styles.rightSide}`} style={{ backgroundColor: "#FFF" }}>
      <UserInfo />
      <Gallery />
    </div>
  );
}
