import { Button, Col, Form, Row } from "react-bootstrap";
import WebsiteNavbar from "../Components/WebsiteNavbar/WebsiteNavbar";
import styles from "./about.module.css";

export default function About() {
  return (
    <>
      <div className={`${styles.about}`}>
        <WebsiteNavbar />

        <div
          className={`${styles["about-landing"]} d-flex align-items-center justify-content-evenly`}>
          <div className={`${styles["about-info"]}`} style={{ width: "400px" }}>
            <h1>About US</h1>
            <div className="mb-5">Unleashing Potential. Connecting Opportunities.</div>
            <p>
              Welcome to TalentSpace, the ultimate platform for discovering,
              nurturing, and investing in talent.<br/> Whether you’re a budding
              artist, an experienced coach, or an investor seeking to empower
              talents, this is where journeys begin, and extraordinary potential
              is realized.
            </p>
          </div>
          <div
            className={`${styles["about-form"]} d-flex align-items-center justify-content-center`}>
            <div className={`${styles["form-container"]}`}>
              <div className={`${styles["form-info"]} text-center`}>
                <h6 className={`text-start`}>Get in touch With</h6>
                <h1 className={`${styles.title} mb-3`}>
                  <span style={{ color: "#7939FF" }}>Talent</span>Space
                </h1>
                <p>Contact Us For Help You</p>
              </div>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Control
                      style={{
                        height: "45px",
                        border: "1px solid rgba(0, 0, 0, 70%)",
                        borderRadius: "12px",
                      }}
                      type="text"
                      placeholder="Full Name"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control
                      style={{
                        height: "45px",
                        border: "1px solid rgba(0, 0, 0, 70%)",
                        borderRadius: "12px",
                      }}
                      type="email"
                      placeholder="Email"
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      style={{
                        border: "1px solid rgba(0, 0, 0, 70%)",
                        borderRadius: "12px",
                      }}
                      placeholder="Message"
                      as="textarea"
                      rows={8}
                    />
                  </Form.Group>
                </Row>

                <Button
                  className="mt-2"
                  style={{ borderRadius: "12px" }}
                  type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
