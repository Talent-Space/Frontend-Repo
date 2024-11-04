import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./newPassword.module.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../../../Components/Navbar/Navbar";

export default function NewPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(4, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Password doesn't match"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: NewPasswordSchema,
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


        {/* <h1>Reset Page</h1> */}
        <div
          className={`${styles.welcome} d-flex align-items-center justify-content-center`}
          style={{ backgroundColor: "#F6F6F6" }}>
          <div
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

                  <Form.Group
                    className={`${styles["form-custom"]} mb-3 mt-4`}
                    controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className={styles["input-container"]}>
                      <FontAwesomeIcon className={styles.icon} icon={faLock} />
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Confirm Password"
                        isInvalid={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                        }
                        isValid={
                          formik.touched.confirmPassword &&
                          !formik.errors.confirmPassword
                        }
                      />
                    </div>
                    {formik.errors.confirmPassword ? (
                      <div className="text-danger m-0">
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? formik.errors.confirmPassword
                          : null}
                      </div>
                    ) : (
                      ""
                    )}
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
          </div>
        </div>
      </div>
    </>
  );
}
