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
import ReactFacebookLogin from "react-facebook-login";

export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

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
      const go = role === "Admin" ? "/dashboard/users" : role === "Investor" ? "/homeInvestor" : "/";
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
      const { credential } = credentialResponse; // Google ID token
      console.log("Google Credential:", credential); // Debug: Log the credential
      // Send the ID token to your backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/google`,
        { token: credential },
        { withCredentials: true }
      );

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError("Google Sign-In failed. Please try again.");
      console.error("Google Sign-In Error:", err);
    }
  };

  // Handle Google Sign-In failure
  const handleGoogleFailure = (error) => {
    setError("Google Sign-In failed: " + (error?.details || "Unknown error"));
    console.error("Google Sign-In Failure:", error);
  };

  // Handle Facebook Sign-In response
  const handleFacebookResponse = async (response) => {
    if (response.status === "unknown") {
      setError("Facebook Sign-In failed. Please try again.");
      return;
    }

    try {
      const { accessToken } = response;
      const apiResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/facebook`,
        { accessToken },
        { withCredentials: true }
      );

      const { token, user } = apiResponse.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError("Facebook Sign-In failed. Please try again.");
      console.error("Facebook Sign-In Error:", err);
    }
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
                          ux_mode="popup" // Ensure popup mode is used
                        />

                        <ReactFacebookLogin
                          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                          fields="name,email,picture"
                          callback={handleFacebookResponse}
                          cssClass={styles.facebookButton}
                          textButton="Sign in with Facebook"
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
