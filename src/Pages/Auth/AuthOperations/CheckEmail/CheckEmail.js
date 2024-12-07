import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./checkEmail.module.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../../Components/Navbar/Navbar";

export default function CheckEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Email:", email);
  //     console.log("Password:", password);
  //   };

  return (
    <>
      <div className={styles.login}>
        <Navbar showRightBar={true} />

        {/* <h1>Reset Page</h1> */}
        <div
          className={`${styles.welcome} d-flex align-items-center justify-content-center w-100`}
          style={{ backgroundColor: "#F6F6F6" }}>
          <div
            className={`${styles.check} d-flex align-items-center justify-content-center`}>
            <div className="d-flex align-items-center justify-content-center">
              <div className={styles.info}>
                <FontAwesomeIcon
                  className={`${styles.icon}`}
                  icon={faEnvelope}
                />
                <h1>Check Your Mail</h1>
                <p style={{ color: "#717171", marginBottom: "32px" }}>we well sent you an email a link to reset your password</p>
                <Button className={styles.submit}>Open Gmail</Button>
                <p style={{ color: "rgba(0, 0, 0, 0.6)" }} className={`${styles.again} text-center mt-4`}>
                  Did not recive the email? Check your spam folder or try to{" "}
                  <span style={{ color: "#7939FF" }}>send it again</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
