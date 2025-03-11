import React, { useEffect, useState } from "react";
import styles from "./uploadPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCamera,
  faFilePen,
  faLocationDot,
  faSmile,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { baseURL, USER } from "../../../../Api/Api";
import { Axios } from "../../../../Api/Axios";
import styled from 'styled-components';


const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease-in-out;
`;

const StatusMessage = styled.p`
  margin-top: 20px;
  color: ${props => props.error ? '#dc3545' : '#28a745'};
`;

const UploadPage = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    feelings: "",
    notes: "",
    city: "",
    date: "",
    tags: "",
    image: null,
    video: null,
  });
  const [userID, setUserID] = useState("")
  // const [file, setFile] = useState(null);
  // const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [uploadStatus, setUploadStatus] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      // setIsLoading(true);
      // setError(null);
      // setProfileImage(defaultProfileImage)

      try {
        // Fetch basic user info
        const userResponse = await Axios.get(`/${USER}`);
        console.log(userResponse.data)
        const userData = userResponse.data;
        setUserID({
          id: userData.id || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Convert file to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data URI prefix
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setFormValues((prev) => ({
        ...prev,
        videoPreview: videoUrl,
      }));
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setStatusMessage('Please select a valid video file');
        setError(true);
        return;
      }
      // Validate file size (e.g., max 10MB for Base64 - smaller due to encoding overhead)
      if (file.size > 10 * 1024 * 1024) {
        setStatusMessage('File size exceeds 10MB limit (Base64 encoding limitation)');
        setError(true);
        return;
      }
      setSelectedFile(file);
      setStatusMessage(`Selected file: ${file.name}`);
      setError(false);
    }
  };
  console.log(formValues)

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setStatusMessage('Please select a video file first');
      setError(true);
      return;
    }

    setIsProcessing(true);
    setError(false);
    setStatusMessage('Encoding video to Base64...');

    try {
      // Convert video to Base64
      const base64Video = await fileToBase64(selectedFile);
      setStatusMessage('Uploading encoded video...');

      const formattedDate = formatDate(formValues.date);

      // Send Base64 string to backend
      const response = await axios.post(`${baseURL}/video/upload`, {
        video: base64Video,
        filename: selectedFile.name,
        mimeType: selectedFile.type,
        talent_id: userID.id.toString(),
        title: "Titlee3",
        description: formValues.notes,
        tags: formValues.tags,
        city: formValues.city,
        date: formattedDate,
        Status: "pending"
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      setStatusMessage('Video uploaded successfully!');
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response) {
        setStatusMessage(`Upload failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        setStatusMessage('Upload failed: Network error');
      } else {
        setStatusMessage(`Upload failed: ${error.message}`);
      }
      setError(true);
      setUploadProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1> Upload Page </h1>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <div className={styles.iconBox}>
                <input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const imageUrl = e.target.result;
                        setFormValues((prev) => ({
                          ...prev,
                          image: file,
                          imagePreview: imageUrl,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label
                  htmlFor="imageUpload"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {formValues.imagePreview ? (
                    <img
                      src={formValues.imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className={`${styles.icon}`}
                      icon={faCamera}
                    />
                  )}
                </label>
              </div>
              <div className={styles.iconBox}>
                <input
                  type="file"
                  accept="video/*"
                  id="videoUpload"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  disabled={isProcessing}
                />
                <label
                  htmlFor="videoUpload"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {formValues.videoPreview ? (
                    <video
                      src={formValues.videoPreview}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      controls
                    />
                  ) : (
                    <FontAwesomeIcon
                      className={`${styles.icon}`}
                      icon={faVideo}
                    />
                  )}
                </label>
              </div>
            </div>
            {statusMessage && (
              <StatusMessage error={error}>
                {statusMessage}
              </StatusMessage>
            )}
            {(isProcessing && uploadProgress > 0) && (
              <ProgressBar>
                <ProgressFill progress={uploadProgress} />
              </ProgressBar>
            )}
            <form className={styles.form}>
              <div style={{ position: "relative" }}>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#666",
                  }}
                />
                <input
                  type="text"
                  placeholder="Tag People"
                  className={styles.input}
                  style={{ paddingLeft: "2.5rem" }}
                  value={formValues.tags}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      tags: e.target.value,
                    }));
                  }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#666",
                  }}
                />
                <input
                  type="date"
                  placeholder="Date"
                  className={styles.input}
                  style={{ paddingLeft: "2.5rem" }}
                  value={formValues.date}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className={styles.row}>
                <div style={{ position: "relative" }}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#666",
                    }}
                  />
                  <select
                    className={styles.select}
                    style={{ paddingLeft: "2.5rem" }}
                    value={formValues.city}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }));
                    }}
                  >
                    <option value=""> City </option>
                    <option value="cairo"> Cairo </option>
                    <option value="alexandria"> Alexandria </option>
                  </select>
                </div>
                <div style={{ position: "relative" }}>
                  <FontAwesomeIcon
                    icon={faSmile}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#666",
                    }}
                  />
                  <select
                    className={styles.select}
                    style={{ paddingLeft: "2.5rem" }}
                    value={formValues.feeling}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        feelings: e.target.value,
                      }));
                    }}
                  >
                    <option value=""> Feeling </option>
                    <option value="happy"> Happy </option>
                    <option value="sad"> Sad </option>
                  </select>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <FontAwesomeIcon
                  icon={faFilePen}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "27px",
                    color: "#666",
                  }}
                />
                <textarea
                  placeholder="Notes"
                  className={styles.textarea}
                  style={{ paddingLeft: "2.5rem" }}
                  value={formValues.notes}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || isProcessing}
                type="submit"
                className={styles.button}
                style={{
                  // marginLeft: '10px',
                  opacity: (!selectedFile || isProcessing) ? 0.6 : 1,
                }}
              >
                {isProcessing ? 'Processing...' : 'Upload'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
