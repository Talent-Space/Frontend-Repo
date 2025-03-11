import React, { useState } from "react";
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
import { baseURL } from "../../../../Api/Api";

const UploadPage = () => {
  const [formValues, setFormValues] = useState({
    feelings: "",
    notes: "",
    city: "",
    date: "",
    tags: [],
    image: null,
    video: null,
  });

  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
        setFormValues(prev => ({...prev, video: selectedFile })); // Update formValues as well
    } else {
      alert(
        "Invalid file type. Please upload an image (JPEG, PNG) or a video (MP4)."
      );
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!file) {
      alert("Please select a file.");
      return;
    }
  
    setIsLoading(true);
    setUploadStatus(null); // Reset status
  
    const reader = new FileReader();
    reader.readAsDataURL(file); // Reads file as base64 with data URL prefix
    reader.onloadend = async () => {
      const base64data = reader.result; // Includes data:video/mp4;base64,...
      console.log("Base64 Data:", base64data);
  
      try {
        const response = await axios.post(`${baseURL}/video/upload`, {
          talent_id: 53,
          title: "Your Title Here",
          description: formValues.notes,
          Status: "pending",
          video: base64data, // Send base64 string directly
        }, {
          headers: {
            "Content-Type": "application/json", // Use JSON since we're sending base64 as a string
          },
        });
  
        setUploadedFileUrl(response.data.fileUrl);
        setUploadStatus("success");
        alert("File uploaded successfully!");
      } catch (error) {
        console.error("Upload error:", error);
  
        if (error.response) {
          console.error("Server responded with:", error.response.data);
          console.error("Status code:", error.response.status);
          alert(`Upload failed. Server says: ${error.response.data.message || 'Check console for details'}`);
          setUploadStatus("error");
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("Upload failed. No response from server.");
          setUploadStatus("error");
        } else {
          console.error("Error setting up the request:", error.message);
          alert(`Upload failed. Error: ${error.message}`);
          setUploadStatus("error");
        }
      } finally {
        setIsLoading(false);
      }
    };
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
                  onChange={(e) => {
                    handleFileChange(e);
                    const file = e.target.files[0];
                    if (file) {
                      const videoUrl = URL.createObjectURL(file);
                      setFormValues((prev) => ({
                        ...prev,
                        video: file,
                        videoPreview: videoUrl,
                      }));
                    }
                  }}
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
                disabled={isLoading}
                type="submit"
                className={styles.button}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
