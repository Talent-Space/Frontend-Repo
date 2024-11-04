import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./resetPassword.module.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../../../Components/Navbar/Navbar";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  // };

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

        {/* <h1>Login Page</h1> */}
        <div
          className={`${styles.welcome} d-flex align-items-center justify-content-center`}
          style={{ backgroundColor: "#F6F6F6" }}>
          <div
            className={`${styles["left-side"]} d-flex align-items-center justify-content-center`}>
            <div className={styles["form-parts"]}>
              <div className={styles["form-info"]}>
                <h1 className={styles["welcome-title"]}>Reset Password</h1>
                <p style={{ color: "#717171", fontSize: "18px" }}>
                  we well send an email with instructions to reset your password
                </p>
              </div>

              <Form>
                <div className={styles["form-container"]}>
                  <Form.Group
                    className={`${styles["form-custom"]} mb-3 mt-4`}
                    controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <div className={styles["input-container"]}>
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={faEnvelope}
                      />
                      <Form.Control
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Your Email"
                        isInvalid={formik.touched.email && formik.errors.email}
                        isValid={formik.touched.email && !formik.errors.email}
                      />
                    </div>
                    {formik.errors.email ? (
                      <div className="text-danger m-0">
                        {formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : null}
                      </div>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Button
                    className={`${styles.submit} btn w-100`}
                    type="submit">
                    Send Code
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          {/* Image */}
          <div className={styles["right-side"]}>
            <img
              src={require("../../../../Assets/Images/login.png")}
              alt="login-img"
            />
          </div>
        </div>
      </div>
    </>
  );
}
