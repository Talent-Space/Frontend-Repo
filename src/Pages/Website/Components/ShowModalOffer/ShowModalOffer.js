import React from "react";
import styles from "./showModalOffer.module.css";

export default function ShowModalOffer({ isOpen, onClose, offerData }) {
  if (!isOpen || !offerData) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2>Show Offer</h2>
        <div>
          <div className="mt-2 mb-2">
            <input
              placeholder="Subject"
              type="text"
              name="title"
              value={offerData.title}
              disabled
              className="w-100"
            />
          </div>
          <div
            className="mt-2 mb-2"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <label>Offer Details</label>
            <textarea
              placeholder="Write Offer Details.."
              rows={12}
              type="text"
              name="notes"
              value={offerData.notes}
              disabled
            />
          </div>

          <div className="d-flex align-items-center justify-content-center gap-4">
            <label>Amount</label>
            <input
              placeholder="Amount"
              type="text"
              name="amount"
              value={offerData.amount}
              disabled
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
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
