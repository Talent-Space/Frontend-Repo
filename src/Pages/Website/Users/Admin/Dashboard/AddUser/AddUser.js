import styles from "./adduser.module.css";
import {  useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../../../../Api/Axios";
import { baseURL, USERS } from "../../../../../../Api/Api";
import Loading from "../../../../../../Components/Loading/Loading";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`/users`, { // => Doesn't Work
        name: name,
        email: email,
        password: password,
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
      <div className={`${styles.user} bg-white mt-2`}>
        <h1>Edit User Page:</h1>
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

          <Form.Group className="mb-3" controlId="formBasicSelect">
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
    </>
  );
}
