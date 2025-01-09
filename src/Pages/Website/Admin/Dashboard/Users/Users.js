import styles from "./users.module.css";
import { useEffect, useState } from "react";
import { USER, USERS } from "../../../../../Api/Api";
import Cookie from "cookie-universal";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Axios } from "../../../../../Api/Axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const cookie = Cookie();

  // Get Current User
  useEffect(() => {
    Axios.get(`/${USER}`)
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
    Axios.get(`/${USERS}`)
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
      const res = await Axios.delete(`/${USERS}/${id}`);
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
            <Link to={`${user.id}`}>
              <FontAwesomeIcon
                fontSize={"19px"}
                // color="blue"
                icon={faPenToSquare}
              />
            </Link>
            {currentUser.name !== user.name &&
            currentUser.role !== user.role ? (
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
      <div className={`${styles.users} bg-white mt-2`}>
        <h1>Users Page</h1>
        <Table striped bordered hover className="p-3 mt-2">
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
