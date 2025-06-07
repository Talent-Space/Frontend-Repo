import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./login.module.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../../../Components/Navbar/Navbar";
import { ReactComponent as LoginImg } from "../../../../Assets/svgs/Login.svg";
import Loading from "../../../../Components/Loading/Loading";
import { LOGIN, baseURL } from "../../../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Cookies
  const cookie = Cookie();

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

    onSubmit: (values) => { },
  });

  const handleChange = (e) => {
    // e.preventDefault();
    formik.handleChange(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: formik.values.email,
        password: formik.values.password,
      });
      setLoading(false);
      const token = res.data.Token;
      const role = res.data.User.role;
      const go = role === "Admin" ? "/dashboard/users" : role === "Investor" ? "/homeInvestor" : "/home";
      cookie.set("talent-space", token);
      window.location.pathname = `${go}`;
      // console.log(res);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        setError(err.response.data.Message);
      } else {
        setError("Internal Server Error");
      }
    }
  };

  const navigate = useNavigate();

  // Handle Google Sign-In success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse; 
      console.log("Google Credential:", credential); 

      const resDecoded = jwtDecode(credential);
      console.log("Google Credential Decoded:", resDecoded);

      const response = await axios.get(
        `${baseURL}/auth/google?token=${encodeURIComponent(credential)}`,
        {
          withCredentials: true,
          timeout: 10000, 
        }
      );

      const { token, user } = response.data;
      console.log("Backend Response:", response.data);

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    } catch (err) {
      setError("Google Sign-In failed. Please check your network or try again later.");
      console.error("Google Sign-In Error:", err);

      if (err.code === "ERR_NETWORK") {
        console.error("Network Error Details:", {
          message: err.message,
          url: err.config.url,
          method: err.config.method,
        });
      } else if (err.response) {
        console.error("Backend Error Response:", err.response.data);
        setError(`Google Sign-In failed: ${err.response.data.message || "Server error"}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("Google Sign-In failed: No response from server.");
      } else {
        console.error("Error setting up request:", err.message);
        setError(`Google Sign-In failed: ${err.message}`);
      }
    }
  };

  // Handle Google Sign-In failure
  const handleGoogleFailure = (error) => {
    setError("Google Sign-In failed: " + (error?.details || "Unknown error"));
    console.error("Google Sign-In Failure:", error);
  };



  return (
    <>
      {loading ? <Loading /> : ""}
      <div className={styles.login}>
        {/* Navbar */}
        <Navbar showRightBar={true} />
        {/* Login Page */}
        <div
          className={`${styles.welcome} d-flex align-items-center justify-content-evenly`}
          style={{ backgroundColor: "#F6F6F6" }}
        >
          <div
            className={`${styles["left-side"]} d-flex align-items-center justify-content-center`}
          >
            <div className={styles["form-parts"]}>
              <h1 className={styles["welcome-title"]}>
                Welcome to
                <span
                  className={styles["spacific-logo"]}
                  style={{ color: "#7939FF" }}
                >
                  Talents
                </span>
                Space
              </h1>
              <p
                style={{
                  color: "#717171",
                  fontSize: "18px",
                  marginTop: "15px",
                }}
              >
                with{" "}
                <span style={{ color: "black", fontWeight: "bold" }}>
                  TalentSpace
                </span>{" "}
                Here you can share your talent and we will help you get
                acquainted.
              </p>

              <Form onSubmit={handleSubmit}>
                <div className={styles["form-container"]}>
                  <Form.Group
                    className={`${styles["form-custom"]} mt-3`}
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Email</Form.Label>
                    <div className={styles["input-container"]}>
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={faEnvelope}
                      />
                      <Form.Control
                        type="email"
                        name="email"
                        required
                        value={formik.values.email}
                        onChange={handleChange}
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
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Password</Form.Label>
                    <div className={styles["input-container"]}>
                      <FontAwesomeIcon className={styles.icon} icon={faLock} />
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formik.values.password}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Password"
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                        isValid={
                          formik.touched.password && !formik.errors.password
                        }
                      />
                      <FontAwesomeIcon
                        className={styles["eye-icon"]}
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          cursor: "pointer",
                          right: "10px",
                          position: "absolute",
                        }}
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
                    }}
                  >
                    Forgot Password
                  </Link>

                  <Button
                    className={`${styles.submit} btn w-100 mt-2`}
                    type="submit"
                  >
                    Login
                  </Button>

                  {error != "" ? (
                    <span className="text-danger">{error}</span>
                  ) : (
                    ""
                  )}

                  <div className={styles.social}>
                    <div className={styles.loginContainer}>
                      {error && <p className={styles.error}>{error}</p>}

                      <div className={styles.buttonContainer}>
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleFailure}
                          text="signin_with"
                          shape="circle"
                          theme="outline"
                          size="large"
                          ux_mode="popup"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>

          {/* Image */}
          <div className={styles["right-side"]}>
            <LoginImg />
          </div>
        </div>
      </div>
    </>
  );
}
