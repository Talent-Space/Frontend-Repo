// Example of how to upload a video file using React.js and send it to a backend API
import React, { useState } from 'react';
import axios from 'axios';
import styles from './uploadvideo.module.css'; // Import a CSS file for styling

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null); // State to store the selected video file
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress

  const handleFileChange = (event) => {
    // Update state with the selected video file
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert('Please select a video file first!');
      return;
    }

    try {
      // Create a FormData object to send the file as multipart/form-data
      const formData = new FormData();
      formData.append('video', videoFile); // Append the video file to the form data

      // Make the API request using axios
      const response = await axios.post('https://your-backend-url.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          // Update upload progress percentage
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      console.log('Video uploaded successfully:', response.data);
      alert('Upload successful!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload the video. Please try again.');
    }
  };

  return (
    <div className={`${styles["upload-container"]}`}>
      <h1 className={`${styles.title}`}>Upload Your Video</h1>
      <input
        className={`${styles["file-input"]}`}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
      />
      <button className={`${styles["upload-button"]}`} onClick={handleUpload}>Upload</button>

      {uploadProgress > 0 && (
        <div className={`${styles["progress-container"]}`}>
          <p className={`${styles["progress-text"]}`}>Upload Progress: {uploadProgress}%</p>
          <progress className={`${styles["progress-bar"]}`} value={uploadProgress} max="100"></progress>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
