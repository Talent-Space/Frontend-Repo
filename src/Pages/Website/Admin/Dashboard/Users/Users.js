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
  // States
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [noUsers, setNoUsers] = useState(false);
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

  // console.log(currentUser);

  // Get All Users
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((res) => {
        setUsers(res.data);
      })
      .then(() => setNoUsers(true))
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

  // Mapping for All Users
  const usersFilter = users.filter((user) => user.id !== currentUser.id);
  const usersShow = usersFilter
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
      <div className={`${styles.rightSide} bg-white mt-2`}>
        <div className="d-flex align-items-center justify-content-between">
          <h1>Users Page</h1>
          <Link className="btn btn-primary" to={"/dashboard/user/add-user"}>Add User</Link>
        </div>
        <div className={`${styles.users}`}>
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
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : usersShow.length <= 1 && noUsers ? (
                <tr>
                  <td colSpan={12} className="text-center">
                    No Users Found
                  </td>
                </tr>
              ) : (
                usersShow
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
