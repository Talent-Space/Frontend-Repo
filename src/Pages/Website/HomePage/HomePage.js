import styles from "./homePage.module.css";
import WebsiteNavbar from "../Components/WebsiteNavbar/WebsiteNavbar";
import { ReactComponent as Landing } from "../../../Assets/svgs/landing.svg";
import Gallery from "../Components/Gallery/Gallery";
// import { useState } from "react";

export default function HomePage({ bestTalents=null }) {

  let bestTalentsMapping = null;
  if (bestTalents) {
    bestTalentsMapping = bestTalents.map((talent) => {
      // Function to convert Base64 to data URL
      const getDataUrl = (base64String, mimeType = "image/jpeg") => {
        if (!base64String) return ""; // Return empty string if no Base64 string
        return `data:${mimeType};base64,${base64String}`;
      };

      // Decode the Base64 profile picture
      const profilePictureUrl = getDataUrl(talent.profilePicture, talent.mimeType);

      return (
        talent.profilePicture && talent.role === "Talent" ? <div key={talent.id} className={`${styles.talentCard} col-3`}>
          <img
            src={profilePictureUrl}
            alt={`${talent.name}'s profile`}
            className={`${styles.profilePicture}`}
          />
          <h3>{talent.name}</h3>
          <p>{talent.role}</p>
        </div> : ""
      );
    });
  }

  return (
    <>
      <div className={`${styles.home}`}>
        <WebsiteNavbar />

        <div
          className={`${styles.landing} d-flex align-items-center justify-content-center py-5`}
        >
          <div
            className={`${styles["landing-container"]} d-flex align-items-center justify-content-evenly flex-wrap gap-4 px-3`}
          >
            <div className={`${styles["left-side"]} text-center text-md-start`}>
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(32px, 5vw, 48px)",
                }}
              >
                Welcome to Talent<span style={{ color: "#7939FF" }}>Space</span>
                - Where Opportunities and Growth Meet
              </h1>
              <p
                style={{
                  fontSize: "clamp(16px, 2vw, 18px)",
                  color: "#717171",
                }}
              >
                TalentSpace brings talents, mentors, and investors together,
                unlocking endless growth opportunities.
              </p>
            </div>

            <div className={`${styles["right-side"]} text-center`}>
              <Landing />
              {/* <img
                src={require("../../../Assets/Images/landing.png")}
                alt="login-img"
                className="img-fluid"
              /> */}
            </div>
          </div>
        </div>

        <span className={`${styles.border}`}></span>

        {/* Best Talents For Investors (Backend) */}
        {bestTalents ?
          <div className="container">
            <h1>Best Talents</h1>
            <div className="row gap-3 mt-3 justify-content-center">
              {bestTalentsMapping}
            </div>
          </div> : ""
        }

        <div>
          <Gallery />
          {/* <UploadVideo /> */}
        </div>
      </div>
    </>
  );
}
