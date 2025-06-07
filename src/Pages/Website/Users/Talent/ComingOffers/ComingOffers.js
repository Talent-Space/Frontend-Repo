import React, { useEffect, useState } from "react";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import { Axios } from "../../../../../Api/Axios";
import { OFFERS } from "../../../../../Api/Api";
import styles from "./comingOffers.module.css";

const ComingOffers = () => {
  const [comingOffers, setComingOffers] = useState([]);

  useEffect(() => {
    const getComingOffers = async () => {
      try {
        const res = await Axios.get(`/${OFFERS}/received`);
        setComingOffers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComingOffers();
  }, []);

  const handleAccept = async (offerId) => {
    try {
      await Axios.post(`/${OFFERS}/${offerId}/respond`, {
        decision: "accept",
      });
      // Refresh the offers list after accepting
      const res = await Axios.get(`/${OFFERS}/received`);
      setComingOffers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (offerId) => {
    try {
      await Axios.post(`/${OFFERS}/${offerId}/respond`, {
        decision: "reject",
      });
      // Refresh the offers list after rejecting
      const res = await Axios.get(`/${OFFERS}/received`);
      setComingOffers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UserInfo />
      <div className="container">
        <h1 className={styles.title}>Coming Offers</h1>
        <div className={styles.offersGrid}>
          {comingOffers.map((offer) => (
            <div key={offer.id} className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <h2>Offer from {offer.investor?.name}</h2>
                <span
                  className={`${styles.statusBadge} ${
                    styles[offer.status.toLowerCase()]
                  }`}
                >
                  {offer.status === "pendingAdminApproval"
                    ? "Offer Pending By Admin"
                    : offer.status === "adminAccepted"
                    ? "Admin Accepted Offer"
                    : offer.status === "adminRejected"
                    ? "Admin Rejected Offer"
                    : "another"}
                </span>
              </div>

              <div className={styles.offerDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Amount:</span>
                  <span className={styles.value}>${offer.amount}</span>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.label}>Notes:</span>
                  <p className={styles.value}>{offer.notes}</p>
                </div>

                <div className={styles.investorInfo}>
                  <h3>Investor Information</h3>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Name:</span>
                    <span className={styles.value}>{offer.investor?.name}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.value}>
                      {offer.investor?.email}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Phone:</span>
                    <span className={styles.value}>
                      {offer.investor?.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.offerActions}>
                <button
                  className={styles.acceptBtn}
                  onClick={() => handleAccept(offer.id)}
                  disabled={offer.status !== "adminAccepted"}
                >
                  Accept
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => handleReject(offer.id)}
                  disabled={offer.status !== "adminAccepted"}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComingOffers;
