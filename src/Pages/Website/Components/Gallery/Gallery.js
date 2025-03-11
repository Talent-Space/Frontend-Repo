// Gallery.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './gallery.module.css';

export default function Gallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://promotiontalents-cegag6hybkexbgds.uaenorth-01.azurewebsites.net/api/videos';

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(API_URL);
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

  // Convert Base64 to video URL
  const getVideoUrl = (base64String, mimeType) => {
    return `data:${mimeType};base64,${base64String}`;
  };

  if (loading) {
    return <div className={styles.loading}>Loading videos...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.gallery}>
      <h1 className={styles.title}>Video Gallery</h1>
      <div className={styles.videoGrid}>
        {videos.map((video, index) => (
          <div key={index} className={styles.videoCard}>
            <div className={styles.videoContainer}>
              <video
                className={styles.video}
                controls
                poster={video.thumbnail || ''} // Assuming thumbnail might be available
              >
                <source
                  src={getVideoUrl(video.video, "video/mp4")}
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
        ))}
      </div>
    </div>
  );
}