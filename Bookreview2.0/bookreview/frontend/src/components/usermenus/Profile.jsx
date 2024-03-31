import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [imageUrls, setImageUrls] = useState([]);
  console.log(imageUrls);
  const fetchImageEndpoints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/users/image-endpoints"
      );
      setImageUrls(response.data);
    } catch (error) {
      console.error("Error fetching image endpoints:", error);
    }
  };

  useEffect(() => {
    fetchImageEndpoints();
  }, []);
  return (
    <div>
      <h2>Profile Settings</h2>
      <Avatar src="bookreview\frontend\src\components\images\kuva2.png" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      {imageUrls.map((imageUrl, index) => (
        <Avatar
          className="img-option"
          alt={`Image ${index + 1}`}
          src="../images/kuva2.png"
        />
      ))}
    </div>
  );
};

export default Profile;
