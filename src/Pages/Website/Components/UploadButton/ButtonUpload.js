import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./uploadButton.module.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ButtonUpload() {
  // const displayFileName = () => {
  //   const input = document.getElementById("myfile");
  //   const fileNameDisplay = document.getElementById("file-name");

  //   // Display the name of the selected file
  //   if (input.files.length > 0) {
  //     fileNameDisplay.textContent = `Selected File: ${input.files[0].name}`;
  //   } else {
  //     fileNameDisplay.textContent = "No file selected";
  //   }
  // };

  return (
    <>
      <div
        className={`${styles.upload} d-flex align-items-center justify-content-center gap-2`}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "25px",
          cursor: "pointer",
        }}>
        <div>
          <Link
            to="/profile/upload"
            className={`${styles["file-label"]}`}
            style={{ cursor: "pointer", textDecoration: "none" }}>
            <FontAwesomeIcon
              icon={faUpload}
              className={`${styles.icon}`}
              style={{
                color: "#7939FF",
                marginRight: "10px",
                fontSize: "20px",
              }}
            />
            <span style={{ color: "#A780F7" }}>Upload</span>
          </Link>

          {/* <p  className={`${styles["file-name"]}`} id="file-name">
              No file selected
            </p> */}
        </div>
      </div>
    </>
  );
}
