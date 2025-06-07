import React, { useState, useEffect, useRef } from "react";
import styles from "./myVideos.module.css";
import {
  baseURL,
  LIKERS,
  LIKES,
  USER,
  VIDEO,
  VIDEOS,
} from "../../../../Api/Api";
import { Axios } from "../../../../Api/Axios";
import UserProfileLink from "../../../../Components/UserProfileLink/UserProfileLink";
import SkeletonCard from "../../../../Components/Skeleton/Skeleton";
import {
  faComments,
  faHeart,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// The component now accepts an optional 'id' prop
export default function MyVideos({ id }) {
  const [videos, setVideos] = useState([]);
  const [targetUserId, setTargetUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [talentName, setTalentName] = useState("User");
  const [likesMap, setLikesMap] = useState({});
  const [commentsMap, setCommentsMap] = useState({}); // { videoId: [comments] }
  const [visibleComments, setVisibleComments] = useState(null); // videoId
  const [newComments, setNewComments] = useState({}); // { videoId: "..." }
  const [userId, setUserId] = useState(null); // { videoId: "..." }
  const videoRefs = useRef({});
  const isShowingSpecificUser = !!id;


  // console.log(isShowingSpecificUser)
  useEffect(() => {
    setLoading(true);
    setError(null);
    setVideos([]);

    const fetchVideos = async () => {
      try {
        let targetUserId;
        if (isShowingSpecificUser) {
          targetUserId = Number(id);
        } else {
          const userResponse = await Axios.get(`/${USER}`);
          targetUserId = Number(userResponse.data.id);
        }

        setTargetUserId(targetUserId);
        const videosResponse = await Axios.get(`/${VIDEOS}`);

        // Filter videos where talent exists and matches the target user ID
        const filteredVideos = videosResponse.data.filter(
          (video) => video.talent && video.talent.id === targetUserId
        );

        const likesData = {};

        setVideos(filteredVideos);
        await Promise.all(
          filteredVideos.map(async (video) => {
            try {
              const res = await Axios.get(`/${VIDEOS}/${video.id}/${LIKERS}`);
              const likers = res.data.data;

              const likedByUser = likers.some(
                (user) => user.id === targetUserId
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
        setVideos(filteredVideos);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        if (
          err.response &&
          err.response.status === 401 &&
          !isShowingSpecificUser
        ) {
          setError("Please log in to see your videos");
        } else {
          setError(
            isShowingSpecificUser
              ? `Failed to load videos for this user`
              : "Failed to load your videos"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id, isShowingSpecificUser]);

  const getDataUrl = (base64String, mimeType) => {
    if (!base64String) return null;
    return `data:${mimeType};base64,${base64String}`;
  };

  useEffect(() => {
    if (videos.length > 0 && videos[0].talent) {
      setTalentName(videos[0].talent.name);
    }
  }, [videos]);

  const pageTitle = isShowingSpecificUser
    ? `${talentName}'s Videos`
    : "My Videos";
  const emptyMessage = isShowingSpecificUser
    ? "This user hasn't uploaded any videos yet"
    : "You haven't uploaded any videos yet";

  if (error) {
    return (
      <div className={styles.gallery}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.gallery}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <div className={styles.videoGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={styles.gallery}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <p className={styles.noVideos}>{emptyMessage}</p>
      </div>
    );
  }

  const handleDeleteVideo = async (videoId) => {
    try {
      await Axios.delete(`${baseURL}/${VIDEO}/delete/${videoId}`);
      const videosResponse = await Axios.get(`/${VIDEOS}`);
      const filteredVideos = videosResponse.data.filter(
        (video) => video.talent && video.talent.id === targetUserId
      );
      setVideos(filteredVideos);
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    }
  };

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

  return (
    <div className={styles.gallery}>
      <h1 className={styles.title}>{pageTitle}</h1>
      <div className={styles.videoGrid}>
        {videos.map((video) => (
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

            {isShowingSpecificUser && video.talent && (
              <div className="d-flex align-items-center p-2">
                <UserProfileLink
                  userId={video.talent.id}
                  userName={video.talent.name}
                  profilePicture={video.talent.profilePicture}
                  getDataUrl={getDataUrl}
                />
              </div>
            )}

            <div className={styles.videoInfo}>
              <h2 className={styles.userTitle}>{video.talent.name}</h2>
              <div
                style={{
                  borderTop: "1px solid rgba(18, 18, 18, 0.12)",
                  margin: "10px 0",
                  position: "relative",
                }}
              >
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoDescription}>{video.description}</p>
                {!isShowingSpecificUser && (
                  <Link
                    to={`/profile/edit-video/${video.id}`}
                    style={{
                      position: "absolute",
                      right: "4px",
                      top: "10px",
                      fontSize: "20px",
                    }}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Link>
                )}
              </div>
              <div className={styles.videoMeta}>
                <div>
                  <span style={{ marginRight: "18px" }}>{video.city}</span>
                  <span>{new Date(video.date).toLocaleDateString()}</span>
                </div>
                <span
                  className="badge rounded-pill"
                  style={{
                    fontSize: "14px",
                    backgroundColor: "#7939FF",
                    textAlign: "center",
                    color: "white",
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
                        isShowingSpecificUser
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

                {!isShowingSpecificUser && (
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className={`${styles.trash}`}
                    style={{ fontSize: "20px" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            </div>
            {/* Add comment section - only show for the selected video */}
            {visibleComments === video.id && (
              <div
                className="mt-3 p-3"
                style={{ borderTop: "1px solid rgba(18, 18, 18, 0.12)" }}
              >
                {/* Display existing comments */}
                {commentsMap[video.id] && commentsMap[video.id].length > 0 ? (
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
        ))}
      </div>
    </div>
  );
}
