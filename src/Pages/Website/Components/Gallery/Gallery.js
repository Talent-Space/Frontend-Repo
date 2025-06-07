import React, { useState, useEffect, useRef } from "react";
import styles from "./gallery.module.css";
import {
  LIKES,
  VIDEOS,
  LIKERS,
  USER,
} from "../../../../Api/Api";
import { Axios } from "../../../../Api/Axios";
import { Link } from "react-router-dom";
import UserProfileLink from "../../../../Components/UserProfileLink/UserProfileLink";
import { faComments, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Gallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const videoRefs = useRef({});
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [likesMap, setLikesMap] = useState({});
  const [commentsMap, setCommentsMap] = useState({}); // { videoId: [comments] }
  const [visibleComments, setVisibleComments] = useState(null); // videoId
  const [newComments, setNewComments] = useState({}); // { videoId: "..." }
  const [userId, setUserId] = useState(null); // { videoId: "..." }

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const userRes = await Axios.get(`/${USER}`);
        const currentUserId = userRes.data.id;
        setUserId(currentUserId);

        const response = await Axios.get(`/${VIDEOS}`);
        const videosData = response.data;

        const likesData = {};

        await Promise.all(
          videosData.map(async (video) => {
            try {
              const res = await Axios.get(`/${VIDEOS}/${video.id}/${LIKERS}`);
              const likers = res.data.data;

              const likedByUser = likers.some(
                (user) => user.id === currentUserId
              );

              likesData[video.id] = {
                liked: likedByUser,
                count: res.data.total,
              };
            } catch (error) {
              console.log(`Error fetching likes for video ${video.id}`, error);
              likesData[video.id] = { liked: false, count: 0 };
            }
          })
        );

        setLikesMap(likesData);
        setVideos(videosData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load videos");
        setLoading(false);
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  const getDataUrl = (base64String, mimeType) => {
    if (!base64String) return null;
    return `data:${mimeType};base64,${base64String}`;
  };

  const SkeletonCard = () => (
    <div className={styles.videoCardSkeleton}>
      <div className={styles.videoSkeleton}></div>
      <div className={styles.infoSkeleton}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.descriptionSkeleton}></div>
        <div className={styles.metaSkeleton}></div>
      </div>
    </div>
  );

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const handleLike = async (videoId) => {
    try {
      const res = await Axios.post(`/${VIDEOS}/${videoId}/${LIKES}`);
      const updatedLikeStatus = res.data.liked;
      // console.log(res)

      const resCount = await Axios.get(`/${VIDEOS}/${videoId}/${LIKERS}`);

      setLikesMap((prev) => ({
        ...prev,
        [videoId]: {
          liked: updatedLikeStatus,
          count: resCount.data.total,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (videoId) => {
    try {
      const res = await Axios.get(`/${VIDEOS}/${videoId}/comments`);
      setCommentsMap((prev) => ({ ...prev, [videoId]: res.data.data }));
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  // console.log(commentsMap);

  const handleAddComment = async (videoId) => {
    const comment = newComments[videoId];
    if (!comment?.trim()) return;

    try {
      await Axios.post(`/${VIDEOS}/${videoId}/add-comment`, {
        body: comment,
      });

      fetchComments(videoId);

      setNewComments((prev) => ({ ...prev, [videoId]: "" }));
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  // console.log(videos);

  return (
    <div className={styles.gallery}>
      <h1 className={styles.title}>Video Gallery</h1>
      <div className={styles.videoGrid}>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className={styles.videoCard}>
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
                    src={getDataUrl(video.video, "video/mp4")}
                    type={video.mimeType}
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="d-flex align-items-center p-2">
                <UserProfileLink
                  userId={video.talent.id}
                  // userName={video.talent.name}
                  profilePicture={video.talent.profilePicture}
                  getDataUrl={getDataUrl}
                />
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
                    <span style={{ marginRight: "18px" }}>{video.city}</span>
                    <span>{new Date(video.date).toLocaleDateString()}</span>
                  </div>
                  <span
                    style={{
                      borderRadius: "14px",
                      backgroundColor: "#7939FF",
                      width: "60px",
                      textAlign: "center",
                      color: "white",
                      height: "26px",
                      textTransform: "capitalize",
                    }}
                  >
                    {video.tags}
                  </span>
                </div>
                <div className={styles.videoReacts}>
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-1">
                      <button
                        onClick={
                          userId !== video.talent_id
                            ? () => handleLike(video.id)
                            : null
                        }
                        className={styles.heart}
                        style={{
                          fontSize: "20px",
                          color: likesMap[video.id]?.liked ? "#7939FF" : "",
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                      <span>{likesMap[video.id]?.count ?? 0}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <button
                        className={styles.comment}
                        style={{ fontSize: "20px" }}
                        onClick={() => {
                          if (visibleComments === video.id) {
                            setVisibleComments(null);
                          } else {
                            setVisibleComments(video.id);
                            if (!commentsMap[video.id]) {
                              fetchComments(video.id);
                            }
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faComments} />
                      </button>
                      <span>{commentsMap[video.id]?.length ?? 0}</span>
                    </div>
                  </div>
                </div>
                {/* Add comment section - only show for the selected video */}
                {visibleComments === video.id && (
                  <div
                    className="mt-3 p-3"
                    style={{ borderTop: "1px solid rgba(18, 18, 18, 0.12)" }}
                  >
                    {/* Display existing comments */}
                    {commentsMap[video.id] &&
                    commentsMap[video.id].length > 0 ? (
                      commentsMap[video.id].map((comment, index) => (
                        <div key={index} className="mb-4">
                          <div
                            className="d-flex align-items-center"
                            style={{ gap: "80px" }}
                          >
                            <UserProfileLink
                              userId={comment.user.id}
                              profilePicture={comment.user.profilePicture}
                              getDataUrl={getDataUrl}
                            />
                            <article>
                              <strong>{comment.user.name}</strong>
                              <p className="mb-0">{comment.body}</p>
                            </article>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No comments yet</p>
                    )}
                    {/* Comment input */}
                    <div className="mt-3">
                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add a comment..."
                          value={newComments[video.id] || ""}
                          onChange={(e) =>
                            setNewComments((prev) => ({
                              ...prev,
                              [video.id]: e.target.value,
                            }))
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleAddComment(video.id);
                            }
                          }}
                        />
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#7939FF",
                            color: "white",
                          }}
                          onClick={() => handleAddComment(video.id)}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <h5 style={{ color: "gray" }}>No Videos Found</h5>
        )}
      </div>
    </div>
  );
}
