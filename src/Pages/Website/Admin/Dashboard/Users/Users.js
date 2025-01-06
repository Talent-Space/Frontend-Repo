import styles from "./users.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { USERS, baseURL } from "../../../../../Api/Api";
import Cookie from "cookie-universal";
import { Table } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState([]);
  const cookie = Cookie();

  useEffect(() => {
    axios
      .get(`${baseURL}/${USERS}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("talent-space")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const usersShow = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  ));

  return (
    <>
      <div className={`${styles.users} bg-white`}>
        <h1>Users Page</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{usersShow}</tbody>
        </Table>
      </div>
    </>
  );
}
