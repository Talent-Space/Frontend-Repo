import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./login.module.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../../../Components/Navbar/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
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
          className={`${styles.welcome} d-flex align-items-center justify-content-evenly`}
          style={{ backgroundColor: "#F6F6F6" }}>
          <div
            className={`${styles["left-side"]} d-flex align-items-center justify-content-center`}>
            <div className={styles["form-parts"]}>
              <h1 className={styles["welcome-title"]}>
                Welcome to
                <span
                  className={styles["spacific-logo"]}
                  style={{ color: "#7939FF" }}>
                  Talents
                </span>
                Space
              </h1>
              <p style={{ color: "#717171", fontSize: "18px" }}>
                with{" "}
                <span style={{ color: "black", fontWeight: "bold" }}>
                  TalentSpace
                </span>{" "}
                Here you can share your talent and we will help you get
                acquainted.
              </p>

              <Form onSubmit={formik.handleSubmit}>
                <div className={styles["form-container"]}>
                  <Form.Group
                    className={`${styles["form-custom"]} mt-3`}
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

                  <Form.Group
                    className={`${styles["form-custom"]} mt-3`}
                    controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className={styles["input-container"]}>
                      <FontAwesomeIcon className={styles.icon} icon={faLock} />
                      <Form.Control
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Password"
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                        isValid={
                          formik.touched.password && !formik.errors.password
                        }
                      />
                    </div>
                    {formik.errors.password ? (
                      <div className="text-danger m-0">
                        {formik.touched.password && formik.errors.password
                          ? formik.errors.password
                          : null}
                      </div>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Link
                    to={"/resetPassword"}
                    className={`${styles.forget} mt-2 mb-4`}
                    style={{
                      display: "block",
                      color: "#6A707C",
                      fontSize: "12px",
                    }}>
                    Forgot Password
                  </Link>

                  <Button
                    className={`${styles.submit} btn w-100 mt-2`}
                    type="submit">
                    Login
                  </Button>

                  <div className={styles.social}>
                    <span className={styles["social-info"]}>Or Login With</span>
                    <div className="d-flex align-items-center justify-content-center gap-5">
                      <Link
                        className={`${styles["social-login"]} d-flex align-items-center- justify-content-center`}>
                        <img
                          // width={"50px"}
                          src={require("../../../../Assets/Images/facebook.png")}
                          alt="facebook"
                        />
                      </Link>
                      <Link
                        className={`${styles["social-login"]} d-flex align-items-center- justify-content-center`}>
                        <img
                          // width={"50px"}
                          src={require("../../../../Assets/Images/google.png")}
                          alt="google"
                        />
                      </Link>
                    </div>
                  </div>
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
