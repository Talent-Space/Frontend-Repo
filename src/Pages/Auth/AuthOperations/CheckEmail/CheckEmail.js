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
        {/* Navbar */}
        {/* <nav
          className={`${styles["navbar-login"]} d-flex align-items-center justify-content-between`}>
          <h1
            className={`${styles.logo} fw-bold`}
            style={{ fontFamily: "Urbanist, sans-serif" }}>
            <span
              className="fw-bold"
              style={{ color: "#7939FF", fontSize: "16px" }}>
              Talents
            </span>
            Space
          </h1>
          <div className={styles["right-bar"]}>
            <span style={{ color: "rgba(18, 18, 18, 0.6)" }}>
              Don't have Account?
            </span>
            <Link
              to={"/register"}
              style={{ color: "#7939FF", fontWeight: "700" }}>
              Apply Now
            </Link>
          </div>
        </nav> */}
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
          {/* <div
            className={`${styles["left-side"]} d-flex align-items-center justify-content-center`}>
            <div className={styles["form-parts"]}>
              <div className={styles["form-info"]}>
                <h1 className={styles["welcome-title"]}>Create new password</h1>
                <p
                  style={{
                    color: "#717171",
                    fontSize: "18px",
                  }}>
                  Your new password must be different from previous used
                  password
                </p>
              </div>
              <Form>
                <div className={styles["form-container"]}>
                  <Form.Group
                    className={`${styles["form-custom"]} mb-3 mt-4`}
                    controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <div className={styles["input-container"]}>
                      <FontAwesomeIcon className={styles.icon} icon={faLock} />
                      <Form.Control type="password" placeholder="Password" />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className={`${styles["form-custom"]} mb-3 mt-4`}
                    controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className={styles["input-container"]}>
                      <FontAwesomeIcon className={styles.icon} icon={faLock} />
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </Form.Group>

                  <Button
                    className={`${styles.submit} btn w-100`}
                    type="submit">
                    Change Password
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          <div className={styles["right-side"]}>
            <img
              src={require("../../../../Assets/Images/login.png")}
              alt="login-img"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
