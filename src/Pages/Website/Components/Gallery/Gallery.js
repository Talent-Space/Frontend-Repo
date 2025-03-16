// Gallery.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './gallery.module.css';
import { baseURL } from '../../../../Api/Api';

export default function Gallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseURL}/videos`);
        // console.log(response.data)
        setVideos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load videos');
        setLoading(false);
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  const getDataUrl = (base64String, mimeType) => {
    if (!base64String || !mimeType) return '';
    return `data:${mimeType};base64,${base64String}`;
  };

  // if (loading) {
  //   return <div className={styles.loading}>Loading videos...</div>;
  // }

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

  return (
    <div className={styles.gallery}>
      <h1 className={styles.title}>Video Gallery</h1>
      <div className={styles.videoGrid}>
        {loading ? (
          // Display 6 skeleton cards while loading (adjust number as needed)
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        ) : (
          videos.map((video, index) => (
            <div key={index} className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <video
                  className={styles.video}
                  controls
                  poster={getDataUrl(video.thumbnail, "image/jpeg")}
                >
                  <source
                    src={getDataUrl(video.video, "video/mp4")}
                    type={video.mimeType}
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className={styles.videoInfo}>
                <h2 className={styles.videoTitle}>{video.title}</h2>
                <p className={styles.videoDescription}>{video.description}</p>
                <div className={styles.videoMeta}>
                  <span>{video.city}</span>
                  <span>{new Date(video.date).toLocaleDateString()}</span>
                  <span>{video.tags}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}