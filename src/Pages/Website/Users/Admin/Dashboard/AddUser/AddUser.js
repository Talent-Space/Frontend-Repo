import styles from "./adduser.module.css";
import {  useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../../../../Api/Axios";
import Loading from "../../../../../../Components/Loading/Loading";
import { USERS } from "../../../../../../Api/Api";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`/${USERS}`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        gender: gender,
        role: role,
      });
      setLoading(false);
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className={`${styles.rightSide} bg-white mt-2`}>
      <div className={`${styles.user} bg-white mt-2`}>
        <h1>Add User Page:</h1>
        <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSelectGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option disabled value={""}>
                Select Gender
              </option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSelectRole">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option disabled value={""}>
                Select Role
              </option>
              <option value={"Admin"}>Admin</option>
              <option value={"Mentor"}>Mentor</option>
              <option value={"Talent"}>Talent</option>
              <option value={"Investor"}>Investor</option>
            </Form.Select>
          </Form.Group>

          <Button className="btn btn-primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
      </div>
    </>
  );
}
