import styles from "./skeleton.module.css";
export default function SkeletonCard() {
  return (
    <div className={styles.videoCardSkeleton}>
      <div className={styles.videoSkeleton}></div>
      <div className={styles.infoSkeleton}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.descriptionSkeleton}></div>
        <div className={styles.metaSkeleton}></div>
      </div>
    </div>
  );
}
