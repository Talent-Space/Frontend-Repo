import { useEffect, useState } from "react";
import styles from "./peopleInvestination.module.css";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import { OFFERS, USER } from "../../../../../Api/Api";
import { Axios } from "../../../../../Api/Axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RHgyIP4KE97EU0Rnp35ejhd2isQhpE6pBsxsdtzUKnlwTwtxVFtX3VpQkmIesCGcoUBCSc24rHURSr9NY3eHmRX003M7Pcj8l"
); // Replace with your Stripe publishable key

export default function InvestorProfile() {
  const defaultProfileImage = require("../../../../../Assets/Images/profile.jpg");

  const [offersData, setOffersData] = useState([]);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const res = await Axios.get(`${OFFERS}/sent`);
        setOffersData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOffers();
  }, []);

  const handlePayment = async (offer) => {
    try {
      // Create a checkout session
      const response = await Axios.post(
        `${OFFERS}/${offer.id}/create-payment-session`,
        {
          amount: offer.amount,
          offer_id: offer.id,
        }
      );

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error creating payment session:", error);
    }
  };

  // console.log(offersData);

  const mapOffers = offersData.map((offer) => {
    const decodedImage = `data:image/jpeg;base64,${offer.talent.profilePicture}`;
    return (
      <div key={offer.id} className={`${styles.card} card shadow-lg mb-4`}>
        <div
          className={`${styles.cardBody} card-body d-flex align-items-center justify-content-between gap-5 p-relative`}
        >
          <div style={{ width: "100%" }}>
            <div>
              <div className="d-flex align-items-center gap-4">
                <img
                  width={80}
                  height={80}
                  src={
                    offer.talent.profilePicture
                      ? decodedImage
                      : defaultProfileImage
                  }
                  alt="profile"
                  style={{ borderRadius: "50%", objectFit: "contain" }}
                />
                <span style={{ color: "#3d3d3d" }}>{offer.talent.name}</span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <p
              className={`badge m-0 ${
                offer.status === "pendingAdminApproval"
                  ? "text-bg-warning"
                  : offer.status === "adminAccepted"
                  ? "text-bg-success"
                  : offer.status === "adminRejected"
                  ? "text-bg-danger"
                  : "text-bg-secondary"
              }`}
            >
              {offer.status === "pendingAdminApproval"
                ? "Offer Pending By Admin"
                : offer.status === "adminAccepted"
                ? "Offer Accepted By Admin"
                : offer.status === "adminRejected"
                ? "Offer Rejected By Admin"
                : "another"}
            </p>
            {offer.status === "adminAccepted" && !offer.is_paid && (
              <button
                onClick={() => handlePayment(offer)}
                className="btn btn-primary"
                style={{ backgroundColor: "#7939FF", width: "100px" }}
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <UserInfo />

      <div className={`${styles.second} shadow-lg`}>
        <h2>People Investination</h2>
        {mapOffers}
      </div>
    </>
  );
}
