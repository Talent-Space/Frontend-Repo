import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={`${styles["spinner-container-submit"]}`}>
        <div className={`${styles.spinner}`}></div>
    </div>
  );
}

