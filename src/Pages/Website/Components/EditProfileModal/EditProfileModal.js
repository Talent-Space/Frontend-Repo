import React, { useEffect, useState } from "react";
import styles from "./EditProfileModal.module.css";
import { Axios } from "../../../../Api/Axios";
import { baseURL, USER } from "../../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFilePen } from "@fortawesome/free-solid-svg-icons";

export default function EditProfileModal({ isOpen, onClose, onSave }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    photo: "",
    date: "",
    id: "", 
    bio: "",
  });
  // const [userData, setUserData] = useState({ ...});
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // console.log(userData)

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
          date: data.date ? formatDate(data.date) : "", // Format date
          id: data.id || "", // Set the user ID
          bio: data.bio || "", // Set the user Bio
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.id) {
      setStatusMessage("User ID is missing. Cannot update profile.");
      setError(true);
      return;
    }

    onSave(userData);
    onClose();

    const formattedDate = formatDate(userData.date);
    const payload = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      date: formattedDate,
      gender: userData.gender,
      bio: userData.bio,
    };

    Axios.put(`${baseURL}/users/${userData.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Update successful:", response.data);
        setUserData((prev) => ({
          ...prev,
          ...response.data, // Update with the latest data from the server
          date: formatDate(response.data.date), // Format the returned date
        }));
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        if (error.response) {
          if (error.response.status === 405) {
            setStatusMessage(
              "Update failed: PUT method not supported. Contact administrator."
            );
          } else {
            setStatusMessage(
              `Update failed. Server says: ${error.response.data.message || "Check console for details"}`
            );
          }
        } else if (error.request) {
          setStatusMessage("Update failed: No response from server.");
        } else {
          setStatusMessage(`Update failed. Error: ${error.message}`);
        }
        setError(true);
      });
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
              position: "relative",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <FontAwesomeIcon
              icon={faCalendar}
              style={{
                position: "absolute",
                left: "12px",
                top: "75%",
                transform: "translateY(-50%)",
                color: "#666",
              }}
            />
            <div>
              <label>Birthday:</label>
              <input
                type="date"
                placeholder="Date"
                className={styles.input}
                style={{ paddingLeft: "2.5rem", width: "100%" }}
                value={userData.date}
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }));
                }}
              />
            </div>
          </div>

          <div style={{ 
            position: "relative", 
            width: "80%",
            marginTop: "10px"
            }}>
            <FontAwesomeIcon
              icon={faFilePen}
              style={{
                position: "absolute",
                left: "12px",
                top: "6px",
                color: "#666",
              }}
            />
            <textarea
              placeholder="Bio"
              className={styles.textarea}
              style={{ paddingLeft: "2.5rem", width: "100%", outline: "none" }}
              value={userData.bio}
              onChange={(e) => {
                setUserData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
            ></textarea>
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
                  value="Male"
                  style={{ width: "initial", margin: "5px", accentColor: "#7939FF" }}
                  checked={userData.gender === "Male"}
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
                  value="Female"
                  style={{ width: "initial", margin: "5px", accentColor: "#7939FF" }}
                  checked={userData.gender === "Female"}
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