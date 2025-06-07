import React, { useEffect, useState } from "react";
import styles from "./sendOfferModal.module.css";
import { Axios } from "../../../../Api/Axios";
import { baseURL, OFFER, USER } from "../../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFilePen } from "@fortawesome/free-solid-svg-icons";

export default function SendOfferModal({ isOpen, onClose, onSave, talentId }) {
  const [userData, setUserData] = useState({
    title: "",
    amount: "",
    notes: "",
    // talentName: "",
    // subject: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(userData);
    onClose();

    const payload = {
      title: userData.title,
      amount: Number(userData.amount),
      notes: userData.notes,
      talent_id: talentId,
    };

    console.log("Payload" + payload);

    try {
      const res = await Axios.post(`/${OFFER}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setUserData({
        title: "",
        amount: "",
        notes: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(userData);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2>Send Offer</h2>
        <form onSubmit={handleSubmit}>
          <div
            className="mt-2 mb-2"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <input
              placeholder="Subject"
              type="text"
              name="title"
              value={userData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div
            className="mt-2 mb-2"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <label>Offer Details</label>
            <textarea
              placeholder="Write Offer Details.."
              rows={12}
              type="text"
              name="notes"
              value={userData.notes}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex align-items-center justify-content-center gap-4">
            <label>Amount</label>
            <input
              placeholder="Amount"
              type="text"
              name="amount"
              value={userData.amount}
              onChange={handleChange}
              required
              style={{ width: "20%", textAlign: "center" }}
            />
            <span style={{ fontWeight: "bold" }}>Per</span>
            <input
              placeholder="Month"
              type="text"
              disabled
              style={{ width: "20%", textAlign: "center" }}
            />
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
