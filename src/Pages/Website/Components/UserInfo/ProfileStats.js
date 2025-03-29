import styles from "./userInfo.module.css";

export default function ProfileStats({ role }) {
  return (
    <div className={`${styles.details} d-flex col-md-3 text-center mx-4`}>
      <div className="me-3">
        <strong>448</strong> Followers
      </div>
      <div className="me-3">
        <strong>941</strong> Following
      </div>
      {role === "Talent" && (
        <div className="">
          <strong style={{ display: "block" }}>3.5</strong>
          <div>
            <span style={{ display: "inline" }}>Rate</span>
          </div>
        </div>
      )}
    </div>
  );
} 