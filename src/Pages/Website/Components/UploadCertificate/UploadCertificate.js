import styled from "styled-components";
import styles from "./uploadcertificate.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faFilePen,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../../Api/Axios";
import { CERTIFICATES, USER } from "../../../../Api/Api";

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease-in-out;
`;

const StatusMessage = styled.p`
  margin-top: 20px;
  color: ${(props) => (props.error ? "#dc3545" : "#28a745")};
`;

export default function UploadCertificate() {
  const [formValues, setFormValues] = useState({
    Type: "",
    description: "",
    certification: null,
    certificationBase64: null, // Added to store Base64 encoded thumbnail
  });

  const [userID, setUserID] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle Upload Image selection
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Certification = await fileToBase64(file);
        const imageUrl = URL.createObjectURL(file);
        setFormValues((prev) => ({
          ...prev,
          certification: file,
          certificationBase64: base64Certification,
          imagePreview: imageUrl,
        }));
        setSelectedFile(file);
        setStatusMessage(`Selected thumbnail: ${file.name}`);
        setError(false);
      } catch (err) {
        setStatusMessage("Failed to encode thumbnail");
        setError(true);
        console.error("Thumbnail encoding error:", err);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatusMessage("Please select a video file first");
      setError(true);
      return;
    }

    setIsProcessing(true);
    setError(false);
    setStatusMessage("Encoding files to Base64...");

    try {
    //   const base64Video = await fileToBase64(selectedFile);
      setStatusMessage("Uploading encoded files...");

      const payload = {
        filename: selectedFile.name,
        mimeType: selectedFile.type,
        Type: formValues.Type,
        talent_id: userID.id.toString(),
        description: formValues.description,
        certification: formValues.certificationBase64, // Send Base64 encoded thumbnail
        certification_mimeType: formValues.certification?.type, // Include thumbnail MIME type
      };

      const response = await Axios.post(`${CERTIFICATES}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      setStatusMessage("Video uploaded successfully!");
      setSelectedFile(null);
      setFormValues({
        Type: "",
        description: "",
        thumbnail: null,
        thumbnailBase64: null,
      });
      setUploadProgress(0);
      navigate("/profile/certificates");
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response) {
        setStatusMessage(
          `Upload failed: ${error.response.data.message || "Server error"}`
        );
      } else if (error.request) {
        setStatusMessage("Upload failed: Network error");
      } else {
        setStatusMessage(`Upload failed: ${error.message}`);
      }
      setError(true);
      setUploadProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  console.log(formValues);

  return (
    <>
      <div className={`${styles.uploadPage}`}>
        <h1>Upload Certificate</h1>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <div className={styles.iconBox}>
                  <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={handleUploadImage} // Updated handler
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
              </div>
              {statusMessage && (
                <StatusMessage error={error}>{statusMessage}</StatusMessage>
              )}
              {isProcessing && uploadProgress > 0 && (
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
                  <select
                    className={styles.input}
                    style={{ paddingLeft: "2.5rem" }}
                    value={formValues.Type}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        Type: e.target.value,
                      }));
                    }}
                  >
                    <option value=""> Talent Type </option>
                    <option value="Singing"> Singing </option>
                    <option value="Drawing"> Drawing </option>
                    <option value="Photography"> Photography </option>
                    <option value="Acting"> Acting </option>
                    <option value="Writing"> Writing </option>
                  </select>
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
                    placeholder="Certificate Description"
                    className={styles.textarea}
                    style={{ paddingLeft: "2.5rem" }}
                    value={formValues.description}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        description: e.target.value,
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
                    opacity: !selectedFile || isProcessing ? 0.6 : 1,
                  }}
                >
                  {isProcessing ? "Processing..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
