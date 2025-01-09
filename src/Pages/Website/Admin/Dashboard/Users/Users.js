import styles from "./users.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { USER, USERS, baseURL } from "../../../../../Api/Api";
import Cookie from "cookie-universal";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const cookie = Cookie();

  // Get Current User
  useEffect(() => {
    axios
      .get(`${baseURL}/${USER}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("talent-space")}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(users)

  // Get All Users
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

  // Delete User
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`${baseURL}/${USERS}/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("talent-space")}`,
        },
      });
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const usersShow = users
    .sort((a, b) => a.role.localeCompare(b.role))
    .map((user, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td className="text-center">{user.name}</td>
        <td className="text-center">{user.email}</td>
        <td className="text-center">{user.role}</td>
        <td style={{ textAlign: "center" }}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <Link to={"/"}>
              <FontAwesomeIcon
                fontSize={"19px"}
                // color="blue" 
                icon={faPenToSquare}
              />
            </Link>
            {currentUser.name !== user.name && currentUser.role !== user.role ? (
              <FontAwesomeIcon
                onClick={() => handleDelete(user.id)}
                fontSize={"19px"}
                color="red"
                icon={faTrash}
                cursor={"pointer"}
              />
            ) : (
              ""
            )}
          </div>
        </td>
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
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>{usersShow}</tbody>
        </Table>
      </div>
    </>
  );
}
