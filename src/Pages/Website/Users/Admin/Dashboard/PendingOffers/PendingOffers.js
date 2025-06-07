import React, { useEffect, useState } from "react";
import styles from "./pendingOffers.module.css";
import { OFFERS } from "../../../../../../Api/Api";
import { Axios } from "../../../../../../Api/Axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PendingOffers = () => {
  const [pendingOffersData, setPendingOffersData] = useState([]);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const res = await Axios.get(`/admin/${OFFERS}/pending`);
        setPendingOffersData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOffers();
  }, []);

  const handleAccept = async (offerId) => {
    try {
      const resAccept = await Axios.post(`/admin/${OFFERS}/${offerId}/decide`, {
        decision: "approve",
      });
      // Refresh the offers list after accepting
      const res = await Axios.get(`/admin/${OFFERS}/pending`);
      setPendingOffersData(res.data.data);
      console.log("Offer accepted:" + resAccept);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (offerId) => {
    try {
      const resReject = await Axios.post(`/admin/${OFFERS}/${offerId}/decide`, {
        decision: "reject",
      });
      // Refresh the offers list after rejecting
      const res = await Axios.get(`/admin/${OFFERS}/pending`);
      setPendingOffersData(res.data.data);
      console.log("Offer Rejected:" + resReject);
    } catch (error) {
      console.log(error);
    }
  };

  const mapPendingOffers = pendingOffersData.map((offer) => (
    <tr key={offer.id}>
      <td>
        <div className="d-flex align-items-center gap-2">
          {/* <img
            src={
              offer.investor.profilePicture
                ? `data:image/jpeg;base64,${offer.investor.profilePicture}`
                : require("../../../../../../Assets/Images/profile.jpg")
            }
            alt="investor"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          /> */}
          <div style={{ fontSize: "20px" }}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span>{offer.investor.name}</span>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          {/* <img
            src={
              offer.talent.profilePicture
                ? `data:image/jpeg;base64,${offer.talent.profilePicture}`
                : require("../../../../../../Assets/Images/profile.jpg")
            }
            alt="talent"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          /> */}
          <div style={{ fontSize: "20px" }}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span style={{ textTransform: "capitalize" }}>
            {offer.talent.name}
          </span>
        </div>
      </td>
      <td>${offer.amount}/month</td>
      <td
        style={{
          maxWidth: "200px",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        {offer.notes}
      </td>
      <td>
        <span className="badge bg-warning text-dark">{offer.status}</span>
      </td>
      <td>
        <div className="d-flex gap-2">
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleAccept(offer.id)}
          >
            Accept
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleReject(offer.id)}
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className={`${styles.rightSide} bg-white mt-2`}>
      <h1>Pending Offers</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Investor</th>
              <th>Talent</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mapPendingOffers.length > 0 ? (
              mapPendingOffers
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No pending offers
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOffers;
