import Feedbacks from "../../Components/Feedbacks/Feedbacks";
import UserInfo from "../../Components/UserInfo/UserInfo";
import styles from "./mentor.module.css";

export default function MentorProfile() {
  return (
    <div className={`${styles.rightSide}`} style={{ backgroundColor: "#FFF" }}>
      <Feedbacks />
    </div>
  );
}
