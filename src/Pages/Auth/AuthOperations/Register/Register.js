import styles from "./register.module.css";
import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../../../Components/Navbar/Navbar";
import { ReactComponent as LoginImg } from "../../../../Assets/svgs/Login.svg";
import axios from "axios";
import { REGISTER, baseURL } from "../../../../Api/Api";
import Loading from "../../../../Components/Loading/Loading";
import Cookie from "cookie-universal";

export default function Register() {
  // States
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

  // console.log(form);
  
  const registerSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, "Too Short!")
    .max(40, "Too Long!")
    .required("Name is Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,15}$/,
        "Password Must start with upperCase and any char from 5 to 15"
      )
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is Required"),
      confirmPassword: Yup.string()
      .required("Please Retype Password")
      .oneOf([Yup.ref("password")], "Password doesn't match"),
    });

    const formik = useFormik({
      initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      gender: "",
      role: "",
    },
    validationSchema: registerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    
    onSubmit: (values) => {},
  });
  // console.log(formik.values);

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
      const res = await axios.post(`${baseURL}/${REGISTER}`, formik.values);
      setLoading(false);
      const token = res.data.Token;
      // console.log(token);
      cookie.set("talent-space", token);
      window.location.pathname = "/";
      // console.log("Success");
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      if (err.response.status === 422) {
        setError(err.response.data.message);
      } else {
        setError("Internal Server Error");
      }
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className={styles.register}>
        {/* Navbar */}
        <Navbar showRightBar={false} />
        {/* <h1>Login Page</h1> */}
        <div
          className={`${styles.welcome} d-flex align-items-center justify-content-evenly`}
          style={{ backgroundColor: "#F6F6F6" }}
        >
          <div
            className={`${styles["left-side"]} d-flex align-items-center justify-content-center`}
          >
            <div className={styles["form-parts"]}>
              <h1 className={styles["form-title"]}>
                Hello! Register to get started
              </h1>

              <Form onSubmit={handleSubmit}>
                <div className={styles["form-container"]}>
                  <Form.Group
                    className={`${styles["form-custom"]} mt-3`}
                    controlId="name"
                  >
                    <div className={styles["input-container"]}>
                      <Form.Control
                        type="text"
                        name="name"
                        required
                        value={formik.values.name}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="User Name"
                        isInvalid={formik.touched.name && formik.errors.name}
                        isValid={formik.touched.name && !formik.errors.name}
                      />
                    </div>

                    {formik.errors.name ? (
                      <div className="text-danger m-0">
                        {formik.touched.name && formik.errors.name
                          ? formik.errors.name
                          : null}
                      </div>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group
                    className={`${styles["form-custom"]} mt-3`}
                    controlId="formBasicEmail"
                  >
                    <div className={styles["input-container"]}>
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
                    <div className={styles["input-container"]}>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        autoComplete="true"
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
                    {/* <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback> */}
                  </Form.Group>

                  <Form.Group
                    className={`${styles["form-custom"]} mt-3`}
                    controlId="formBasicConfirmPassword"
                  >
                    <div className={styles["input-container"]}>
                      <Form.Control
                        type="password"
                        name="password_confirmation"
                        required
                        autoComplete="true"
                        value={formik.values.password_confirmation}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Confirm Password"
                        isInvalid={
                          formik.touched.password_confirmation &&
                          formik.errors.password_confirmation
                        }
                        isValid={
                          formik.touched.password_confirmation &&
                          !formik.errors.password_confirmation
                        }
                      />
                    </div>
                    {formik.errors.password_confirmation ? (
                      <div className="text-danger m-0">
                        {formik.touched.password_confirmation &&
                        formik.errors.password_confirmation
                          ? formik.errors.password_confirmation
                          : null}
                      </div>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <DropdownButton
                    id="dropdown-item-button"
                    title={formik.values.role || "Select Your Role"}
                    className="mt-3"
                    variant="white"
                    color="white"
                    style={{
                      backgroundColor: "#EBEBEB",
                      border: "none",
                      width: "150px",
                      borderRadius: "6px",
                    }}
                  >
                    <Dropdown.ItemText
                      style={{
                        backgroundColor: "#7939FF",
                        color: "white",
                      }}
                    >
                      Our Roles
                    </Dropdown.ItemText>
                    <Dropdown.Item
                      as="button"
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => formik.setFieldValue('role', 'Talent')}
                    >
                      Talent
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => formik.setFieldValue('role', 'Mentor')}
                    >
                      Mentor
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => formik.setFieldValue('role', 'Investor')}
                    >
                      Investor
                    </Dropdown.Item>
                  </DropdownButton>

                  <div className={styles.buttonWrap}>
                    <p className="mt-2">Select Gender:</p>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        checked={formik.values.gender === "Male"}
                        onChange={() => formik.setFieldValue("gender", "Male")}
                        className={styles.hidden}
                      />
                      <label 
                        htmlFor="male" 
                        className={`${styles.buttonLabel} ${formik.values.gender === "male" ? styles.selected : ""}`}
                      >
                        <h1>Male</h1>
                      </label>

                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        checked={formik.values.gender === "female"}
                        onChange={() => formik.setFieldValue("gender", "Female")}
                        className={styles.hidden}
                      />
                      <label 
                        htmlFor="female" 
                        className={`${styles.buttonLabel} ${formik.values.gender === "female" ? styles.selected : ""}`}
                      >
                        <h1>Female</h1>
                      </label>
                    </div>
                  </div>

                  <Button
                    className={`${styles.submit} btn w-100 mt-4`}
                    type="submit"
                  >
                    Register
                  </Button>

                  {error != "" ? (
                    <span className="text-danger">{error}</span>
                  ) : (
                    ""
                  )}

                  <div className={styles.social}>
                    <span className={styles["social-info"]}>
                      Or Register With
                    </span>
                    <div className="d-flex align-items-center justify-content-center gap-5">
                      <Link
                        className={`${styles["social-login"]} d-flex align-items-center- justify-content-center`}
                      >
                        <img
                          // width={"50px"}
                          src={require("../../../../Assets/Images/facebook.png")}
                          alt="facebook"
                        />
                      </Link>
                      <Link
                        className={`${styles["social-login"]} d-flex align-items-center- justify-content-center`}
                      >
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

          <div className={styles["right-side"]}>
            <LoginImg />
          </div>
        </div>
      </div>
    </>
  );
}
