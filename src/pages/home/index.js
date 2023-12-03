import React, { memo } from "react";
import "./home.css";
import GenerateBrandComponent from "../../components/generateBrandComponent";
import Typography from '@mui/material/Typography';
const Home = () => {

  return (
    <div className="home-container">
      <div className="home-brand-heading">
      <Typography variant="h6" component="h2">
            Generate Brand Name
        </Typography>
        <Typography variant="caption" display="block" color="#5A687A" gutterBottom>
        Fill out the details required to generate brand names
      </Typography>
      </div>
      <GenerateBrandComponent/>
    </div>
  );
};

export default memo(Home);
