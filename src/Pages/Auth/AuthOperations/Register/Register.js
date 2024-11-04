import styles from "./register.module.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../../../Components/Navbar/Navbar";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      confirmPassword: "",
    },
    validationSchema: registerSchema,
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
      <div className={styles.register}>
        {/* Navbar */}
        <Navbar showRightBar={false} />

        {/* <h1>Login Page</h1> */}
        <div
          className={`${styles.welcome} d-flex align-items-center justify-content-evenly`}
          style={{ backgroundColor: "#F6F6F6" }}>
          <div
            className={`${styles["left-side"]} d-flex align-items-center justify-content-center`}>
            <div className={styles["form-parts"]}>
              <h1 className={styles["form-title"]}>
                Hello! Register to get started
              </h1>

              <Form onSubmit={formik.handleSubmit}>
                <div className={styles["form-container"]}>
                  <Form.Group
                    className={`${styles["form-custom"]} mt-3`}
                    controlId="name">
                    <div className={styles["input-container"]}>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="UserName"
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
                    controlId="formBasicEmail">
                    <div className={styles["input-container"]}>
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
                    <div className={styles["input-container"]}>
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
                    {/* <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback> */}
                  </Form.Group>

                  <Form.Group
                    className={`${styles["form-custom"]} mt-3`}
                    controlId="formBasicConfirmPassword">
                    <div className={styles["input-container"]}>
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
                    className={`${styles.submit} btn w-100 mt-4`}
                    type="submit">
                    Register
                  </Button>

                  <div className={styles.social}>
                    <span className={styles["social-info"]}>
                      Or Register With
                    </span>
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
