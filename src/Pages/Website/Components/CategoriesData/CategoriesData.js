import styles from "../MyVideos/myVideos.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { VIDEOS } from "../../../../Api/Api";
import SkeletonCard from "../../../../Components/Skeleton/Skeleton";

const CategoriesData = ({ catType }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await Axios.get(`${VIDEOS}`);
        setVideos(res.data);
      } catch (error) {
        console.log("Cat Error" + error);
      } finally {
        setLoading(false);
      }
    };
    getVideos();
  }, []);

  const getDataUrl = (base64String, mimeType) => {
    if (!base64String) return null;
    return `data:${mimeType};base64,${base64String}`;
  };

  if (loading) {
    return (
      <div className={styles.gallery}>
        <div className={styles.videoGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  const mapVideos = videos
    .filter((video) => video.tags === catType)
    .map((video) => (
      <div key={video.id || video._id} className={styles.videoCard}>
        <div className={styles.videoContainer}>
          <video
            ref={(el) => (videoRefs.current[video.id] = el)}
            className={styles.video}
            controls={hoveredVideoId === video.id}
            poster={getDataUrl(video.thumbnail, "image/jpeg")}
            onClick={() => setPlayingVideoId(video.id)}
            onEnded={() => setPlayingVideoId(null)}
            onMouseEnter={() => setHoveredVideoId(video.id)}
            onMouseLeave={() => setHoveredVideoId(null)}
            style={{
              cursor: "pointer",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          >
            <source
              src={getDataUrl(video.content || video.video, "video/mp4")}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={styles.videoInfo}>
          <h2 className={styles.userTitle}>{video.talent.name}</h2>
          <div
            style={{
              borderTop: "1px solid rgba(18, 18, 18, 0.12)",
              margin: "10px 0",
            }}
          >
            <h3 className={styles.videoTitle}>{video.title}</h3>
            <p className={styles.videoDescription}>{video.description}</p>
          </div>
          <div className={styles.videoMeta}>
            <div>
              <span>{video.city}</span>
              <span>{new Date(video.date).toLocaleDateString()}</span>
            </div>
            <span
              className="badge rounded-pill"
              style={{
                fontSize: "14px",
                backgroundColor: "#7939FF",
                // width: "70px",
                textAlign: "center",
                color: "white",
                // height: "26px",
                textTransform: "capitalize",
              }}
            >
              {video.tags}
            </span>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      {mapVideos.length > 0 ? (
        <div
          className={`${styles.grid}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {mapVideos}
        </div>
      ) : (
        <h5 style={{ color: "gray" }}>No Videos Found</h5>
      )}
    </>
  );
};

export default CategoriesData;
