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
    thumbnail: null,
    thumbnailBase64: null, // Added to store Base64 encoded thumbnail
    video: null,
  });
  const [userID, setUserID] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await Axios.get(`/${USER}`);
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
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle thumbnail selection
  const handleThumbnailChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Thumbnail = await fileToBase64(file);
        const imageUrl = URL.createObjectURL(file);
        setFormValues((prev) => ({
          ...prev,
          thumbnail: file,
          thumbnailBase64: base64Thumbnail,
          imagePreview: imageUrl,
        }));
        setStatusMessage(`Selected thumbnail: ${file.name}`);
        setError(false);
      } catch (err) {
        setStatusMessage('Failed to encode thumbnail');
        setError(true);
        console.error('Thumbnail encoding error:', err);
      }
    }
  };

  // Handle video selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setFormValues((prev) => ({
        ...prev,
        videoPreview: videoUrl,
      }));
      if (!file.type.startsWith('video/')) {
        setStatusMessage('Please select a valid video file');
        setError(true);
        return;
      }
      const MAX_FILE_SIZE = 100 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        setStatusMessage(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
        setError(true);
        return;
      }
      setSelectedFile(file);
      setStatusMessage(`Selected file: ${file.name}`);
      setError(false);
    }
  };

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
    setStatusMessage('Encoding files to Base64...');

    try {
      const base64Video = await fileToBase64(selectedFile);
      setStatusMessage('Uploading encoded files...');

      const formattedDate = formatDate(formValues.date);

      const payload = {
        video: base64Video,
        filename: selectedFile.name,
        mimeType: selectedFile.type,
        talent_id: userID.id.toString(),
        title: "Titlee3",
        description: formValues.notes,
        tags: formValues.tags,
        city: formValues.city,
        date: formattedDate,
        thumbnail: formValues.thumbnailBase64, // Send Base64 encoded thumbnail
        thumbnail_mimeType: formValues.thumbnail?.type // Include thumbnail MIME type
      };

      const response = await axios.post(`${baseURL}/video/upload`, payload, {
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
      setFormValues({
        title: "",
        feelings: "",
        notes: "",
        city: "",
        date: "",
        tags: "",
        thumbnail: null,
        thumbnailBase64: null,
        video: null,
      });
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
                  onChange={handleThumbnailChange} // Updated handler
                  disabled={isProcessing}
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
            {/* ... (form remains the same) */}
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
                    {/* ... (city options remain the same) */}
                    <option value=""> City </option>
                    <option value="Cairo"> Cairo </option>
                    <option value="Alexandria"> Alexandria </option>
                    <option value="Giza"> Giza </option>
                    <option value="Shubra El Kheima"> Shubra El Kheima </option>
                    <option value="Port Said"> Port Said </option>
                    <option value="Suez"> Suez </option>
                    <option value="Mansoura"> Mansoura </option>
                    <option value="Mahalla"> Mahalla </option>
                    <option value="Tanta"> Tanta </option>
                    <option value="Asyut"> Asyut </option>
                    <option value="Ismailia"> Ismailia </option>
                    <option value="Faiyum"> Faiyum </option>
                    <option value="Zagazig"> Zagazig </option>
                    <option value="Damietta"> Damietta </option>
                    <option value="Aswan"> Aswan </option>
                    <option value="Minya"> Minya </option>
                    <option value="Damanhur"> Damanhur </option>
                    <option value="Beni Suef"> Beni Suef </option>
                    <option value="Qena"> Qena </option>
                    <option value="Sohag"> Sohag </option>
                    <option value="Hurghada"> Hurghada </option>
                    <option value="6th of October City"> 6th of October City </option>
                    <option value="Shibin El Kom"> Shibin El Kom </option>
                    <option value="Banha"> Banha </option>
                    <option value="Kafr El Sheikh"> Kafr El Sheikh </option>
                    <option value="Arish"> Arish </option>
                    <option value="Mallawi"> Mallawi </option>
                    <option value="10th of Ramadan City"> 10th of Ramadan City </option>
                    <option value="Bilbais"> Bilbais </option>
                    <option value="Marsa Matruh"> Marsa Matruh </option>
                    <option value="Idfu"> Idfu </option>
                    <option value="Mit Ghamr"> Mit Ghamr </option>
                    <option value="Al-Hamidiyya"> Al-Hamidiyya </option>
                    <option value="Desouk"> Desouk </option>
                    <option value="Qalyub"> Qalyub </option>
                    <option value="Abu Kabir"> Abu Kabir </option>
                    <option value="Kafr el-Dawwar"> Kafr el-Dawwar </option>
                    <option value="Girga"> Girga </option>
                    <option value="Akhmim"> Akhmim </option>
                    <option value="Matareya"> Matareya </option>
                    <option value="Manfalut"> Manfalut </option>
                    <option value="Qaha"> Qaha </option>
                    <option value="New Cairo"> New Cairo </option>
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
                    value={formValues.feelings}
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