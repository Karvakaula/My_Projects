import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import axios from "axios";

const Profile = () => {
  const [imageUrls, setImageUrls] = useState([]);
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
      <Grid container spacing={2}>
        {imageUrls.map((imageUrl, index) => (
          <Grid item key={index}>
            <Avatar alt={`Image ${index + 1}`} src={`../images/${imageUrl}`} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;
