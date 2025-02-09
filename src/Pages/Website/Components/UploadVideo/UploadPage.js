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

  // console.log(formValues);

  return (
    <>
      <div className={styles.container}>
        <h1>Upload Page</h1>
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
                          imagePreview: imageUrl
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
                        objectFit: "contain"
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
                    const file = e.target.files[0];
                    if (file) {
                      const videoUrl = URL.createObjectURL(file);
                      setFormValues((prev) => ({
                        ...prev,
                        video: file,
                        videoPreview: videoUrl
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
                  {formValues.video ? (
                    <video
                      src={URL.createObjectURL(formValues.video)}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                      }}
                      controls
                    />
                  ) : (
                    <FontAwesomeIcon className={`${styles.icon}`} icon={faVideo} />
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
                    <option value="">City</option>
                    <option value="cairo">Cairo</option>
                    <option value="alexandria">Alexandria</option>
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
                    <option value="">Feeling</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
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
              <button type="submit" className={styles.button}>
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
