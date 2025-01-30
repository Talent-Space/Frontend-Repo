import { useEffect, useState } from "react";
import styles from "./edituser.module.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../../../../Api/Axios";
import { USERS } from "../../../../../../Api/Api";
import Loading from "../../../../../../Components/Loading/Loading";

export default function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Id
  const id = Number(window.location.pathname.replace("/dashboard/users/", ""));

  // Get Data To Display
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => {
        navigate("/dashboard/users/page/404", { replace: true });
      });
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.put(`${USERS}/${id}`, {
        name: name,
        email: email,
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

          <Button disabled={disable} className="btn btn-primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}
