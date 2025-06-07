import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>About Us</h3>
          <p>
            Connecting talented individuals with opportunities for growth and
            success in the creative industry.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/categories/singing">Singing</Link>
            </li>
            <li>
              <Link to="/categories/drawing">Drawing</Link>
            </li>
            <li>
              <Link to="/categories/photography">Photography</Link>
            </li>
            <li>
              <Link to="/categories/acting">Acting</Link>
            </li>
            <li>
              <Link to="/categories/writing">Writing</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Connect With Us</h3>
          <div className={styles.socialLinks}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Talent Platform. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
