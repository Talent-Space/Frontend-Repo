import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Stars = ({ rating }) => {
  return (
    <span className="d-flex gap-1">
      {Array(5)
        .fill()
        .map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{ color: index < rating ? "gold" : "#ccc" }}
          />
        ))}
    </span>
  );
};
export default Stars;
