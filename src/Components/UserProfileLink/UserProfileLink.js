import React from 'react';
import { Link } from 'react-router-dom';

// Assuming getDataUrl is a utility function you have defined elsewhere
// If not, you might need to import or pass it as a prop.
// Example: import { getDataUrl } from '../../utils/imageUtils'; 

const UserProfileLink = ({ userId, profilePicture, getDataUrl }) => {
  // Default image if profilePicture is not available
  const defaultProfileImage = require("../../Assets/Images/profile.jpg"); 
  const imageSrc = profilePicture ? getDataUrl(profilePicture, "image/jpeg") : defaultProfileImage;

  return (
    <Link to={`/user/${userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="d-flex align-items-center gap-3 position-relative">
        <div className='position-absolute' style={{ zIndex: 1, top: "-38px", border: "1px solid white", borderRadius: "50%", padding: "1px" }}>
          <img
            src={imageSrc}
            alt={`Card video`}
            width="60"
            height="60"
            style={{ borderRadius: "50%", objectFit: "cover" }} // Added objectFit
          />
        </div>
        {/* <span className="fw-bold">{userName}</span> */}
      </div>
    </Link>
  );
};

export default UserProfileLink; 