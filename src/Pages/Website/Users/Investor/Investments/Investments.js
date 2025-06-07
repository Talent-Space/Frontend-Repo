import React from "react";
import { useEffect, useState } from "react";
import styles from "./investments.module.css";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import { OFFERS } from "../../../../../Api/Api";
import { Axios } from "../../../../../Api/Axios";
import Offer from "../../../../../Assets/svgs/offer.svg";
import ShowModalOffer from "../../../Components/ShowModalOffer/ShowModalOffer";

const Investments = () => {
  const defaultProfileImage = require("../../../../../Assets/Images/profile.jpg");

  const [offersData, setOffersData] = useState([]);
  const [showModalOffer, setShowModalOffer] = useState({
    status: false,
    offerData: null
  });

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
                  src={decodedImage ? decodedImage : defaultProfileImage}
                  alt="profile"
                  style={{ borderRadius: "50%", objectFit: "contain" }}
                />
                <span style={{ color: "#3d3d3d" }}>{offer.talent.name}</span>
              </div>
            </div>
          </div>
          
            <button onClick={() => setShowModalOffer({ status: true, offerData: offer })}>
              <img src={Offer} alt="Offer" style={{ objectFit: "contain" }} />
            </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <UserInfo />

      <div className={`${styles.second} shadow-lg`}>
        <h2>My Offers</h2>
        {mapOffers}
      </div>
      {showModalOffer.status && (
        <ShowModalOffer
          isOpen={showModalOffer.status}
          onClose={() => setShowModalOffer({ status: false, offerData: null })}
          offerData={showModalOffer.offerData}
        />
      )}
    </>
  );
};

export default Investments;
