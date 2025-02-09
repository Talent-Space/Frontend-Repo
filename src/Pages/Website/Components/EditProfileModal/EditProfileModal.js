import React, { useEffect, useState } from "react";
import styles from "./EditProfileModal.module.css";
import { Axios } from "../../../../Api/Axios";
import { USER } from "../../../../Api/Api";

export default function EditProfileModal({ isOpen, onClose, onSave }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    photo: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get(`/${USER}`);
        const data = response.data;
        setUserData({
          name: data.name || "",
          email: data.email || "",
          password: data.password || "",
          phone: data.phone || "",
          gender: data.gender || "",
          photo: data.photo || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <label>Gender:</label>
            <div className="d-flex align-items-center justify-content-evenly">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  style={{ width: "initial", margin: "5px", accentColor: "#7939FF" }}
                  checked={userData.gender === "male"}
                  onChange={handleChange}
                  required
                />
                <label style={{ display: "inline" }} htmlFor="male">
                  Male
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  style={{ width: "initial", margin: "5px", accentColor: "#7939FF" }}
                  checked={userData.gender === "female"}
                  onChange={handleChange}
                  required
                />
                <label style={{ display: "inline" }} htmlFor="female">
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
