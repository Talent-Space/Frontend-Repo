import { useEffect, useState } from "react";
import styles from "./edituser.module.css";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../../../Api/Axios";
import { USER, USERS } from "../../../../../Api/Api";
import Loading from "../../../../../Components/Loading/Loading";

export default function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  // Id
  const id = Number(window.location.pathname.replace("/dashboard/users/", ""));

  useEffect(() => {
    Axios.get(`/${USERS}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
      })
      .then(() => setDisable(false));
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.put(`${USERS}/${id}`, {
        name: name,
        email: email,
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

          <Button disabled={disable} className="btn btn-primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}
