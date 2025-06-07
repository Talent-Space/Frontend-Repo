import { Link } from "react-router-dom";
import styles from "./userInfo.module.css";

export default function ProfileStats({
  page,
  rate = "0",
  role,
  followingStats = {
    followers: { followers: [] },
    following: { following: [] },
  },
}) {
  const followersCount = followingStats?.followers?.followers?.length || 0;
  const followingCount = followingStats?.following?.following?.length || 0;

  return (
    <div className={`${styles.details} d-flex col-md-3 text-center mx-4`}>
      <div>
        <strong style={{ color: "#A780F7" }}>{followersCount}</strong>{" "}
        <strong> Followers</strong>
      </div>
      <div>
        <strong style={{ color: "#A780F7" }}>{followingCount}</strong>{" "}
        <strong> Following</strong>
      </div>
      {role === "Talent" && (
        <div className="">
          {page === "userProfile" ? (
            <span
              style={{ color: "#A780F7", fontWeight: "bold" }}
            >
              {rate}
            </span>
          ) : (
            <Link
              to={"/profile/reviews"}
              className={`${styles.linkRate}`}
              style={{ color: "#A780F7", fontWeight: "bold" }}
            >
              {rate}
            </Link>
          )}
          <strong> Rate</strong>
        </div>
      )}
    </div>
  );
}
