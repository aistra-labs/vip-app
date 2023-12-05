import React, { memo } from "react";
// import "./home.css";
import GenerateBrandComponent from "../../components/generateBrandComponent";
import Typography from '@mui/material/Typography';
import HeaderStepper from "../../components/common/headerStepper"
import "./generateBrandContainer.css";


const GenerateBrandContainer = () => {

  return (
    <div className="generate-brand-container">
      <HeaderStepper step={1}/>
      <div className="home-brand-heading">
      <Typography variant="h6" component="h2" style={{fontWeight:600}}>
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

export default memo(GenerateBrandContainer);
