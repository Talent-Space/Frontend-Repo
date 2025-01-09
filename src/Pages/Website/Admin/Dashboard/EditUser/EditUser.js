import { useEffect, useState } from "react";
import styles from "./edituser.module.css";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../../../Api/Axios";
import { USER, USERS } from "../../../../../Api/Api";

export default function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Id
  const id = Number(window.location.pathname.replace("/dashboard/users/", ""));

  useEffect(() => {
    Axios.get(`/${USERS}/${id}`).then((data) => {
      setName(data.data.name);
      setEmail(data.data.email);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(`${USERS}/${id}`, {
        name: name,
        email: email,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={`${styles.user} bg-white mt-2`}>
        <h1>Edit User Page:</h1>
        <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Button className="btn btn-primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}
