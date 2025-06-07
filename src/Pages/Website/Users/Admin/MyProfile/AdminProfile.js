import UserInfo from "../../../Components/UserInfo/UserInfo";
import styles from "./adminProfile.module.css";

export default function AdminProfile() {
  return (
    <>
      <div
        className={`${styles.rightSide}`}
        style={{ backgroundColor: "#FFF" }}
      >
        <UserInfo />
      </div>
    </>
  );
}
