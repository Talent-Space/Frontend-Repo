import { Link } from "react-router-dom";
import style from "./err404.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
export default function Err404() {
  return (
    <>
      <div className={`${style.main}`}>
        <h1>
          4
          <span>
            <FontAwesomeIcon icon={faGhost} />
          </span>
          4
        </h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
        <Link className="d-block text-center btn btn-primary mt-4" to={"/home"}>
          Return To Home Page
        </Link>
      </div>
    </>
  );
}
