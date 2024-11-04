import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = (props) => {
  return (
    <nav className={`${styles["navbar-login"]} d-flex align-items-center justify-content-between`}>
      <h1 className={`${styles.logo} fw-bold`} style={{ fontFamily: "Urbanist, sans-serif" }}>
        <span className="fw-bold" style={{ color: "#7939FF", fontSize: "16px" }}>
          Talents
        </span>
        Space
      </h1>
      
      
      {props.showRightBar && (
        <div className={styles["right-bar"]}>
          <span style={{ color: "rgba(18, 18, 18, 0.6)" }}>
            Don't have Account?
          </span>
          <Link to={"/register"} style={{ color: "#7939FF", fontWeight: "700" }}>
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
